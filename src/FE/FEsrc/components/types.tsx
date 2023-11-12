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
