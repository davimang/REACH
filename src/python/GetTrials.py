import requests
import pandas as pd
import io

api_url = r"https://clinicaltrials.gov/api/query/study_fields?fields=NCTId,Condition,BriefTitle,DetailedDescription&"

class ConsumeTrials():

    @staticmethod
    def search_studies(conditions, **kwargs):

        conditions = [c.replace(" ", "+") for c in conditions]

        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        search_url = api_url + "expr=" + condition_search + "&" "fmt=csv"
        response = requests.get(search_url)
        decoded_content = response.content.decode('utf-8')

        buffer = io.StringIO(decoded_content)

        studies = pd.read_csv(filepath_or_buffer=buffer, header=9, index_col="Rank")

        studies.to_csv("consume_test.csv", index=False)

        



        
        

ConsumeTrials.search_studies(['lung disease'])