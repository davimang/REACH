"""Test file for the TrialFetcher class."""

from .trial_fetcher import TrialFetcher

input_params = {
    "conditions": ["asthma"],
    "age": 63,
    "sex": "Male",
    "max_distance": 250,
    "address": {
        "street": "1280 Main St W",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L8S 4L8",
    },
    "isSmoker": False,
    "packYears": 0,
    "FEV": 0,
    "FEVPercent": 0,
    "asthmaSeverity":
    "Mild",
    "onAsthmaBiologic": False,
    "isEosinophilic": True,
    "bloodEosinophil": 0,
    "numExacerbations": 0,
    "numSevereExacerbations": 0,
    #"usesDailyInhaler": True,
    #"usesInjection": True
}

print(len(TrialFetcher.search_studies(input_params)))
