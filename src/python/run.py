from TrialFetcher import TrialFetcher

inputdata = '{"age" : 40, "address" : "1280 Main St W, Hamilton, ON L8S 4L8", "sex" : "male","conditions" : ["asthma"],"numExacerbations" : 1,"numFlares" : 1,"usesInhaler" : true,"usesInjection" : false,"isSmoker" : true,"FEV1Litres" : 4.0,"FEV1Percent" : 0.8,"asthmaSeverity" : "mild","isEosinophilic" : false,"numCOPDFlares" : 0,"usesPillsTablets" : false,"onDualTherapy" : false,"onTripleTherapy" : false}'

df = TrialFetcher.search_studies(inputdata)
print(df)
