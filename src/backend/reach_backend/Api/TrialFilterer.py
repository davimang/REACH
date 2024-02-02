"""TrialFilterer module"""
import pandas as pd
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

locator = Nominatim(user_agent="my_request")


class TrialFilterer:
    @staticmethod
    def filter_trials(studies: pd.DataFrame, input_params: dict) -> pd.DataFrame:
        """main method for filtering trials, filters and sorts trials based on different entry criteria"""

        age = input_params["age"]
        home_address = input_params["address"]

        try:
            home_address = locator.geocode(home_address, timeout=10)
        except:
            home_address = None

        # convert min, max ages, filter out ineligible
        studies["MinimumAge"] = studies["MinimumAge"].apply(
            lambda x: TrialFilterer.clean_age(x)
        )
        studies["MaximumAge"] = studies["MaximumAge"].apply(
            lambda x: TrialFilterer.clean_age(x)
        )
        studies = studies[
            (age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])
        ]

        studies = TrialFilterer.generate_address(studies)

        # calculate geodesic distance
        studies["Distance"] = studies["FullAddress"].apply(
            lambda x: TrialFilterer.get_distance_km(home_address, x)
        )
        studies = TrialFilterer.filter_gender(input_params["sex"], studies)
        studies["KeywordRank"] = 0
        studies = TrialFilterer.filter_keywords(studies, input_params)
        studies.sort_values(
            ["KeywordRank", "Distance"], ascending=[False, True], inplace=True
        )

        return studies

    @staticmethod
    def filter_keywords(df: pd.DataFrame, info: dict) -> pd.DataFrame:
        """increases rank for each met keyword"""
        if info["numExacerbations"] > 0:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["exacerbation", "Exacerbation"]), na=False
                ),
                ["KeywordRank"],
            ] += 1
        if info["numFlares"] > 0:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        [
                            "flare",
                            "flare up",
                            "flare-up",
                            "Flare",
                            "Flare up",
                            "Flare-up",
                        ]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1
        if info["usesInhaler"]:
            df.loc[
                df["Keyword"].str.contains("|".join(["inhaler", "Inhaler"]), na=False),
                ["KeywordRank"],
            ] += 1
        if info["usesInjection"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["injection", "Injection"]), na=False
                ),
                ["KeywordRank"],
            ] += 1
        if info["isSmoker"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["smoker", "smoking", "Smoker", "Smoking"]), na=False
                ),
                ["KeywordRank"],
            ] += 1
        if info["asthmaSeverity"] in ["moderate", "severe"]:
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
        if info["isEosinophilic"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(
                        ["Eosinophilic", "eosinophilic", "Eosinophilia", "eosinophilia"]
                    ),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1
        if info["usesPillsTablets"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["pill", "Pill", "tablet", "Tablet", "oral", "Oral"]),
                    na=False,
                ),
                ["KeywordRank"],
            ] += 1
        if info["onDualTherapy"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["dual therapy", "Dual therapy"]), na=False
                ),
                ["KeywordRank"],
            ] += 1
        if info["onTripleTherapy"]:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["triple therapy", "Triple therapy"]), na=False
                ),
                ["KeywordRank"],
            ] += 1
        if info["numCOPDFlares"] > 0:
            df.loc[
                df["Keyword"].str.contains(
                    "|".join(["COPD flare", "COPD Flare"]), na=False
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
                studies.at[i, "FullAddress"] + " " + studies.at[i, "LocationZip"]
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
            )  # this will need to be optimized, very slow!
        except:
            return 999999999

    # convert min and max ages to float type
    @staticmethod
    def clean_age(age: float) -> int:
        """cleans up user age input"""
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r"\d+", age)[0]) / 12
        return float(re.findall(r"\d+", age)[0])