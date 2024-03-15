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
        label: "Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "current or ex-smoker",
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
        label: "Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "current or ex-smoker",
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
        label: "Smoker",
        initial: false,
        inputType: 'checkbox',
        clinician: false,
        i: "current or ex-smoker",
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
    pulmonaryHypertension: {
        label: "Co-Existing Pulmonary Hypertension",
        initial: false,
        inputType: 'checkbox',
        clinician: true,
        i: null, // they said they might provide a definition later
    }
};

export const Conditions = {
    Asthma: asthma,
    "Chronic Obstructive Pulmonary Disease (COPD)": copd,
    "Interstitial Lung Disease (ILD)": ild,
};
