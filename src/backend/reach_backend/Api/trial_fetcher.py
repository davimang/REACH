"""TrialFetcher module"""

import io
import json
import requests
import pandas as pd
from geopy.geocoders import Nominatim
from .trial_filterer import TrialFilterer

locator = Nominatim(user_agent="my_request")

API_URL2 = (
    r"https://clinicaltrials.gov/api/v2/studies?format=json&countTotal=true"
    r"&filter.overallStatus=RECRUITING&fields=NCTId,Condition,"
    r"BriefTitle,DetailedDescription,BriefSummary,"
    r"MinimumAge,MaximumAge,LocationGeoPoint,LocationCountry,LocationState,"
    r"LocationCity,LocationZip,LocationFacility,OverallStatus,Gender,Keyword,"
    r"PointOfContactEMail,CentralContactEMail,ResponsiblePartyInvestigatorFullName,"
    r"OverallOfficialName,LocationContactName&"
)

TIMEOUT_SEC = 10


class TrialFetcher:
    """This class encapsulates the trial retrieval functionality"""

    temp_studies = pd.DataFrame()

    @staticmethod
    def search_studies(input_params: dict) -> str:
        """Method to retrieve relevant trials to filter and return"""

        # extract conditions, serialize into useable string
        conditions = input_params["conditions"]
        conditions = [c.replace(" ", "+") for c in conditions]

        #remove any None type entries
        remove_none = {k: v for k, v in input_params.items() if v is not None}
        input_params.clear()
        input_params.update(remove_none)

        # concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        home_address = (
            input_params["address"]["street"]
            + ", "
            + input_params["address"]["city"]
            + ", "
            + input_params["address"]["province"]
            + " "
            + input_params["address"]["postalCode"]
        )

        home_geo = locator.geocode(home_address, timeout=10)

        # put expression together
        search_template = API_URL2 + "query.cond=" + condition_search
        search_template = (
            search_template
            + "&filter.geo=distance("
            + str(home_geo.latitude)
            + ","
            + str(home_geo.longitude)
            + ","
            + str(input_params.get("max_distance", 99999999))
            + "km)"
        )

        keywords = TrialFilterer.generate_keywords(input_params)
        if len(keywords) > 0:
            search_template = search_template + "&query.term=" + keywords

        # start one rank up from the last rank returned by a previous call
        studies = pd.DataFrame()

        print(search_template)

        # keep pulling trials until you hit 5 or
        next_page = input_params.get("next_page")
        while studies.shape[0] < 30:
            temp = pd.DataFrame()
            search_url = (
                search_template + f"&pageToken={next_page}"
                if next_page
                else search_template
            )
            # timed section
            response = requests.get(search_url, timeout=TIMEOUT_SEC)

            json_response = response.json()
            next_page = json_response.get("nextPageToken")
            content = build_study_dict(json_response)
            try:  # break if the timeout is reached (or the api returns unreadable data)
                buffer = io.StringIO(content)
                temp = pd.read_json(buffer)
            except ValueError:  # if data can't be read
                print("Value Error")
                break

            # remove any invalid trials
            if temp.shape[0] > 0:
                temp = TrialFilterer.filter_trials(temp, input_params)
                temp = TrialFilterer.post_filter(temp, input_params, home_geo)

            if temp.shape[0] > 0:  # if not empty, add to accepted trials
                studies = pd.concat([studies, temp], ignore_index=True)

            studies.drop_duplicates(subset=["NCTId"], inplace=True)

            if not next_page:
                break

        if studies.shape[0] == 0:
            return pd.DataFrame(
                columns=[
                    "NCTId",
                    "BriefTitle",
                    "DetailedDescription",
                    "OverallStatus",
                    "Distance",
                    "url",
                    "FullAddress",
                    "LocationLatitude",
                    "LocationLongitude",
                    "OverallOfficialName",
                    "LocationContactName",
                    "PointOfContactEMail",
                    "CentralContactEMail",
                    "ResponsiblePartyInvestigatorFullName",
                ]
            )
        studies = studies.head(30)
        studies["url"] = (
            "https://clinicaltrials.gov/study/" + studies["NCTId"]
        )  # create url
        studies["nextPage"] = next_page

        studies = TrialFilterer.generate_address(studies)

        # take only necessary fields

        studies = studies[
            [
                "NCTId",
                "BriefTitle",
                "DetailedDescription",
                "OverallStatus",
                "url",
                "FullAddress",
                "LocationLatitude",
                "LocationLongitude",
                "Distance",
                "LocationCity",
                "LocationState",
                "LocationFacility",
                "OverallOfficialName",
                "LocationContactName",
                "PointOfContactEMail",
                "CentralContactEMail",
                "ResponsiblePartyInvestigatorFullName",
                "nextPage",
            ]
        ]
        studies.sort_values(by="Distance", ascending=True, inplace=True)
        studies.reset_index(inplace=True, drop=True)

        results_json = studies.to_dict(orient="index")  # convert to json
        return results_json  # return


def build_study_dict(response):
    """Helper function to reformat the v2 api response from clinicaltrials.gov."""
    studies = response["studies"]

    list_of_new_study_formats = []

    for study in studies:
        study = study["protocolSection"]

        study_id_module = study["identificationModule"]
        study_conditions_module = study["conditionsModule"]
        description_module = study["descriptionModule"]
        eligibility_module = study["eligibilityModule"]
        contacts_locations_module = study["contactsLocationsModule"]
        collaborator_module = study["sponsorCollaboratorsModule"]

        nctid = study_id_module["nctId"]
        brief_title = study_id_module["briefTitle"]
        conditions = study_conditions_module.get("conditions", [])
        keywords = study_conditions_module.get("keywords", [])
        description = description_module.get("detailedDescription", "")
        if not description:
            description = description_module.get("briefSummary", "")
        min_age = eligibility_module.get("minimumAge", "0 Years")
        max_age = eligibility_module.get("maximumAge", "100 Years")
        gender = eligibility_module.get("sex", "ALL")
        investigator = collaborator_module.get("responsibleParty", {}).get(
            "investigatorFullName", ""
        )
        overall_official = contacts_locations_module.get("overallOfficials", {})

        central_contacts = contacts_locations_module.get(
            "centralContacts", []
        )  # maybe change
        contacts = []
        for contact in central_contacts:
            contacts.append(contact.get("email", ""))
        locations = contacts_locations_module.get("locations", [])
        cities = []
        zips = []
        countries = []
        states = []
        lats = []
        longs = []
        names = []
        facilities = []

        for location in locations:
            if city := location.get("city"):
                cities.append(city)

            if zipc := location.get("zip"):
                zips.append(zipc)

            if country := location.get("country"):
                countries.append(country)

            if state := location.get("state"):
                states.append(state)

            if facility := location.get("facility"):
                facilities.append(facility)

            if lat := location.get("geoPoint", {}).get("lat"):
                lats.append(lat)

            if long := location.get("geoPoint", {}).get("lon"):
                longs.append(long)

            location_contact = location.get("contacts", {})
            if len(location_contact) > 0:
                names.append(location_contact[0].get("name", ""))

            break

        new_study_format = {
            "NCTId": nctid,
            "Condition": "|".join(conditions),
            "BriefTitle": brief_title,
            "DetailedDescription": description,
            "MinimumAge": min_age,
            "MaximumAge": max_age,
            "LocationCountry": countries[0] if len(countries) > 0 else "",
            "LocationState": states[0] if len(states) > 0 else "",
            "LocationCity": cities[0] if len(cities) > 0 else "",
            "LocationZip": zips[0] if len(zips) > 0 else "",
            "LocationFacility": facilities[0] if len(facilities) > 0 else "",
            "LocationLatitude": float(lats[0]) if len(lats) > 0 else -1,
            "LocationLongitude": float(longs[0]) if len(longs) > 0 else -1,
            "OverallStatus": "Recruiting",
            "Gender": gender,
            "Keyword": "|".join(keywords),
            "OverallOfficialName": (
                overall_official[0].get("name", "") if len(overall_official) > 0 else ""
            ),
            "LocationContactName": names[0] if len(names) > 0 else "",
            "PointOfContactEMail": "",
            "CentralContactEMail": contacts[0] if contacts else "",
            "ResponsiblePartyInvestigatorFullName": investigator,
        }

        list_of_new_study_formats.append(new_study_format)

    return json.dumps(list_of_new_study_formats)
