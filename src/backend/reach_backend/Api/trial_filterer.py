"""TrialFilterer module"""

import pandas as pd
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.location import Location
from .filtering_dictionary import (
    filtering_dict_num,
    filtering_dict_boolean,
    filtering_dict_special,
)

locator = Nominatim(user_agent="my_request")

class TrialFilterer:
    """Trial filtering class"""

    @staticmethod
    def filter_trials(studies: pd.DataFrame, input_params: dict) -> pd.DataFrame:
        """filters trials based on input criteria"""
        age = input_params["age"]

        # convert min, max ages to numeric values, filter out ineligible trials
        studies["MinimumAge"] = studies["MinimumAge"].apply(TrialFilterer.clean_age)
        studies["MaximumAge"] = studies["MaximumAge"].apply(TrialFilterer.clean_age)
        studies = studies[
            (age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])
        ]

        # filter out trials if they aren't applicable based on sex
        studies = TrialFilterer.filter_gender(input_params["sex"], studies)
        return studies

    @staticmethod
    def generate_keywords(input_params: dict):
        """Generate keywords for search based on input parameters"""
        search_str = []
        for k in filtering_dict_num:
            if k in input_params.keys() and input_params.get(k, 0) > 0:
                search_str.append(filtering_dict_num.get(k, 0))

        for k in filtering_dict_boolean:
            if k in input_params.keys() and input_params.get(k, 0):
                search_str.append(filtering_dict_boolean.get(k, 0))

        # add keyword to search string based on asthma severity
        if input_params.get("asthmaSeverity", "") == "moderate":
            search_str.append("moderate+asthma")
        elif input_params.get("asthmaSeverity", "") == "severe":
            search_str.append("severe+asthma")

        # add keyword to search string based on WHO class
        if input_params.get("WHOFunctionalClass", "0") in ["3", "4"]:
            search_str.append("severe+pulmonary+hypertension+OR+severe+PH")

        # calculate pack-years
        pack_years = (
            input_params.get("packYears", 0)
            or input_params.get("dailySmokes", 0)
            * input_params.get("yearsSmoked", 0)
            / 20
        )

        # add smoking severity to search string based on pack-years
        if pack_years >= 40:
            search_str.append("heavy+smoker+OR+heavy+smoking")
        elif pack_years >= 20:
            search_str.append("moderate+smoker+OR+moderate+smoking")
        elif pack_years > 0:
            search_str.append("light+smoker+OR+light+smoking")

        # add sleep keyword to search string based on severity
        if input_params.get("apneadIndex", 0) >= 30:
            search_str.append("severe+sleep+apnea")
        elif input_params.get("apneadIndex", 0) >= 15:
            search_str.append("moderate+sleep+apnea")
        elif input_params.get("apneadIndex", 0) >= 5:
            search_str.append("mild+sleep+apnea")

        # oxygen saturation keywording
        if input_params.get("nadirO2Saturation", 1) <= 0.9:
            search_str.append("low+oxygen+saturation")

        # therapy keywords
        if input_params.get("backgroundTherapy", "") in [
            "dual therapy",
            "triple therapy",
            "mono therapy",
        ]:
            search_str.append("therapy")
            match input_params.get("backgroundTherapy", ""):
                case "mono therapy":
                    search_str.append("mono+therapy")
                case "dual therapy":
                    search_str.append("dual+therapy")
                case "triple therapy":
                    search_str.append("triple+therapy")

        # add keywords based on mask type
        if input_params.get("maskType", "") in ["nasal", "oronasal", "full face"]:
            match input_params.get("backgroundTherapy", ""):
                case "nasal":
                    search_str.append("nasal+mask")
                case "oronasal":
                    search_str.append("oronasal+mask")
                case "full face":
                    search_str.append("full+face+mask")

        if input_params.get("maskType", "") in ["BiPAP-S", "BiPAP-ST"]:
            search_str.append("face+mask")
            if input_params.get("maskType", "") == "BiPAP-S":
                search_str.append("BiPAP-S")
            else:
                search_str.append("BiPAP-ST")

        # FEV1/FEV% healthy range calculation
        # should be within the healthy range based on sex
        # dict[i][j] -> i is male/female, j is upper/lower bound
        if input_params.get("FEV", -1) > 0:
            if input_params.get("sex", "").lower() == "male":
                if (
                    input_params.get("FEV", -1)
                    < filtering_dict_special.get("FEV")[0][0]
                ):
                    search_str.append("low+FEV1+OR+low+FEV")
                elif (
                    input_params.get("FEV", -1)
                    > filtering_dict_special.get("FEV")[0][1]
                ):
                    search_str.append("high+FEV1+OR+high+FEV")
            elif input_params.get("sex", "").lower() == "female":
                if (
                    input_params.get("FEV", -1)
                    < filtering_dict_special.get("FEV")[1][0]
                ):
                    search_str.append("low+FEV1+OR+low+FEV")
                elif (
                    input_params.get("FEV", -1)
                    > filtering_dict_special.get("FEV")[1][1]
                ):
                    search_str.append("high+FEV1+OR+high+FEV")

        if input_params.get("FEVPercent", -1) > 0:
            if (
                input_params.get("FEVPercent", 1)
                < filtering_dict_special.get("FEVPercent")[0]
            ):
                search_str.append("low+FEV+ratio+OR+low+FEV1+FVC+ratio")
            elif (
                input_params.get("FEVPercent", 1)
                > filtering_dict_special.get("FEVPercent")[1]
            ):
                search_str.append("high+FEV+ratio+OR+high+FEV1+FVC+ratio")

        # FVC/FVC% healthy range calculation
        # should be within the healthy range based on sex
        # dict[i][j] -> i is male/female, j is upper/lower bound
        if input_params.get("FVC", -1) > 0:
            if input_params.get("sex", "").lower() == "male":
                if (
                    input_params.get("FVC", -1)
                    < filtering_dict_special.get("FVC")[0][0]
                ):
                    search_str.append("low+FVC1+OR+low+FVC")
                elif (
                    input_params.get("FVC", -1)
                    > filtering_dict_special.get("FVC")[0][1]
                ):
                    search_str.append("high+FVC+OR+high+FVC")
            elif input_params.get("sex", "").lower() == "female":
                if (
                    input_params.get("FVC", -1)
                    < filtering_dict_special.get("FVC")[1][0]
                ):
                    search_str.append("low+FVC+OR+low+FVC")
                elif (
                    input_params.get("FVC", -1)
                    > filtering_dict_special.get("FVC")[1][1]
                ):
                    search_str.append("high+FVC+OR+high+FVC")

        # keyword based on lung diffusion
        if input_params.get("DLCO", 1) < filtering_dict_special.get("DLCO", [0.75])[0]:
            search_str.append("low+lung+diffusion+OR+low+DLCO")

        # keyword based on blood eosinophils
        if (
            input_params.get("bloodEosinophil", 300)
            < filtering_dict_special.get("bloodEosinophil", [30, 350])[0]
            and input_params.get("bloodEosinophil", 300) > 0
        ):
            search_str.append("low+blood+eosinophil+count+OR+low+eosinophil")
        elif (
            input_params.get("bloodEosinophil", 300)
            > filtering_dict_special.get("bloodEosinophil", [30, 350])[1]
        ):
            search_str.append("high+blood+eosinophil+count+OR+high+eosinophil")

        # keyword based on BMI
        if (
            input_params.get("BMI", 20)
            < filtering_dict_special.get("BMI", [18.5, 25])[0]
            and input_params.get("BMI", 20) > 0
        ):
            search_str.append("underweight+OR+under+weight+OR+low+BMI")
        elif (
            input_params.get("BMI", 20)
            > filtering_dict_special.get("BMI", [18.5, 25])[1]
        ):
            search_str.append("overweight+OR+over+weight+OR+high+BMI")

        # keyword based on cough severity
        if (
            input_params.get("coughSeverity") is not None
            and input_params.get("coughSeverity", 0) > 4
        ):
            search_str.append("severe+cough+OR+heavy+cough+OR+VAS+40mm")

        # return formatted string if there are search strings compiled
        if len(search_str) > 0:
            return "+OR+".join(search_str)
        return ""

    @staticmethod
    def post_filter(
        studies: pd.DataFrame, input_params: str, home_geo: Location
    ) -> pd.DataFrame:
        """creates full address and populates distance"""

        # generate user address
        studies = TrialFilterer.generate_address(studies)

        # set default distance to -1
        studies["Distance"] = -1

        # calculate geodesic distance between user address and trial location
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

        # remove studies outside of the max range
        max_distance = input_params.get("max_distance", 999999999)
        studies = studies[studies["Distance"] <= max_distance]
        return studies

    @staticmethod
    def generate_address(studies: pd.DataFrame) -> pd.DataFrame:
        """generates the address of the trial through the given fields"""
        studies["FullAddress"] = ""

        # for each field, append the location/city/state/zip if it exists
        for i in studies.index:
            # append facility location
            studies.at[i, "FullAddress"] = (
                studies.at[i, "LocationFacility"] + ", "
                if (
                    not pd.isnull(studies.at[i, "LocationFacility"])
                    and studies.at[i, "LocationFacility"] != ""
                )
                else studies.at[i, "FullAddress"]
            )
            # append city
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + studies.at[i, "LocationCity"]
                if (
                    not pd.isnull(studies.at[i, "LocationCity"])
                    and studies.at[i, "LocationCity"] != ""
                )
                else studies.at[i, "FullAddress"]
            )
            # append state/province
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + ", " + studies.at[i, "LocationState"]
                if (
                    not pd.isnull(studies.at[i, "LocationState"])
                    and studies.at[i, "LocationState"] != ""
                )
                else studies.at[i, "FullAddress"]
            )
            # append zip/postal code
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + " " + str(studies.at[i, "LocationZip"])
                if (
                    not pd.isnull(studies.at[i, "LocationZip"])
                    and studies.at[i, "LocationZip"] != ""
                )
                else studies.at[i, "FullAddress"]
            )
            # append country
            studies.at[i, "FullAddress"] = (
                studies.at[i, "FullAddress"] + ", " + studies.at[i, "LocationCountry"]
                if (
                    not pd.isnull(studies.at[i, "LocationCountry"])
                    and studies.at[i, "LocationCountry"] != ""
                )
                else studies.at[i, "FullAddress"]
            )
            # replace characters to prevent frontend issues with Google Maps API
            studies.at[i, "FullAddress"] = studies.at[i, "FullAddress"].replace(
                " & ", " and "
            )
            studies.at[i, "FullAddress"] = studies.at[i, "FullAddress"].replace(
                "&", " and "
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

    @staticmethod
    def clean_age(age: float) -> int:
        """cleans up user age input"""
        if pd.isnull(age):
            return age
        if "month" in age:
            return float(re.findall(r"\d+", age)[0]) / 12
        return float(re.findall(r"\d+", age)[0])
