"""File containing filtering dictionaries"""

filtering_dict_num = {
    "numExacerbations": "exacerbation",
    "numFlares": "flares+OR+flare+up",
    "numHospitalVisits": "hospitalization+OR+hospital+visit",
    "numCOPDFlares": "COPD+OR+flares+OR+flare+up",
    "numSevereExacerbations": "exacerbation+OR+severe+exacerbation",
    "chronicCoughYears": "chronic+OR+cough",
}

filtering_dict_boolean = {
    "usesInhaler": "inhaler",
    "usesDailyInhaler": "daily+inhaler",
    "usesInjection": "injection+OR+injector+OR+Dupilumab+OR+Mepolizumab+OR+"
    "Benralizumab+OR+Tezepelumab",
    "isSmoker": "smoker+OR+smoking+OR+pack",
    "isEosinophilic": "eosinophilic+OR+eosinophilia",
    "usesPillsTablets": "pill+OR+oral+OR+azithromycin+OR+N+acetylcysteine+OR+"
    "roflumilast",
    "onMonotherapy": "monotherapy+OR+mono+therapy",
    "onDualTherapy": "dual+therapy+OR+therapy",
    "onTripleTherapy": "triple+therapy+OR+therapy",
    "onAnticoagulantTherapy": "anticoagulant+OR+anti+coagulant",
    "onOxygen": "oxygen+OR+O2",
    "onAntifibroticTherapy": "antifibrotic+OR+anti+fibrotic+OR+Nintedanib+OR+"
    "Pirfenidone+OR+Pirfenidone",
    "IPFDiagnosis": "idiopathic+pulmonary+fibrosis+OR+idiopathic",
    "autoimmuneDiagnosis": "auto+immune+OR+autoimmune+OR+rheumatoid+OR+"
    "scleroderma+OR+Scleroderma+OR+Myositis",
    "pulmonaryHypertension": "pulmonary+OR+hypertension",
    "unknownCoughReason": "unknown+cause+of+cough+OR+unknown+cough",
    "comorbidILD": "interstitial+lung+disease+OR+interstitial",
    "pulmonaryEndarterectomy": "pulmonary+endarterectomy+OR+PEA",
    "rightHeartCatheterization": "right+heart+catheterization",
    "obstructiveSleepApnea": "sleep+apnea+OR+OSA",
    "usesCPAP": "CPAP+OR+continuous+positive+airway+pressure",
    "usesBIPAP": "BIPAP+bilevel+positive+airway+pressure"
    "+OR+bi+level+positive+airway+pressure",
    "onOralApplianceTherapy": "oral+appliance+therapy",
    "onPositionalTherapy": "positional+therapy",
    "sleepApneaSurgery": "sleep+apnea+surgery+OR+surgery",
    "OHSDiagnosis": "obesity+hypoventilation+syndrome+OR+OHS",
    "otherConditionDiagnosis": "sleep+condition+OR+comorbid+OR+diagnosis",
    "hasInsomnia": "insomnia+OR+lack+of+sleep",
    "usesCannabis": "cannabis+OR+marijuana+OR+sativa+OR+indica+OR+THC",
    "adherentToCPAP": "adherent+OR+adherence",
    "comorbidHypertension": "hypertension+OR+hypertensive",
    "comorbidOLD": "obstructive+lung+disease+OR+OLD",
    "comorbidAtrialFibrilation": "atrial+fibrilation",
    "comorbidCongestiveHeartFailure": "congestive+heart+failure",
    "comorbidDepressionAnxiety": "depression+OR+anxiety",
    "daytimeSleepiness": "daytime+sleepiness+OR+drowsiness+OR+lethargy",
    "PHGroup1": "pulmonary+arterial+hypertension+OR+PAH",
    "PHGroup2": "left+heart+disease+OR+LHD+OR+left",
    "PHGroup3": "lung+disease",
    "PHGroup4": "clot",
    "PHGroup5": "unknown",
    "hasAsthma": "asthma",
    "hasNonAsthmaEosinophilic": "non+asthmatic+eosinophilic+bronchitis+OR+NEAB",
    "hasNasalDisease": "nasal+disease+OR+nose",
    "gastralReflux": "gastro+oesophageal+reflux+OR+GERD",
    "hasCOPD": "COPD+OR+chronic+obstructive+pulmonary",
    "investigateCXR": "CXR+OR+chest+radiograph",
    "investigateCT": "chest+CT+OR+chest+computed+tomography",
    "investigateSpirometry": "spirometry",
    "investigateMethacholine": "methacholine+OR+MCT",
    "hasOSA": "OSA+OR+obstructive+sleep+apnea",
    "hasOSAOHS": "OSA+OR+obstructive+sleep+apnea+OR+OHS+OR+obesity+hypoventilation",
    "hasHypoventilation": "hypoventilation+OR+hypo+ventilation",
    "hasCentralSleepApnea": "central+sleep+apnea",
    "hasNarcolepsy": "narcolepsy",
    "hasIdiopathicHypersomnia": "idiopathic+hypersomnia+OR+hypersomnia",
    "hasRBD": "REM+sleep+behavior+disorder+OR+RBD+OR+rapid+eye+movement+sleep+behavior+disorder",
    "hasNREM": "non+REM+OR+non+rapid+eye+movement",
    "hasRestlessLeg": "restless+leg",
    "onAsthmaBiologic" : "biologic",
    "dailyCough" : "daily+cough+OR+frequent+cough",
    "triedInhalersEtc" : "inhaler+OR+nasal+spray+OR+anti+acid"
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
# WHOFunctionalClass : str "1", "2", "3", "4"
# pulmonaryVascularResistance : float
# underlyingCondition : list
# coughSeverity : int
# backgroundTherapy : "dual therapy", "triple therapy", "mono therapy"
# maskType : "nasal", "oronasal", "full face"
# perscribedBIPAP : "BiPAP-S", "BiPAP-ST"
