"""TrialFilterer module"""

import pandas as pd
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.location import Location
from filtering_dictionary import (
    filtering_dict_num,
    filtering_dict_boolean,
    filtering_dict_special,
    filtering_dict_underlying
)

locator = Nominatim(user_agent="my_request")


class TrialFilterer:
    """Trial filtering class"""

    @staticmethod
    def filter_trials(studies: pd.DataFrame, input_params: dict) -> pd.DataFrame:
        """filters trials based on input criteria"""
        age = input_params["age"]

        # convert min, max ages, filter out ineligible
        studies["MinimumAge"] = studies["MinimumAge"].apply(TrialFilterer.clean_age)
        studies["MaximumAge"] = studies["MaximumAge"].apply(TrialFilterer.clean_age)
        studies = studies[
            (age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])
        ]

        studies = TrialFilterer.filter_gender(input_params["sex"], studies)
        return studies

    @staticmethod
    def generate_keywords(input_params: dict):
        search_str = []
        for k in filtering_dict_num.keys():
            if k in input_params.keys():
                if input_params.get(k, 0) > 0:
                    search_str.append(filtering_dict_num.get(k, 0))

        for k in filtering_dict_boolean.keys():
            if k in input_params.keys():
                if input_params.get(k, 0):
                    search_str.append(filtering_dict_boolean.get(k, 0))

        if input_params.get("asthmaSeverity", "") == "moderate":
            search_str.append("moderate+asthma")
        elif input_params.get("asthmaSeverity", "") == "severe":
            search_str.append("severe+asthma")

        if input_params.get("WHOFunctionalClass", 0) > 2:
            search_str.append("severe+pulmonary+hypertension")

        if input_params.get("packYears", 0) >= 40:
            search_str.append("heavy+smoker")
        elif input_params.get("packYears", 0) >= 20:
            search_str.append("moderate+smoker")
        elif input_params.get("packYears", 0) >= 0:
            search_str.append("light+smoker")

        if input_params.get("apneadIndex", 0) >= 30:
            search_str.append("severe+sleep+apnea")
        elif input_params.get("apneadIndex", 0) >= 15:
            search_str.append("moderate+sleep+apnea")
        elif input_params.get("apneadIndex", 0) >= 5:
            search_str.append("mild+sleep+apnea")

        if input_params.get("nadirO2Saturation", 1) <= 0.9:
            search_str.append("low+oxygen+saturation")

        #FEV healthy range calculation
        if input_params.get("FEV", -1) != -1:
            if input_params.get("sex", "").lower() == "male":
                if input_params.get("FEV", -1) < filtering_dict_special.get("FEV")[0][0]:
                    search_str.append("low+FEV1")
                elif input_params.get("FEV", -1) > filtering_dict_special.get("FEV")[0][1]:
                    search_str.append("high+FEV1")
            elif input_params.get("sex", "").lower() == "female":
                if input_params.get("FEV", -1) < filtering_dict_special.get("FEV")[1][0]:
                    search_str.append("low+FEV1")
                elif input_params.get("FEV", -1) > filtering_dict_special.get("FEV")[1][1]:
                    search_str.append("high+FEV1")

        if input_params.get("FEVPercent", -1) != -1:
            if input_params.get("FEVPercent", 1) < filtering_dict_special.get("FEVPercent")[0]:
                search_str.append("low+FEV+ration+OR+low+FEV1+FVC+ratio")
            elif input_params.get("FEVPercent", 1) > filtering_dict_special.get("FEVPercent")[1]:
                search_str.append("high+FEV+ration+OR+high+FEV1+FVC+ratio")

        if len(search_str) > 0:
            return "+OR+".join(search_str)
        return ""

    @staticmethod
    def post_filter(
        studies: pd.DataFrame, input_params: str, home_geo: Location
    ) -> pd.DataFrame:
        """creates full address and populates distance"""

        studies = TrialFilterer.generate_address(studies)

        studies["Distance"] = -1

        for i in studies.index:
            studies.at[i, "Distance"] = round(
                TrialFilterer.get_distance_km(
                    studies.at[i, "LocationLatitude"],
                    studies.at[i, "LocationLongitude"],
                    home_geo.latitude,
                    home_geo.longitude,
                ),
                2,
            )

        max_distance = input_params.get("max_distance", 500)  # default 500 km
        studies = studies[studies["Distance"] <= max_distance]
        return studies

    @staticmethod
    def generate_address(studies: pd.DataFrame) -> pd.DataFrame:
        """generates the address of the trial through the given fields"""
        studies["FullAddress"] = ""
        for i in studies.index:
            studies.at[i, "FullAddress"] = (
                studies.at[i, "LocationCity"]
                if not pd.isnull(studies.at[i, "LocationCity"])
                else studies.at[i, "FullAddress"]
            )
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + ", " + studies.at[i, "LocationState"]
                if not pd.isnull(studies.at[i, "LocationState"])
                else studies.at[i, "FullAddress"]
            )
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + " " + str(studies.at[i, "LocationZip"])
                if not pd.isnull(studies.at[i, "LocationZip"])
                else studies.at[i, "FullAddress"]
            )
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + ", " + studies.at[i, "LocationCountry"]
                if not pd.isnull(studies.at[i, "LocationCountry"])
                else studies.at[i, "FullAddress"]
            )
        return studies

    @staticmethod
    def filter_gender(sex: str, df: pd.DataFrame) -> pd.DataFrame:
        """filters out non-applicable gender-based studies"""
        df = df[(df["Gender"] == "ALL") | (df["Gender"] == sex.upper())]
        return df

    @staticmethod
    def get_distance_km(lat1: float, long1: float, lat2: float, long2: float) -> float:
        """calculates distance between two addresses"""
        return geodesic((lat1, long1), (lat2, long2)).kilometers

    # convert min and max ages to float type
    @staticmethod
    def clean_age(age: float) -> int:
        """cleans up user age input"""
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r"\d+", age)[0]) / 12
        return float(re.findall(r"\d+", age)[0])
