"""TrialFetcher module"""
import io
import re
import json
import requests
import pandas as pd
from .trial_filterer import TrialFilterer

API_URL2 = (
    r"https://clinicaltrials.gov/api/v2/studies?format=json&countTotal=true&filter.overallStatus=RECRUITING&"
    r"fields=NCTId,Condition,BriefTitle,DetailedDescription,"
    r"MinimumAge,MaximumAge,LocationCountry,LocationState,"
    r"LocationCity,LocationZip,OverallStatus,Gender,Keyword,"
    r"PointOfContactEMail,CentralContactEMail,ResponsiblePartyInvestigatorFullName&"
)

TIMEOUT_SEC = 5


class TrialFetcher:
    """This class encapsulates the trial retrieval functionality"""

    temp_studies = pd.DataFrame()

    @staticmethod
    def search_studies(input_params: dict) -> str:
        """Method to retrieve relevant trials to filter and return"""

        # extract conditions, serialize into useable string
        conditions = input_params["conditions"]
        conditions = [c.replace(" ", "+") for c in conditions]

        # concatenate conditions
        condition_search = conditions[0]
        if len(conditions) > 1:
            for cond in conditions[1:]:
                condition_search += "+" + cond

        # put expression together
        search_template = API_URL2 + "query.cond=" + condition_search

        # start one rank up from the last rank returned by a previous call
       
        studies = pd.DataFrame()

        # keep pulling trials until you hit 5 or 
        next_page = input_params.get("next_page")
        while studies.shape[0] < 5:            
            search_url = search_template + f"&pageToken={next_page}" if next_page else search_template
            print(search_url)
            # timed section
            response = requests.get(search_url, timeout=TIMEOUT_SEC)
            
            json_response = response.json()
            next_page = json_response.get("nextPageToken")
            content = build_study_dict(json_response)
            try:  # break if the timeout is reached (or the api returns unreadable data)
                buffer = io.StringIO(content)
                temp = pd.read_json(buffer)
            except ValueError:  # if data can't be read
                break

            if not next_page:
                break

            # remove any invalid trials
            temp = TrialFilterer.filter_trials(temp, input_params)
            if temp.shape[0] > 0:  # if not empty, add to accepted trials
                studies = pd.concat([studies, temp], ignore_index=True)
            

        if studies.shape[0] == 0:
            return pd.DataFrame(
                columns=[
                    "NCTId",
                    "BriefTitle",
                    "DetailedDescription",
                    "OverallStatus",
                    "Distance",
                    "KeywordRank",
                    "url",
                    "FullAddress",
                    "PointOfContactEMail",
                    "CentralContactEMail",
                    "ResponsiblePartyInvestigatorFullName"
                ]
            )
        studies = studies.head(
            5
        )  # take the top 5 (since it can return up to 9 results)
        studies["url"] = (
            "https://clinicaltrials.gov/study/" + studies["NCTId"]
        )  # create url
        studies["nextPage"] = next_page
        studies = TrialFilterer.post_filter(
            studies, input_params
        )  # calculate distances
        # take only necessary fields
        print(studies.columns)

        studies = studies[
            [
                "NCTId",
                "BriefTitle",
                "DetailedDescription",
                "OverallStatus",
                "Distance",
                "KeywordRank",
                "url",
                "FullAddress",
                "PointOfContactEMail",
                "CentralContactEMail",
                "ResponsiblePartyInvestigatorFullName",
                "nextPage",
            ]
        ]
        results_json = studies.to_json(orient="index")  # convert to json
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
        min_age = eligibility_module.get("minimumAge", "0 Years")
        max_age = eligibility_module.get("maximumAge", "100 Years")
        gender = eligibility_module.get("sex", "ALL")
        investigator = collaborator_module.get("responsibleParty", {}).get("investigatorFullName", "")

        central_contacts = contacts_locations_module.get("centralContacts", []) #maybe change
        contacts = []
        for contact in central_contacts:
            contacts.append(contact.get("email", ""))
        locations = contacts_locations_module.get("locations", [])
        cities = []
        zips = []
        countries = []
        states = []
        for location in locations:
            if city := location.get("city"):
                cities.append(city)

            if zip := location.get("zip"):
                zips.append(zip)

            if country := location.get("country"):
                countries.append(country)

            if state := location.get("state"):
                states.append(state)
            
            break

        new_study_format = {
            "NCTId":nctid,
            "Condition": "|".join(conditions),
            "BriefTitle": brief_title,
            "DetailedDescription":description,
            "MinimumAge": min_age,
            "MaximumAge": max_age,
            "LocationCountry":"|".join(countries),
            "LocationState":"|".join(states),
            "LocationCity":"|".join(cities),
            "LocationZip":"|".join(zips),
            "OverallStatus":"Recruiting",
            "Gender":gender,
            "Keyword":"|".join(keywords),
            "PointOfContactEMail":"",
            "CentralContactEMail":"|".join(contacts),
            "ResponsiblePartyInvestigatorFullName":investigator
        }

        list_of_new_study_formats.append(new_study_format)

    
    return json.dumps(list_of_new_study_formats)
