"""Test file for the TrialFetcher class."""

from .trial_fetcher import TrialFetcher

input_params = {
    "conditions": ["Chronic Obstructive Pulmonary Disease (COPD)", "COPD"],
    "age": 64,
    "sex": "Male",
    "max_distance": 250,
    "address": {
        #"street": "1280 Main St W",
        #"city": "Hamilton",
        #"province": "Ontario",
        "postalCode": "L8S 4L8",
    },
    "isSmoker": True, 
    "packYears": 10, 
    "FEV": 0, 
    "FEVPercent": 0, 
    "onDualTherapy": False, 
    "onTripleTherapy": False, 
    "isEosinophilic": False, 
    "bloodEosinophil": 0, 
    "numExacerbations": 5, 
    "numSevereExacerbations": 0

}

print(len(TrialFetcher.search_studies(input_params)))
