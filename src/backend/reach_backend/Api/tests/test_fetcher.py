"""Unit testing for the trial fetcher module."""

import json
from ..trial_fetcher import build_study_dict

study_keys = [
    "NCTId",
    "Condition",
    "BriefTitle",
    "DetailedDescription",
    "MinimumAge",
    "MaximumAge",
    "LocationCountry",
    "LocationState",
    "LocationCity",
    "LocationZip",
    "LocationLatitude",
    "LocationLongitude",
    "OverallStatus",
    "Gender",
    "Keyword",
    "PointOfContactEMail",
    "CentralContactEMail",
    "ResponsiblePartyInvestigatorFullName",
]


def test_build_study_dict():
    """Test helper function used by the fetcher to
    build study dict for the trial filterer.

    Module: TrialFetcher
    Id: UNT-21
    """
    sample_ctg_response = open("sample_api_response.json", encoding="utf-8")

    response = json.load(sample_ctg_response)

    study_dict = build_study_dict(response)

    assert all(key in study_dict for key in study_keys)
