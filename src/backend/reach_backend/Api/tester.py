"""Test file for the TrialFetcher class."""

from .trial_fetcher import TrialFetcher

input_params = {
    "conditions": ["chronic cough"],
    "maxRank": 0,
    "age": 40,
    "sex": "Male",
    "max_distance": 250,
    "address": {
        "street": "1280 Main St W",
        "city": "Hamilton",
        "province": "Ontario",
        "postalCode": "L8S 4L8",
    },
}

print(TrialFetcher.search_studies(input_params))
