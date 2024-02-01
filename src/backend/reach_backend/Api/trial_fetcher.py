'''TrialFetcher module'''
import io
import re
import requests
import pandas as pd
from .trial_filterer import TrialFilterer

API_URL = (r"https://clinicaltrials.gov/api/query/study_fields?fmt=csv&"
           r"fields=NCTId,Condition,BriefTitle,DetailedDescription,"
           r"MinimumAge,MaximumAge,LocationCountry,LocationState,LocationCity,"
           r"LocationZip,LocationFacility,OverallStatus,Gender,Keyword&")
TIMEOUT_SEC = 5

class TrialFetcher:
    '''This class encapsulates the trial retrieval functionality'''
    temp_studies = pd.DataFrame()

    @staticmethod
    def search_studies(
        input_params : dict
    ) -> str:
        '''Method to retrieve relevant trials to filter and return'''

        #extract conditions, serialize into useable string
        conditions = input_params['conditions']
        conditions = [c.replace(" ", "+") for c in conditions]

        #concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        #put expression together
        search_template = API_URL + "expr=" + condition_search + "&fmt=csv"

        #start one rank up from the last rank returned by a previous call
        rank = input_params['maxRank'] + 1
        studies = pd.DataFrame()

        #keep pulling trials until you hit 5 or timeout
        while studies.shape[0] < 5:
            search_url = search_template + f"&min_rnk={rank}&max_rnk={rank+5}"
            #timed section
            response = requests.get(search_url,timeout=TIMEOUT_SEC)
            try: #break if the timeout is reached (or the api returns unreadable data)
                decoded_content = response.content.decode('utf-8')
                buffer = io.StringIO(decoded_content)
                max_results = int(re.findall(r"NStudiesFound: (\d+)", decoded_content)[0])
                temp = pd.read_csv(filepath_or_buffer=buffer, header=9)
            except ValueError: #if data can't be read
                break

            if max_results < rank: #break if exceeding max results
                break

            #remove any invalid trials
            temp = TrialFilterer.filter_trials(temp, input_params)
            if temp.shape[0] > 0: #if not empty, add to accepted trials
                studies = pd.concat([studies,temp], ignore_index=True)
                rank = studies.at[studies.shape[0]-1, 'Rank'] + 1
            else: #else, move to next five
                rank += 5

        if studies.shape[0] == 0:
            return pd.DataFrame(columns=['NCTId','BriefTitle','DetailedDescription',
                                         'OverallStatus','Distance','KeywordRank','url'])
        studies = studies.head(5) #take the top 5 (since it can return up to 9 results)
        studies['url'] = 'https://clinicaltrials.gov/study/' + studies['NCTId'] #create url
        studies = TrialFilterer.post_filter(studies, input_params) #calculate distances
        #take only necessary fields
        studies = studies[['NCTId','BriefTitle','DetailedDescription',
                           'OverallStatus','Distance','KeywordRank','url']]
        results_json = studies.to_json(orient='index') #convert to json
        return results_json #return
