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
    
}

print(len(TrialFetcher.search_studies(input_params)))
