import requests
import pandas as pd
import io
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

locator = Nominatim(user_agent="my_request")

api_url = r"https://clinicaltrials.gov/api/query/study_fields?fields=NCTId,Condition,BriefTitle,DetailedDescription&"

class ConsumeTrials():

    @staticmethod
    def search_studies(conditions, age, address, **kwargs):

        #convert conditions to usable strings
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

        print(studies)

        results_json = studies.to_json()

        return results_json

    @staticmethod
    def get_distance_km(address1, address2):
        location1 = locator.geocode(address1)
        location2 = locator.geocode(address2)

        path_between = geodesic((location1.latitude, location1.longitude),(location2.latitude, location2.longitude))
        return path_between.kilometers


        
        

ConsumeTrials.search_studies(['lung disease'],65,"156 Bond St S")