"""Module defining the trial fetcher."""
import requests
import pandas as pd
import io
import regex as re
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

locator = Nominatim(user_agent="my_request")

api_url = r"""https://clinicaltrials.gov/api/quer
y/study_fields?fields=NCTId,Condition,BriefTitle,D
etailedDescription,MinimumAge,MaximumAge,LocationC
ountry,LocationState,LocationCity,LocationZip,Loca
tionFacility&"""


class TrialFetcher:
    """Trial fetcher."""

    # inputs
    # conditions = list of string conditions
    # age = int age
    # address = string address of home
    @staticmethod
    def search_studies(conditions, age, address, **kwargs):
        # convert conditions to usable strings
        conditions = [c.replace(" ", "+") for c in conditions]

        # concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        # put expression together
        search_url = api_url + "expr=" + condition_search + "&" "fmt=csv"
        response = requests.get(search_url)
        decoded_content = response.content.decode("utf-8")

        # decode output
        buffer = io.StringIO(decoded_content)
        studies = pd.read_csv(filepath_or_buffer=buffer, header=9, index_col="NCTId")

        # convert min, max ages, filter out ineligible
        if age:
            studies["MinimumAge"] = studies["MinimumAge"].apply(
                lambda x: TrialFetcher.clean_age(x)
            )
            studies["MaximumAge"] = studies["MaximumAge"].apply(
                lambda x: TrialFetcher.clean_age(x)
            )
            studies = studies[
                (age >= studies["MinimumAge"]) & (age <= studies["MaximumAge"])
            ]

        # create address, calculate geodesic distance
        if address:
            home_address = locator.geocode(address)
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
                    studies.at[i, "FullAddress"]
                    + ", "
                    + studies.at[i, "LocationCountry"]
                    if not pd.isnull(studies.at[i, "LocationCountry"])
                    else studies.at[i, "FullAddress"]
                )
            studies["Distance"] = studies["FullAddress"].apply(
                lambda x: TrialFetcher.get_distance_km(home_address, x)
            )

            studies.sort_values("Distance", inplace=True)

        # return as json
        results_json = studies.to_json(orient="index")
        return results_json

    # address1 = user address
    # address2 = study address
    @staticmethod
    def get_distance_km(home_address, facility_address):
        fac_loc = locator.geocode(facility_address)
        try:
            return round(
                geodesic(
                    (home_address.latitude, home_address.longitude),
                    (fac_loc.latitude, fac_loc.longitude),
                ).kilometers,
                2,
            )  # this will need to be optimized, very slow!
        except:
            return

    # convert min and max ages to float type
    @staticmethod
    def clean_age(age):
        if pd.isnull(age):
            return age
        elif "month" in age:
            return float(re.findall(r"\d+", age)[0]) / 12
        else:
            return float(re.findall(r"\d+", age)[0])
