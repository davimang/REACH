"""TrialFetcher module"""
import io
import json
import requests
import pandas as pd
from .TrialFilterer import TrialFilterer

API_URL = r"https://clinicaltrials.gov/api/query/study_fields?min_rnk=1&max_rnk=100&fmt=csv&fields=NCTId,Condition,BriefTitle,DetailedDescription,MinimumAge,MaximumAge,LocationCountry,LocationState,LocationCity,LocationZip,LocationFacility,OverallStatus,Gender,Keyword&"


class TrialFetcher:
    """This class encapsulates the trial retrieval functionality"""

    @staticmethod
    def search_studies(input_params: str) -> str:
        """Method to retrieve relevant trials to filter and return"""

        # convert conditions to usable strings
        input_params = json.loads(input_params)

        conditions = input_params["condition"]

        conditions = [c.replace(" ", "+") for c in conditions]

        # concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        # put expression together
        search_url = API_URL + "expr=" + condition_search + "&" "fmt=csv"
        response = requests.get(search_url, timeout=10)
        decoded_content = response.content.decode("utf-8")

        # decode output
        buffer = io.StringIO(decoded_content)
        studies = pd.read_csv(filepath_or_buffer=buffer, header=9)

        # filter trials, uses TrialFilterer
        studies = TrialFilterer.filter_trials(studies, input_params)

        studies["url"] = "https://clinicaltrials.gov/study/" + studies["NCTId"]
        studies = studies[
            [
                "NCTId",
                "BriefTitle",
                "DetailedDescription",
                "OverallStatus",
                "Distance",
                "KeywordRank",
                "url",
            ]
        ]

        results_json = studies.to_json(orient="index")
        return results_json
