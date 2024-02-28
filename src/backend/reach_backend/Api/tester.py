from trial_fetcher import TrialFetcher

input_params = {
    "conditions" : ["asthma"],
    "maxRank" : 0,
    "age" : 40,
    "sex" : "Male",
    "address" : {
        "street" : "1280 Main St W",
        "city" : "Hamilton",
        "province" : "Ontario",
        "postalCode" : "L8S 4L8"
    },
    "packYears" : 5
}

print(TrialFetcher.search_studies(input_params))
