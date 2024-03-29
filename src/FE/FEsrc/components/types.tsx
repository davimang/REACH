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
    advanced_info: Object;
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
    LocationLatitude: number;
    LocationLongitude: number;
    KeywordRank: number;
    url: string;
    Rank: number;
    OverallOfficialName: string;
    LocationContactName: string;
    PointOfContactEMail: string;
    CentralContactEMail: string;
    ResponsiblePartyInvestigatorFullName: string;
    LocationFacility: string;
    LocationZip: string;
    LocationCity: string;
    LocationState: string;
    FullAddress: string;
    nextPage: string;
    saved: boolean;
    savedId: number;
}

export interface TrialInfoList {
    [key: string]: TrialInfo;
}

export interface SavedTrial {
    title: string;
    description: string;
    url: string;
    id: string;
    distance: number;
    contact_email: string;
    principal_investigator: string;
    nctid: string;
    status: string;
    location: Object;
}

export interface UserData {
    first_name: string;
    last_name: string;
    is_clinician: boolean;
    created: string;
}
