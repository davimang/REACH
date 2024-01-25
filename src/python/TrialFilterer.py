'''TrialFilterer module'''
import pandas as pd
import regex as re
import geopy
from geopy.geocoders import Nominatim
from geopy.distance import geodesic


locator = Nominatim(user_agent="my_request")

class TrialFilterer:

    @staticmethod
    def filter_trials(
            age: int,
            home_address: str,
            studies: pd.DataFrame
    ) -> pd.DataFrame:

        #convert min, max ages, filter out ineligible
        studies['MinimumAge'] = studies['MinimumAge'].apply(lambda x : TrialFilterer.clean_age(x))
        studies['MaximumAge'] = studies['MaximumAge'].apply(lambda x : TrialFilterer.clean_age(x))
        studies = studies[(age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])]

        #create address, calculate geodesic distance
        studies['FullAddress'] = ""
        for i in studies.index:
            studies.at[i, 'FullAddress'] = studies.at[i, 'LocationCity'] if not pd.isnull(studies.at[i, 'LocationCity']) else studies.at[i, 'FullAddress']
            studies.at[i, 'FullAddress'] = studies.at[i, 'FullAddress'] + ", " + studies.at[i, 'LocationState'] if not pd.isnull(studies.at[i, 'LocationState']) else studies.at[i, 'FullAddress']
            studies.at[i, 'FullAddress'] = studies.at[i, 'FullAddress'] + " " + studies.at[i, 'LocationZip'] if not pd.isnull(studies.at[i, 'LocationZip']) else studies.at[i, 'FullAddress']
            studies.at[i, 'FullAddress'] = studies.at[i, 'FullAddress'] + ", " + studies.at[i, 'LocationCountry'] if not pd.isnull(studies.at[i, 'LocationCountry']) else studies.at[i, 'FullAddress']
        studies['Distance'] = studies['FullAddress'].apply(lambda x : TrialFilterer.get_distance_km(home_address, x))

        studies.sort_values('Distance', inplace=True)

        #return as json
        results_json = studies.to_json(orient='index')
        return results_json 
    
    @staticmethod
    def get_distance_km(
        home_address: str,
        facility_address: str
    ) -> float:
        '''calculates distance between two addresses'''
        fac_loc = locator.geocode(facility_address)
        try:
            return round(geodesic((home_address.latitude, home_address.longitude),(fac_loc.latitude, fac_loc.longitude)).kilometers,2) #this will need to be optimized, very slow!
        except geopy.exc.GeopyError:
            return
  
    #convert min and max ages to float type
    @staticmethod
    def clean_age(age: float) -> int:
        '''cleans up user age input'''
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r'\d+', age)[0]) / 12
        return float(re.findall(r'\d+', age)[0])
    