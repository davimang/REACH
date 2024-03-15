"""Test file for the TrialFetcher class."""

from .trial_fetcher import TrialFetcher

input_params = {
    "conditions": ["asthma"],
    "maxRank": 0,
    "age": 40,
    "sex": "Male",
    "max_distance": 1000000,
    "address": {
        "street": "1280 Main St W",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L8S 4L8",
    },
    "isSmoker": True,
    "packYears": 3,
    "FEV": 4,
    "FEVPercent": 1.4,
    "DLCO": 0.6,
    "BMI": 27,
    "bloodEosinophil": 400,
}

print(TrialFetcher.search_studies(input_params))
