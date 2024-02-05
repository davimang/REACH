export interface ClinicalTrial {
    Rank: number;
    Condition: string;
    BriefTitle: string;
    DetailedDescription: string;
    MinimumAge: number;
    MaximumAge: number;
    LocationCountry: string;
    LocationState: string;
    LocationCity: string;
    LocationZip: string;
    LocationFacility: string;
    FullAddress: string;
    Distance: number;
}

export interface ClinicalTrialsData {
    [key: string]: ClinicalTrial;
}

export interface Address {
    street: string;
    city: string;
    postalCode: string;
    province: string;
}

export interface PatientInfo {
    id: number;
    date_of_birth: string;
    address: Address;
    gender: string;
    advanced_info: number; // TODO: will be dict of advanced info - must update this type later
    title: string;
    condition: string;
    user: number;
}

export interface PatientInfoList {
    [key: string]: PatientInfo;
}

export interface TrialInfo {
    NCTId: string;
    BriefTitle: string;
    DetailedDescription: string;
    OverallStatus: string;
    Distance: number;
    KeywordRank: number;
    url: string;
}

export interface TrialInfoList {
    [key: string]: TrialInfo;
}

export interface SavedTrial {
    title: string;
    description: string;
    url: string;
    id: string
}


export interface SavedTrialList {
    [key: string]: SavedTrial;
}
  