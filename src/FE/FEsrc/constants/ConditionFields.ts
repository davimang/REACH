const asthma = {
    numFlares: {
        label: "Number of Flares (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: false,
        i: "a flare is defined by use of prednisone for asthma",
    },
    numHospitalVisits: {
        label: "Number of Hospital Visits for Asthma Flare (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: false,
        i: null,
    },
    usesDailyInhaler: {
        label: "Uses Regular Daily Inhaler",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "i.e. not \"only as-needed\" inhaler",
    },
    usesInjection: {
        label: "Uses Injectable Medication",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "examples include Dupilumab, Mepolizumab, Benralizumab, Tezepelumab",
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            packYears: {
                label: "Pack-Years",
                initial: 0,
                inputType: 'number',
                clinician: false,
                i: "number of years you smoked for multiplied by number of cigarettes smoked per day",
            },
        }
    },
    FEV: {
        label: "FEV\u2081 in Litres",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    FEVPercent: {
        label: "FEV\u2081 in %Predicted",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    asthmaSeverity: {
        label: "Asthma Severity",
        initial: '',
        inputType: 'dropdown',
        dropdownOptions: ["Mild", "Moderate", "Severe"],
        clinician: true,
        i: null,
    },
    isEosinophilic: {
        label: "Eosinophilic",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: {
            bloodEosinophil: {
                label: "Blood Eosinophils in Cells/Microlitre",
                initial: 0,
                inputType: 'number',
                clinician: true,
                i: null,
            },
        }
    },
    numExacerbations: {
        label: "Number of Exacerbations (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    numSevereExacerbations: {
        label: "Number of Severe Exacerbations (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: "severe exacerbation defined by hospitalization",
    }
};

const copd = {
    numCOPDFlares: {
        label: "Number of COPD Flares (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: false,
        i: "a flare is defined by use of prednisone and/or antibiotics for COPD",
    },
    numHospitalVisits: {
        label: "Number of Hospital Visits for COPD Flare (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: false,
        i: null,
    },
    usesDailyInhaler: {
        label: "Uses Regular Daily Inhaler",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "i.e. not \"only as-needed\" inhaler",
    },
    usesPillsTablets: {
        label: "Uses Pills/Tablets Regularly (e.g. daily, weekly) for COPD",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            packYears: {
                label: "Pack-Years",
                initial: 0,
                inputType: 'number',
                clinician: false,
                i: "number of years you smoked for multiplied by number of cigarettes smoked per day",
            },
        }
    },
    FEV: {
        label: "FEV\u2081 in Litres",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    FEVPercent: {
        label: "FEV\u2081 in %Predicted",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    onDualTherapy: {
        label: "On Dual Therapy Inhalers",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: "dual therapy includes LABA/LAMA and LABA/ICS",
    },
    onTripleTherapy: {
        label: "On Triple Therapy Inhalers",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: "triple therapy consists of LABA/LAMA/ICS",
    },
    isEosinophilic: {
        label: "Eosinophilic",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: {
            bloodEosinophil: {
                label: "Blood Eosinophils in Cells/Microlitre",
                initial: 0,
                inputType: 'number',
                clinician: true,
                i: null,
            },
        }
    },
    numExacerbations: {
        label: "Number of Exacerbations (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    numSevereExacerbations: {
        label: "Number of Severe Exacerbations (in the last 1-year)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: "severe exacerbation defined by hospitalization",
    }
};

const ild = {
    IPFDiagnosis: {
        label: "Diagnosis of Idiopathic Pulmonary Fibrosis",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    autoimmuneDiagnosis: {
        label: "Diagnosis of Autoimmune Disease",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "e.g. rheumatoid arthritis, scleroderma, inflammatory myositis",
    },
    onAntifibroticTherapy: {
        label: "On Antifibrotic Therapy (Nintedanib or Pirfenidone)",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    onOxygen: {
        label: "On Oxygen",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            packYears: {
                label: "Pack-Years",
                initial: 0,
                inputType: 'number',
                clinician: false,
                i: "number of years you smoked for multiplied by number of cigarettes smoked per day",
            },
        }
    },
    FVC: {
        label: "Forced Vital Capacity (FVC) in Litres",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    FVCPercent: {
        label: "Forced Vital Capacity (FVC) as %Predicted",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    DLCO: {
        label: "Diffusing Capacity for Carbon Monoxide (DLCO) as %Predicted",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    pulmonaryHypertension: {
        label: "Co-Existing Pulmonary Hypertension",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null, // they said they might provide a definition later
    }
};

const chronicCough = {
    dailyCough: { //dailyCough not in filtering dict
        label: "Have you had a daily cough lasting more than 8 weeks?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            chronicCoughYears: {
                label: "If so, approximately how many years?",
                initial: 0,
                inputType: 'number',
                clinician: false,
                i: null,
            },
        }
    },
    unknownCoughReason: {
        label: "Have you been told by your family physician or specialist that there is no serious problems to cause your coughing?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    hasAsthma: {
        label: "Currently or Previously Treated for Asthma",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasNonAsthmaEosinophilic: {
        label: "Currently or Previously Treated for Non-Asthmatic Eosinophilic Bronchitis",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasNasalDisease: {
        label: "Currently or Previously Treated for Nasal Disease",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    gastralReflux: {
        label: "Currently or Previously Treated for Gastro-Oesophageal Reflux Disease",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasCOPD: {
        label: "Currently or Previously Treated for COPD",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            packYears: {
                label: "Pack-Years",
                initial: 0,
                inputType: 'number',
                clinician: false,
                i: "number of years you smoked for multiplied by number of cigarettes smoked per day",
            },
        }
    },
    investigateCXR: {
        label: "Normal Investigation: CXR",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    investigateCT: {
        label: "Normal Investigation: CT Chest",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    investigateSpirometry: {
        label: "Normal Investigation: Spirometry",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    investigateMethacholine: {
        label: "Normal Investigation: Methacholine Challenge",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
};

const pulmonaryHypertension = {
    PHGroup1: {
        label: "PH Group 1",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    PHGroup2: {
        label: "PH Group 2",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    PHGroup3: {
        label: "PH Group 3",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: {
            comorbidILD: {
                label: "Is there Comorbid ILD?",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                i: null,
            },
        }
    },
    PHGroup4: {
        label: "PH Group 4",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: {
            pulmonaryEndarterectomy: {
                label: "Are you a candidate for pulmonary endarterectomy?",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                i: null,
            },
        }
    },
    WHOFunctionalClass: { //dropdown converts val to string -> okay in backend?
        label: "WHO Functional Class",
        initial: "",
        inputType: 'dropdown',
        dropdownOptions: [1, 2, 3, 4],
        clinician: true,
        i: null,
    },
    PHTherapy: { //PHTherapy not in filtering dict as dropdown options
        label: "Background Therapy for Pulmonary Hypertension",
        initial: "",
        inputType: 'dropdown',
        dropdownOptions: ["None", "Monotherapy", "Dual Therapy", "Triple Therapy"],
        clinician: true,
        i: null,
    },
    rightHeartCatheterization: {
        label: "Right Heart Catheterization (in the last 1-year)?",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    pulmonaryVascularResistance: {
        label: "Pulmonary Vascular Resistance (dyn\u22c5s/cm\u2075)", // cross mult sign = \u00d7;
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    onAnticoagulantTherapy: {
        label: "Anticoagulant Therapy",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
};

const primarySleepDisorderChildren = {
    apneadIndex: {
        label: "Apnea Hypopnea Index (events/hour)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    nadirO2Saturation: {
        label: "Nadir O\u2082 Saturation (%)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    daytimeSleepiness: {
        label: "Pre-Treatment Excessive Daytime Sleepiness (Epworth sleepiness scale \u2265 10/24)",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    usesCPAP: {
        label: "Prescribed CPAP",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            adherentToCPAP: {
                label: "Adherent to CPAP (\u22654 hours/night for \u226570% of the time per 30 days)",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: null,
            }
        },
    },
    usesBIPAP: {
        label: "Prescribed BiPAP",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: {}, // no [bipap-s, bipap-st] in filtering dict
    },
    onOralApplianceTherapy: {
        label: "Using Oral Appliance Therapy for Sleep Apnea",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    onOralPositionalTherapy: { // might want to change this to positional therapy?
        label: "Using Positional Therapy (e.g. anti-snore vest/belt) to Prevent Sleeping on your Back",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    sleepApneaSurgery: {
        label: "Underwent Surgery for Obstructive Sleep Apnea",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
};

const sleepDisorders = {
    obstructiveSleepApnea: {
        label: "Diagnosis of Obstructive Sleep Apnea?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
        children: {
            usesCPAP: {
                label: "Using CPAP Therapy",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: "continuous positive airway pressure",
                // children: {} - no mask type in filtering dict
            },
            usesBIPAP: {
                label: "Using BiPAP Therapy",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: "bilevel positive airway pressure",
            },
            onOralApplianceTherapy: {
                label: "Using Oral Appliance Therapy for Sleep Apnea",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: null,
            },
            onOralPositionalTherapy: { // might want to change this to positional therapy?
                label: "Using Positional Therapy (e.g. anti-snore vest/belt) to Prevent Sleeping on your Back",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: null,
            },
            sleepApneaSurgery: {
                label: "Underwent Surgery for Obstructive Sleep Apnea",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: null,
            },
            OHSDiagnosis: {
                label: "Have you also been diagnosed with Obesity Hypoventilation Syndrome (OHS)?",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: null,
            },
        }
    },
    otherConditionDiagnosis: {
        label: "Have you been diagnosed with another condition (not OSA or OHS) where you breathe less at night (i.e. Hypoventilation)?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "examples include central sleep apnea",
        children: {
            usesBIPAP: {
                label: "Using BiPAP Therapy",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: "bilevel positive airway pressure",
            },
        }
    },
    hasInsomnia: {
        label: "Do you have insomnia?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "does not have to be physician diagnosed",
    },
    usesCannabis: {
        label: "Current Cannabis Use",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    isSmoker: {
        label: "Current Cigarette Smoking",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: null,
    },
    ///// clinician facing
    hasOSA: {
        label: "Primary Sleep Disorder: OSA",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: primarySleepDisorderChildren,
    },
    hasOSAOHS: {
        label: "Primary Sleep Disorder: OSA/OHS",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: primarySleepDisorderChildren,
    },
    hasHypoventilation: {
        label: "Primary Sleep Disorder: Hypoventilation (not OHS)",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: primarySleepDisorderChildren,
    },
    hasCentralSleepApnea: {
        label: "Primary Sleep Disorder: Central Sleep Apnea",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
        children: primarySleepDisorderChildren,
    },
    hasNarcolepsy: {
        label: "Primary Sleep Disorder: Narcolepsy",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasIdiopathicHypersomnia: {
        label: "Primary Sleep Disorder: Idiopathic Hypersomnia",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasRBD: {
        label: "Primary Sleep Disorder: RBD",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasNREM: {
        label: "Primary Sleep Disorder: NREM Parasomnia",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    hasRestlessLeg: {
        label: "Primary Sleep Disorder: Restless Legs Syndrome",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    BMI: {
        label: "Body mass Index (kg/m\u00b2)",
        initial: 0,
        inputType: 'number',
        clinician: true,
        i: null,
    },
    comorbidHypertension: {
        label: "Comorbid Hypertension",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    comorbidOLD: {
        label: "Comorbid Obstructive Lung Disease (e.g. Asthma, COPD)",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    comorbidAtrialFibrilation: {
        label: "Comorbid Atrial Fibrillation",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    comorbidCongestiveHeartFailure: {
        label: "Comorbid Congestive Heart Failure",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
    comorbidDepressionAnxiety: {
        label: "Comorbid Depression/Anxiety",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null,
    },
};

export const Conditions = {
    Asthma: asthma,
    "Chronic Obstructive Pulmonary Disease (COPD)": copd,
    "Interstitial Lung Disease (ILD)": ild,
    "Chronic Cough": chronicCough,
    "Pulmonary Hypertension": pulmonaryHypertension,
    "Sleep Disorders": sleepDisorders,
};
