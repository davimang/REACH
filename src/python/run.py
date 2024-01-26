from TrialFetcher import TrialFetcher

inputdata = '{"age" : 40,"address" : "156 Bond St S, Hamilton, Ontario, Canada, L8S 1T2","sex" : "male","conditions" : ["asthma"],"numExacerbations" : 1,"numFlares" : 1,"usesInhaler" : true,"usesInjection" : false,"isSmoker" : true,"FEV1Litres" : 4.0,"FEV1Percent" : 0.8,"AsthmaSeverity" : "mild","isEosinophilic" : false,"numCOPDFlares" : 0,"usesPillsTablets" : false,"onDualTherapy" : false,"onTripleTherapy" : false}'

df = TrialFetcher.search_studies(inputdata)
print(df)
