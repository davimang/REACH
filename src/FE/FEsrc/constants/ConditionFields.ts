const healthy = {
    literate: {
        label: "Able to read and/or understand english",
        initial: false,
        inputType: 'checkbox',
        clinician: "both"
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
        children: {
            yearsSmoked: {
                label: "How many Years have you Smoked?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            dailySmokes: {
                label: "How many Cigarettes did you Smoke per day while Smoking?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            packYears: {
                label: "Pack-Years",
                initial: null,
                inputType: 'number',
                clinician: true,
                i: "number of years you smoked for multiplied by number of packs of cigarettes smoked per day",
            },
        }
    },
    respiratoryDisease: {
        label: "Current or previous history of respiratory disease",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
    }
}

const asthma = {
    numFlares: {
        label: "Number of Flares (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: false,
        i: "a flare is defined by use of prednisone for asthma",
    },
    numHospitalVisits: {
        label: "Number of Hospital Visits for Asthma Flare (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: false,
    },
    usesDailyInhaler: {
        label: "Uses Regular Daily Inhaler",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "i.e. not \"only as-needed\" inhaler",
    },
    usesInjection: {
        label: "Uses Injectable Medication for Asthma",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "examples include Dupilumab, Mepolizumab, Benralizumab, Tezepelumab",
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
        children: {
            yearsSmoked: {
                label: "How many Years have you Smoked?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            dailySmokes: {
                label: "How many Cigarettes did you Smoke per day while Smoking?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            packYears: {
                label: "Pack-Years",
                initial: null,
                inputType: 'number',
                clinician: true,
                i: "number of years you smoked for multiplied by number of packs of cigarettes smoked per day",
            },
        }
    },
    FEV: {
        label: "FEV\u2081 in Litres",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    FEVPercent: {
        label: "FEV\u2081 in %Predicted",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    asthmaSeverity: {
        label: "Asthma Severity",
        initial: '',
        inputType: 'dropdown',
        dropdownOptions: ["Mild", "Moderate", "Severe"],
        clinician: true,
    },
    onAsthmaBiologic: {
        label: "On Asthma Biologic",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    isEosinophilic: {
        label: "Eosinophilic",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        children: {
            bloodEosinophil: {
                label: "Blood Eosinophils in Cells/Microlitre",
                initial: null,
                inputType: 'number',
                clinician: true,
            },
        }
    },
    numExacerbations: {
        label: "Number of Exacerbations (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    numSevereExacerbations: {
        label: "Number of Severe Exacerbations (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: true,
        i: "severe exacerbation defined by hospitalization",
    }
};

const copd = {
    numCOPDFlares: {
        label: "Number of COPD Flares (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: false,
        i: "a flare is defined by use of prednisone and/or antibiotics for COPD",
    },
    numHospitalVisits: {
        label: "Number of Hospital Visits for COPD Flare (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: false,
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
        i: "e.g. Azithromycin, N-acetylcysteine [NAC], Roflumilast"
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
        children: {
            yearsSmoked: {
                label: "How many Years have you Smoked?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            dailySmokes: {
                label: "How many Cigarettes did you Smoke per day while Smoking?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            packYears: {
                label: "Pack-Years",
                initial: null,
                inputType: 'number',
                clinician: true,
                i: "number of years you smoked for multiplied by number of packs of cigarettes smoked per day",
            },
        }
    },
    FEV: {
        label: "FEV\u2081 in Litres",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    FEVPercent: {
        label: "FEV\u2081 in %Predicted",
        initial: null,
        inputType: 'number',
        clinician: true,
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
        children: {
            bloodEosinophil: {
                label: "Blood Eosinophils in Cells/Microlitre",
                initial: null,
                inputType: 'number',
                clinician: true,
            },
        }
    },
    numExacerbations: {
        label: "Number of Exacerbations (in the last 1-year)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    numSevereExacerbations: {
        label: "Number of Severe Exacerbations (in the last 1-year)",
        initial: null,
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
        clinician: "both",
    },
    autoimmuneDiagnosis: {
        label: "Diagnosis of Autoimmune Disease",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
        i: "e.g. rheumatoid arthritis, scleroderma, inflammatory myositis",
    },
    onAntifibroticTherapy: {
        label: "On Antifibrotic Therapy (Nintedanib or Pirfenidone)",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
    },
    onOxygen: {
        label: "On Oxygen",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: "both",
        children: {
            yearsSmoked: {
                label: "How many Years have you Smoked?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            dailySmokes: {
                label: "How many Cigarettes did you Smoke per day while Smoking?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
            packYears: {
                label: "Pack-Years",
                initial: null,
                inputType: 'number',
                clinician: true,
                i: "number of years you smoked for multiplied by number of packs of cigarettes smoked per day",
            },
        }
    },
    FVC: {
        label: "Forced Vital Capacity (FVC) in Litres",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    FVCPercent: {
        label: "Forced Vital Capacity (FVC) as %Predicted",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    DLCO: {
        label: "Diffusing Capacity for Carbon Monoxide (DLCO) as %Predicted",
        initial: null,
        inputType: 'number',
        clinician: true,
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
    dailyCough: {
        label: "Have you had a daily cough lasting more than 8 weeks?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        children: {
            chronicCoughYears: {
                label: "If so, approximately how many years?",
                initial: null,
                inputType: 'number',
                clinician: false,
            },
        }
    },
    unknownCoughReason: {
        label: "Have you been told by your family physician or specialist that there is no serious problems to cause your coughing?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
    },
    triedInhalersEtc: {
        label: "Have you tried inhalers, nasal sprays, and anti-acid medication and still coughing?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
    },
    coughSeverity: {
        label: "On a scale of 0 to 10, where 0 is no cough, and 10 is maximal or worst possible cough, how would you rate the severity of your cough overall (over the last 1-month)?",
        initial: null,
        inputType: 'number',
        clinician: false,
    },
    underlyingConditionsSUBHEADER: {
        label: "Underlying Conditions Currently or Previously Treated For (select all that apply):",
        initial: true,
        clinician: true,
        children: {
            hasAsthma: {
                label: "Asthma",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasNonAsthmaEosinophilic: {
                label: "Non-Asthmatic Eosinophilic Bronchitis",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasNasalDisease: {
                label: "Nasal Disease",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            gastralReflux: {
                label: "Gastro-Oesophageal Reflux Disease",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasCOPD: {
                label: "COPD",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
        },
    },
    isSmoker: {
        label: "Current or Ex-Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        children: {
            packYears: {
                label: "Pack-Years",
                initial: null,
                inputType: 'number',
                clinician: true,
                i: "number of years you smoked for multiplied by number of packs of cigarettes smoked per day",
            },
        }
    },
    investigationsSUBHEADER: {
        label: "Normal Investigations (select all that apply):",
        initial: true,
        clinician: true,
        children: {
            investigateCXR: {
                label: "CXR",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            investigateCT: {
                label: "CT Chest",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            investigateSpirometry: {
                label: "Spirometry",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            investigateMethacholine: {
                label: "Methacholine Challenge",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
        },
    },
};

const pulmonaryHypertension = {
    PHGroupSUBHEADER: {
        label: "PH Group:",
        initial: true,
        clinician: true,
        children: {
            PHGroup1: {
                label: "Group 1",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            PHGroup2: {
                label: "Group 2",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            PHGroup3: {
                label: "Group 3",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: {
                    comorbidILD: {
                        label: "Is there Comorbid ILD?",
                        initial: false,
                        inputType: 'checkbox',
                        clinician: true,
                    },
                }
            },
            PHGroup4: {
                label: "Group 4",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: {
                    pulmonaryEndarterectomy: {
                        label: "Are you a candidate for pulmonary endarterectomy?",
                        initial: false,
                        inputType: 'checkbox',
                        clinician: true,
                    },
                }
            },
        },
    },
    WHOFunctionalClass: {
        label: "WHO Functional Class",
        initial: "",
        inputType: 'dropdown',
        dropdownOptions: [1, 2, 3, 4],
        clinician: true,
    },
    backgroundTherapy: {
        label: "Background Therapy for Pulmonary Hypertension",
        initial: "",
        inputType: 'dropdown',
        dropdownOptions: ["None", "Mono Therapy", "Dual Therapy", "Triple Therapy"],
        clinician: true,
    },
    rightHeartCatheterization: {
        label: "Right Heart Catheterization (in the last 1-year)?",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    pulmonaryVascularResistance: {
        label: "Pulmonary Vascular Resistance (dyn\u22c5s/cm\u2075)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    onAnticoagulantTherapy: {
        label: "Anticoagulant Therapy",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
};

const primarySleepDisorderChildren = {
    apneadIndex: {
        label: "Apnea Hypopnea Index (events/hour)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    nadirO2Saturation: {
        label: "Nadir O\u2082 Saturation (%)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    daytimeSleepiness: {
        label: "Pre-Treatment Excessive Daytime Sleepiness (Epworth sleepiness scale \u2265 10/24)",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    usesCPAP: {
        label: "Prescribed CPAP",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        children: {
            adherentToCPAP: {
                label: "Adherent to CPAP (\u22654 hours/night for \u226570% of the time per 30 days)",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            }
        },
    },
    usesBIPAP: {
        label: "Prescribed BiPAP",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        children: {
            perscribedBIPAP: {
                label: "BiPAP-S or BiPAP-ST",
                initial: "",
                inputType: 'dropdown',
                dropdownOptions: ["BiPAP-S", "BiPAP-ST"],
                clinician: true,
            }
        },
    },
    onOralApplianceTherapy: {
        label: "Using Oral Appliance Therapy for Sleep Apnea",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    onPositionalTherapy: {
        label: "Using Positional Therapy (e.g. anti-snore vest/belt) to Prevent Sleeping on your Back",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    sleepApneaSurgery: {
        label: "Underwent Surgery for Obstructive Sleep Apnea",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
};

const sleepDisorders = {
    obstructiveSleepApnea: {
        label: "Diagnosis of Obstructive Sleep Apnea?",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        children: {
            usesCPAP: {
                label: "Using CPAP Therapy",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
                i: "continuous positive airway pressure",
                children: {
                    maskType: { // TODO: BE change: oronasal and full face are the same -> add full face mask search to oronasal mask
                        label: "What type of mask do you use?",
                        initial: "",
                        inputType: 'dropdown',
                        dropdownOptions: ["Nasal", "Oronasal"],
                        clinician: false,
                        i: "nasal mask (mouth is not covered), oronasal mask (full face mask where mouth is covered)",
                    },
                },
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
            },
            onPositionalTherapy: {
                label: "Using Positional Therapy (e.g. anti-snore vest/belt) to Prevent Sleeping on your Back",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
            },
            sleepApneaSurgery: {
                label: "Underwent Surgery for Obstructive Sleep Apnea",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
            },
            OHSDiagnosis: {
                label: "Have you also been diagnosed with Obesity Hypoventilation Syndrome (OHS)?",
                initial: false,
                inputType: 'checkbox',
                clinician: false,
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
    },
    isSmoker: {
        label: "Current Cigarette Smoking",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
    },
    primarySleepDisorderSUBHEADER: {
        label: "Primary Sleep Disorder:", // TODO: (select all that apply) OR (select at most 1 of the following)?
        clinician: true,
        initial: true,
        children: {
            hasOSA: {
                label: "OSA",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: primarySleepDisorderChildren,
            },
            hasOSAOHS: {
                label: "OSA/OHS",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: primarySleepDisorderChildren,
            },
            hasHypoventilation: {
                label: "Hypoventilation (not OHS)",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: primarySleepDisorderChildren,
            },
            hasCentralSleepApnea: {
                label: "Central Sleep Apnea",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
                children: primarySleepDisorderChildren,
            },
            hasInsomnia: {
                label: "Insomnia",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasNarcolepsy: {
                label: "Narcolepsy",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasIdiopathicHypersomnia: {
                label: "Idiopathic Hypersomnia",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasRBD: {
                label: "RBD",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasNREM: {
                label: "NREM Parasomnia",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
            hasRestlessLeg: {
                label: "Restless Legs Syndrome",
                initial: false,
                inputType: 'checkbox',
                clinician: true,
            },
        },
    },
    BMI: {
        label: "Body mass Index (kg/m\u00b2)",
        initial: null,
        inputType: 'number',
        clinician: true,
    },
    comorbidHypertension: {
        label: "Comorbid Hypertension",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    comorbidOLD: {
        label: "Comorbid Obstructive Lung Disease (e.g. Asthma, COPD)",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    comorbidAtrialFibrilation: {
        label: "Comorbid Atrial Fibrillation",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    comorbidCongestiveHeartFailure: {
        label: "Comorbid Congestive Heart Failure",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
    comorbidDepressionAnxiety: {
        label: "Comorbid Depression/Anxiety",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
    },
};

export const Conditions = {
    Asthma: asthma,
    "Chronic Obstructive Pulmonary Disease (COPD)": copd,
    "Interstitial Lung Disease (ILD)": ild,
    "Chronic Cough": chronicCough,
    "Pulmonary Hypertension": pulmonaryHypertension,
    "Sleep Disorders": sleepDisorders,
    "Healthy Volunteer": healthy,
};
