'''File containing filtering dictionaries'''

filtering_dict_num = {
    "numExacerbations" : ["exacerbation", "Exacerbation"],
    "numFlares" : ["flare", "flare up", "flare-up", "Flare", "Flare up", "Flare-up"],
    "numHospitalVisits" : ["Hospital visit", "hospital visit"],
    "numCOPDFlares" : ["COPD flare", "COPD Flare"],
    "numSevereExacerbations" : ["Severe exacerbations", "severe exacerbations"],
    "chronicCoughYears" : ["chronic cough", "Chronic cough", "long term cough",
                           "long-term cough"]
}

filtering_dict_boolean = {
    "usesInhaler" : ["inhaler", "Inhaler"],
    "usesDailyInhaler" : ["daily inhaler", "Daily inhaler", "inhaler daily"],
    "usesInjection" : ["injection", "Injection", "Dupilumab", "Mepolizumab",
                       "Benralizumab","Tezepelumab"],
    "isSmoker" : ["smoker", "smoking", "Smoker", "Smoking"],
    "isEosinophilic" : ["Eosinophilic", "eosinophilic",
                        "Eosinophilia", "eosinophilia"],
    "usesPillsTablets" : ["pill", "Pill", "tablet",
                          "Tablet", "oral", "Oral"],
    "onDualTherapy" : ["dual therapy", "Dual therapy"],
    "onTripleTherapy" : ["triple therapy", "Triple therapy"],
    "onOxygen" : ["oxygen", "Oxygen"],
    "onAntifibroticTherapy" : ["antifibrotic therapy", "Antifibrotic therapy",
                               "Antifibrotic Therapy", "nintedanib",
                               "Nintedanib", "pirfenidone", "Pirfenidone"],
    "IPFDiagnosis" : ["Idiopathic pulmonary fibrosis", "pulmonary fibrosis",
                      "Pulmonary fibrosis"],
    "autoimmuneDiagnosis" : ["autoimmune", "Autoimmune", "auto-immune",
                             "Auto-immune", "rheumatoid", "Rheumatoid",
                             "scleroderma", "Scleroderma", "myositis"],
    "pulmonaryHypertension" : ["Pulmonary", "pulmonary", "hypertension",
                               "Hypertension"],
    "unknownCoughReason" : ["unknown"]
}

filtering_dict_special = {
    "FEV" : [[3.5,4.5],[2.5,3.25]],
    "FEVPercent" : [0.8, 1.2],
    "FVC" : [[4.75,5.5],[3.25,3.75]],
    "FVCPercent" : [0.8, 1.2],
    "DLCO" : [0.75, 1.4],
    "bloodEosinophil" : [30,350]
}
