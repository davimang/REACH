'''TrialFetcher module'''
import io
import requests
import pandas as pd
import TrialFilterer

API_URL = r"https://clinicaltrials.gov/api/query/study_fields?fields=NCTId,Condition,BriefTitle,DetailedDescription,MinimumAge,MaximumAge,LocationCountry,LocationState,LocationCity,LocationZip,LocationFacility&"

class TrialFetcher:
    '''This class encapsulates the trial retrieval functionality'''

    @staticmethod
    def search_studies(
        conditions: list,
        age: int,
        address: str
    ) -> str:
        '''Method to retrieve relevant trials to filter and return'''

        #convert conditions to usable strings
        conditions = [c.replace(" ", "+") for c in conditions] 

        #concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        #put expression together
        search_url = API_URL + "expr=" + condition_search + "&" "fmt=csv"
        response = requests.get(search_url, timeout=10)
        decoded_content = response.content.decode('utf-8')

            #decode output
        buffer = io.StringIO(decoded_content)
        studies = pd.read_csv(filepath_or_buffer=buffer, header=9, index_col="NCTId")

        #filtering goes here
        studies = TrialFilterer.filter_trials(studies, age, address)

        results_json = studies.to_json(orient='index')
        return results_json
    