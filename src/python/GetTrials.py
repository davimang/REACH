import requests
import pandas as pd
import io
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

locator = Nominatim(user_agent="my_request")

api_url = r"https://clinicaltrials.gov/api/query/study_fields?fields=NCTId,Condition,BriefTitle,DetailedDescription,MinimumAge,MaximumAge,LocationCountry,LocationState,LocationCity,LocationZip,LocationFacility&"

class ConsumeTrials():

    @staticmethod
    def search_studies(conditions, age, address, **kwargs):

        #convert conditions to usable strings
        conditions = [c.replace(" ", "+") for c in conditions] 

        #concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        #put expression together
        search_url = api_url + "expr=" + condition_search + "&" "fmt=csv"
        response = requests.get(search_url)
        decoded_content = response.content.decode('utf-8')

        #decode output
        buffer = io.StringIO(decoded_content)
        studies = pd.read_csv(filepath_or_buffer=buffer, header=9, index_col="Rank")

        #convert min, max ages, filter out ineligible
        studies['MinimumAge'] = studies['MinimumAge'].apply(lambda x : ConsumeTrials.clean_age(x))
        studies['MaximumAge'] = studies['MaximumAge'].apply(lambda x : ConsumeTrials.clean_age(x))
        studies = studies[(age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])]
        studies.reset_index(inplace=True, drop=True)

        #create address, calculate geodesic distance

        #print(studies.iloc[-1])
        print(studies)

        #return as json
        results_json = studies.to_json()
        return results_json 

    #address1 = user address
    #address2 = study address
    @staticmethod
    def get_distance_km(address1, address2):
        location1 = locator.geocode(address1)
        location2 = locator.geocode(address2)

        path_between = geodesic((location1.latitude, location1.longitude),(location2.latitude, location2.longitude))
        return path_between.kilometers
    
    #convert min and max ages to float type
    @staticmethod
    def clean_age(age):
        if pd.isnull(age):
            return age
        elif "month" in age:
            return float(re.findall(r'\d+', age)[0]) / 12
        else:
            return float(re.findall(r'\d+', age)[0])


        
        

ConsumeTrials.search_studies(['lung disease'],65,"156 Bond St S, Hamilton, ON, Canada")