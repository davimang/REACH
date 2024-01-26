'''TrialFilterer module'''
import pandas as pd
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic


locator = Nominatim(user_agent="my_request")

class TrialFilterer:

    @staticmethod
    def filter_trials(
            studies: pd.DataFrame,
            input_params: dict
    ) -> pd.DataFrame:
        
        age = input_params['age']
        home_address = input_params['address']

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


        studies = TrialFilterer.filter_gender(input_params['sex'], studies)

        studies.sort_values('Distance', inplace=True)

        return studies
    
    @staticmethod
    def filter_gender(
        sex: str,
        df: pd.DataFrame
    ) -> pd.DataFrame:
        '''filters out non-applicable gender-based studies'''
        df = df[(df['Gender'] == 'All') | (str.lower(df['Gender']) == str.lower(sex))]
        return df

    @staticmethod
    def get_distance_km(
        home_address: str,
        facility_address: str
    ) -> float:
        '''calculates distance between two addresses'''
        fac_loc = locator.geocode(facility_address,timeout=10)
        try:
            return round(geodesic((home_address.latitude, home_address.longitude),(fac_loc.latitude, fac_loc.longitude)).kilometers,2) #this will need to be optimized, very slow!
        except:
            return -1
  
    #convert min and max ages to float type
    @staticmethod
    def clean_age(age: float) -> int:
        '''cleans up user age input'''
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r'\d+', age)[0]) / 12
        return float(re.findall(r'\d+', age)[0])
    