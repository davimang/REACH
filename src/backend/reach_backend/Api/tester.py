from .trial_fetcher import TrialFetcher

input_params = {
    "conditions" : ["asthma"],
    "maxRank" : 0,
    "age" : 40,
    "sex" : "Male",
    "max_distance" : 1000000,
    "address" : {
        "street" : "1280 Main St W",
        "city" : "Hamilton",
        "province" : "Ontario",
        "postalCode" : "L8S 4L8"
    },
    "isSmoker" : True,
    "packYears" : 3
}

print(TrialFetcher.search_studies(input_params))
