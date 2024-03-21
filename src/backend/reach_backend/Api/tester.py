"""Test file for the TrialFetcher class."""

from trial_fetcher import TrialFetcher

input_params = {
    "conditions": ["asthma"],
    "age": 64,
    "sex": "Male",
    "max_distance": 250,
    "address": {
        "street": "1280 Main St W",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L8S 4L8",
    },
    "numFlares": 0,
    "numHospitalVisits": 0,
    "usesDailyInhaler": False,
    "usesInjection": False,
    "isSmoker": False,
    "packYears": 0,
    "FEV": 0,
    "FEVPercent": 0,
    "asthmaSeverity": "Mild",
    "onAsthmaBiologic": False,
    "isEosinophilic": False,
    "bloodEosinophil": 0,
    "numExacerbations": 0,
    "numSevereExacerbations": 0
}

print(len(TrialFetcher.search_studies(input_params)))
