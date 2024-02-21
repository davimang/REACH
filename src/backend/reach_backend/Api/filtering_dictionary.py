'''File containing filtering dictionaries'''

filtering_dict_num = {
    "numExacerbations" : ["exacerbation", "Exacerbation"],
    "numFlares" : ["flare", "flare up", "flare-up", "Flare", "Flare up", "Flare-up"],
    "numHospitalVisits" : ["Hospital visit", "hospital visit"],
    "numCOPDFlares" : ["COPD flare", "COPD Flare"],
    "numSevereExacerbations" : ["Severe exacerbations", "severe exacerbations"]
}

filtering_dict_boolean = {
    "usesInhaler" : ["inhaler", "Inhaler"],
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
    "onAntifibroticTherapy" : ["antifibrotic therapy", ""]
}

filtering_dict_special = {
    "FEV" : [[3.5,4.5],[2.5,3.25]],
    "FEVPercent" : [1,2],
    "FVC" : [[4.75,5.5],[3.25,3.75]],
    "FVCPercent" : [1,2]
}
