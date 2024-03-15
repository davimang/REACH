"""File containing filtering dictionaries"""

filtering_dict_num = {
    "numExacerbations": "exacerbation",
    "numFlares": "flare",
    "numHospitalVisits": "hospitalization",
    "numCOPDFlares": "COPD+OR+flares",
    "numSevereExacerbations": "severe+OR+exacerbations",
    "chronicCoughYears": "chronic+OR+cough",
}

filtering_dict_boolean = {
    "usesInhaler": "inhaler",
    "usesDailyInhaler": "daily+inhaler",
    "usesInjection": "injection+OR+Injection+OR+Dupilumab+OR+Mepolizumab+OR+"
    "Benralizumab+OR+Tezepelumab",
    "isSmoker": "smoker+OR+smoking",
    "isEosinophilic": "eosinophilic",
    "usesPillsTablets": "pill+OR+oral",
    "onMonotherapy": "monotherapy+OR+mono+therapy",
    "onDualTherapy": "dual+therapy",
    "onTripleTherapy": "triple+therapy",
    "onAnticoagulantTherapy": "anticoagulant",
    "onOxygen": "oxygen",
    "onAntifibroticTherapy": "antifibrotic+therapy+OR+Nintedanib+OR+Pirfenidone+OR+Pirfenidone",
    "IPFDiagnosis": "idiopathic+pulmonary+fibrosis",
    "autoimmuneDiagnosis": "auto+immune+OR+rheumatoid+OR+Scleroderma+OR+Scleroderma+OR+Myositis",
    "pulmonaryHypertension": "Pulmonary+OR+hypertension",
    "unknownCoughReason": "unknown+cause+of+cough",
    "comorbidILD": "interstitial+lung+disease",
    "pulmonaryEndarterectomy": "pulmonary+endarterectomy",
    "rightHeartCatheterization": "right+heart+catheterization",
    "obstructiveSleepApnea": "sleep+apnea",
    "usesCPAP": "CPAP",
    "usesBIPAP": "BIPAP",
    "onOralApplianceTherapy": "oral+appliance+therapy",
    "onOralPositionalTherapy": "positional+therapy",
    "sleepApneaSurgery": "sleep+apnea+surgery",
    "OHSDiagnosis": "obesity+hypoventilation+syndrome+OR+OHS",
    "otherConditionDiagnosis": "sleep+condition",
    "hasInsomnia": "insomnia",
    "usesCannabis": "cannabis+OR+marijuana",
    "adherentToCPAP": "CPAP+adherent",
    "comorbidHypertension": "hypertension",
    "comorbidOLD": "obstructive+lung+disease+OR+OLD",
    "comorbidAtrialFibrilation": "atrial+fibrilation",
    "comorbidCongestiveHeartFailure": "congestive+heart+failure",
    "comorbidDepressionAnxiety": "depression+OR+anxiety",
    "daytimeSleepiness": "daytime+sleepiness+OR+drowsiness",
    # new variables start here
    "PHGroup1": "pulmonary+arterial+hypertension",
    "PHGroup2": "left+heart+disease",
    "PHGroup3": "lung+disease",
    "PHGroup4": "blood+clot",
    "PHGroup5": "unknown+cause",
    "hasAsthma": "asthma",
    "hasNonAsthmaEosinophilic": "non+asthmatic+eosinophilic+bronchitis",
    "hasNasalDisease": "nasal+disease",
    "gastralReflux": "gastro+oesophageal+reflux+disease",
    "hasCOPD": "COPD+OR+chronic+obstructive+pulmonary+disease",
    "investigateCXR": "CXR",
    "investigateCT": "CT+chest",
    "investigateSpirometry": "spirometry",
    "investigateMethacholine": "methacholine+challenge",
    "hasOSA": "OSA+OR+obstructive+sleep+apnea",
    "hasOSAOHS": "OSA+OR+obstructive+sleep+apnea+OR+OHS+OR+obesity+hypoventilation+syndrome",
    "hasHypoventilation": "hypoventilation",
    "hasCentralSleepApnea": "central+sleep+apnea",
    "hasNarcolepsy": "narcolepsy",
    "hasIdiopathicHypersomnia": "idiopathic+hypersomnia",
    "hasRBD": "REM+sleep+behavior+disorder+OR+RBD+OR+rapid+eye+movement+sleep+behavior+disorder",
    "hasNREM": "non+REM+OR+non+rapid+eye+movement",
    "hasRestlessLeg": "restless+leg+syndrome",
}

filtering_dict_special = {
    "FEV": [[3.5, 4.5], [2.5, 3.25]],
    "FEVPercent": [0.8, 1.2],
    "FVC": [[4.75, 5.5], [3.25, 3.75]],
    "FVCPercent": [0.8, 1.2],
    "DLCO": [0.75, 1.4],
    "bloodEosinophil": [30, 350],
    "BMI": [18.5, 25],
}

# variables not shown here
# packYears : float
# phGroup : int
# apneadIndex : float
# nadirO2Saturation : float (percentage)
# WHOFunctionalClass : int [1,4]
# pulmonaryVascularResistance : float

# New
# underlyingCondition : list
