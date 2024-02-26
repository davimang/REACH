export const Conditions = {
    Asthma: {
        numFlares: {
            label: "Number of Flares",
            initial: 0,
            inputType: 'number',
            clinician: false,
            i: "a flare is defined by use of prednisone for asthma",
        },
        usesInhaler: {
            label: "Uses Inhaler",
            initial: false,
            inputType: 'checkbox',
            clinician: false,
            i: "i.e. not \"only as-needed\" inhaler",
        },
        usesInjection: {
            label: "Uses Injection",
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
        },
        packYears: {
            label: "Pack-Years",
            initial: 0,
            inputType: 'number',
            clinician: false,
            i: "number of years you smoked for multiplied by number of cigarettes smoked per day",
        },
        asthmaSeverity: {
            label: "Asthma Severity",
            initial: '',
            inputType: 'dropdown',
            dropdownOptions: ["Mild", "Moderate", "Severe"],
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
        },
        isEosinophilic: {
            label: "Eosinophilic",
            initial: false,
            inputType: 'checkbox',
            clinician: true,
            i: null,
        }
    }
};