"""TrialFilterer module"""
import pandas as pd
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.exc import GeopyError
from .filtering_dictionary import (filtering_dict_num,
                                   filtering_dict_boolean,
                                   filtering_dict_special)

locator = Nominatim(user_agent="my_request")


class TrialFilterer:
    """Trial filtering class"""

    @staticmethod
    def filter_trials(studies: pd.DataFrame, input_params: dict) -> pd.DataFrame:
        """filters trials based on input criteria"""
        age = input_params["age"]

        print(studies)
        
        # convert min, max ages, filter out ineligible
        studies["MinimumAge"] = studies["MinimumAge"].apply(TrialFilterer.clean_age)
        studies["MaximumAge"] = studies["MaximumAge"].apply(TrialFilterer.clean_age)
        studies = studies[
            (age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])
        ]

        studies = TrialFilterer.filter_gender(input_params["sex"], studies)
        studies["KeywordRank"] = 0
        studies = TrialFilterer.filter_keywords(studies, input_params)
        return studies

    @staticmethod
    def post_filter(studies: pd.DataFrame, input_params: str) -> pd.DataFrame:
        """calculates the geodesic distance to the trial"""
        address = input_params["address"]
        home_address = (
            address["street"]
            + ", "
            + address["city"]
            + ", "
            + address["province"]
            + " "
            + address["postalCode"]
        )

        try:
            home_address = locator.geocode(home_address, timeout=10)
        except GeopyError:
            home_address = None
        studies = TrialFilterer.generate_address(studies)
        studies["Distance"] = (
            studies["FullAddress"].apply(
            lambda x: TrialFilterer.get_distance_km(home_address, x)
        ))
        return studies

    @staticmethod
    def filter_keywords(df: pd.DataFrame, info: dict) -> pd.DataFrame:
        """increases rank for each met keyword"""

        df = df[df['OverallStatus'] != "Completed"]

        for param in filtering_dict_num.keys():
            if info.get(param, 0) > 0:
                df.loc[df["Keyword"].str.contains(
                    "|".join(filtering_dict_num[param]), na=False
                ),
                ["KeywordRank"],
            ] += 1

        for param in filtering_dict_boolean.keys():
            if info.get(param, 0):
                df.loc[df["Keyword"].str.contains(
                    "|".join(filtering_dict_boolean[param]), na=False
                ),
                ["KeywordRank"],
            ] += 1

        if info.get("asthmaSeverity", 0) in ["moderate", "severe"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        [
                            "severe asthma",
                            "moderate asthma",
                            "Severe asthma",
                            "Moderate asthma",
                        ]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1

        if info.get("packYears", 0) > 40:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        [
                            "heavy smoker",
                            "Heavy smoker",
                            "frequent smoker",
                            "Frequent smoker"
                        ]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1
        elif info.get("packYears", 0) > 20:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        [
                            "moderate smoker",
                            "Moderate smoker",
                        ]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1
        elif info.get("packYears", 0) > 0:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        [
                            "light smoker",
                            "light smoker",
                            "smoker",
                            "Smoker"
                        ]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1

        return df
        

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
        df = df[(df["Gender"] == "All") | (df["Gender"] == sex)]
        return df

    @staticmethod
    def get_distance_km(home_address: str, facility_address: str) -> float:
        """calculates distance between two addresses"""
        fac_loc = locator.geocode(facility_address, timeout=10)
        try:
            return round(
                geodesic(
                    (home_address.latitude, home_address.longitude),
                    (fac_loc.latitude, fac_loc.longitude),
                ).kilometers,
                2,
            ), fac_loc.latitude, fac_loc.longitude
        except AttributeError:
            return 999999999, -1, -1

    # convert min and max ages to float type
    @staticmethod
    def clean_age(age: float) -> int:
        """cleans up user age input"""
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r"\d+", age)[0]) / 12
        return float(re.findall(r"\d+", age)[0])
