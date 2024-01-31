'''TrialFetcher module'''
import io
import requests
import pandas as pd
from TrialFilterer import TrialFilterer
import re

API_URL = r"https://clinicaltrials.gov/api/query/study_fields?fmt=csv&fields=NCTId,Condition,BriefTitle,DetailedDescription,MinimumAge,MaximumAge,LocationCountry,LocationState,LocationCity,LocationZip,LocationFacility,OverallStatus,Gender,Keyword&"
TIMEOUT_SEC = 5

class TrialFetcher:
    '''This class encapsulates the trial retrieval functionality'''
    temp_studies = pd.DataFrame()

    @staticmethod
    def search_studies(
        input_params : dict
    ) -> str:
        '''Method to retrieve relevant trials to filter and return'''

        conditions = input_params['conditions']

        conditions = [c.replace(" ", "+") for c in conditions]

        #concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        #put expression together
        search_template = API_URL + "expr=" + condition_search + "&fmt=csv"

        rank = input_params['maxRank'] + 1
        studies = pd.DataFrame()
        

        #keep pulling trials until you hit 5 or timeout
        while studies.shape[0] < 5:
            search_url = search_template + "&min_rnk=%s&max_rnk=%s" % (str(rank),str(rank+5))
            #timed section
            response = requests.get(search_url,timeout=TIMEOUT_SEC)
            try: #break if the timeout is reached (or the api returns unreadable data)
                decoded_content = response.content.decode('utf-8')
                buffer = io.StringIO(decoded_content)
                max_results = int(re.findall(r"NStudiesFound: (\d+)", decoded_content)[0])
                temp = pd.read_csv(filepath_or_buffer=buffer, header=9)
            except: #if data can't be read
                break

            if max_results < rank: #break if exceeding max results
                break

            temp = TrialFilterer.filter_trials(temp, input_params)
            if temp.shape[0] > 0:
                studies = pd.concat([studies,temp], ignore_index=True)
                rank = studies.at[studies.shape[0]-1, 'Rank'] + 1
            else:
                rank += 5
            

        studies = studies.head(5)
        studies['url'] = 'https://clinicaltrials.gov/study/' + studies['NCTId']
        studies = TrialFilterer.post_filter(studies, input_params)
        studies = studies[['NCTId','BriefTitle','DetailedDescription','OverallStatus','Distance','KeywordRank','url']]
        results_json = studies.to_json(orient='index')
        return results_json
    