from TrialFetcher import TrialFetcher
import pandas as pd
import io
import re
import requests

input_parameters = {
    "age" : 22,
    "sex" : "Male",
    "streetAddress" : "1280 Main St W",
    "city" : "Hamilton",
    "province" : "Ontario",
    "country" : "Canada",
    "postalCode" : "L8S 4L8",
    "conditions" : ["heart attack"],
    "maxRank" : 0,
    "numExacerbations" : 0,
    "numFlares" : 0,
    "usesInhaler" : False,
    "usesInjection" : False,
    "isSmoker" : False,
    "asthmaSeverity" : "mild",
    "isEosinophilic" : False,
    "usesPillsTablets" : False,
    "onDualTherapy" : False,
    "onTripleTherapy" : False,
    "numCOPDFlares" : 0
}

print(TrialFetcher.search_studies(input_parameters))
