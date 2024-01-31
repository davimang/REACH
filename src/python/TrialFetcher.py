'''TrialFetcher module'''
import io
from multiprocessing import Process
import requests
import pandas as pd
from TrialFilterer import TrialFilterer

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

        rank = input_params['max_rank'] + 1
        studies = pd.DataFrame()
        

        #keep pulling trials until you hit 5 or timeout
        while pd.DataFrame.size < 5:
            search_url = search_template + "&min_rnk=%s&max_rnk=%s" % (str(rank),str(rank))

            #timed section
            p = Process(target=TrialFetcher.get_response, args=(search_url))
            p.start()
            p.join(timeout=TIMEOUT_SEC)
            p.terminate()

            if p.exitcode is None: #timeout
                break
            if p.exitcode == 0: #success
                TrialFetcher.temp_studies = TrialFilterer.filter_trials(TrialFetcher.temp_studies, input_params)
                studies.add(TrialFetcher.temp_studies)
            #end timed section


        studies.sort_values(['KeywordRank','Distance'], ascending=[False, True], inplace=True)
        studies['url'] = 'https://clinicaltrials.gov/study/' + studies['NCTId']
        studies = studies[['NCTId','BriefTitle','DetailedDescription','OverallStatus','Distance','KeywordRank','url']]
        results_json = studies.to_json(orient='index')
        return results_json
    
    @staticmethod
    def get_response(search_url):
        response = requests.get(search_url, timeout=TIMEOUT_SEC)
        decoded_content = response.content.decode('utf-8')
        buffer = io.StringIO(decoded_content)
        TrialFetcher.temp_studies = pd.read_csv(filepath_or_buffer=buffer, header=9)
    