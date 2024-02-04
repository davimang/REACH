import React, { useState } from 'react';
import styled from '@emotion/styled';

import { API_URL } from '../..';
import { PatientInfoList, TrialInfoList } from '../types';

const TrialSearchHeader = styled.div`
    background-color: #213E80;
    min-width: 100%;
    height: 55px;
    display: inline-flex;
    align-items: center;
`;

const StyledDropDown = styled.select`
    padding: 5px;
    margin: 10px;
    color: black;
    width: 250px;
    height: 35px;
    border: none;
    border-radius: 1px;
`;

const StyledButton = styled.button`
    height: 35px;
    margin: 10px;
    padding: 5px 15px;
    background-color: #039D5F;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 18px;
    font-family: math;
`;

const TrialsListContainer = styled.div`
    width: 600px;
    padding: 15px;
`;

const TrialContainer = styled.div`
    width: 570px;
    background-color: #38569A;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const TrialTitle = styled.b`
    color: white;
    font-size: 20px;
    font-family: math;
    max-width: 450px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    cursor: pointer;
`;

const TrialDescription = styled.div`
    width: 450px;
`;

const RecruitingSpan = styled.span<{recruiting: boolean}>`
    height: 10px;
    width: 10px;
    display: inline-block;
    background-color: ${props => props.recruiting ? '#039D5F' : 'white'};
    border-radius: 50%;
    margin-right: 5px;
`;

const TrialSymbols = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

const TrialLocation = styled.div`
    display: flex;
`;

const LocationText = styled.div`
    align-content: center;
    display: grid
`;

const TrialSearchPage = () => {

    const [responseProfiles, setResponseProfiles] = useState<PatientInfoList | null>(null);
    const [responseTrials, setResponseTrials] = useState<TrialInfoList | null>(null);
    const [selectedProfileId, setSelectedProfileId] = useState("");
    const [loading, setLoading] = useState(false);
    const [maxRank, setMaxRank] = useState(0);
    const [currentDescription, setCurrentDescription] = useState<string | null>(null);
    const userId = 1;

    const fetchProfilesList = async () => {
        try {
            const endpoint = `/patientinfo/?user=${userId}`;
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
            }
            const data = await response.json();
            setResponseProfiles(JSON.parse(data));
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
        }
    };

    const fetchTrials = async () => {
        try {
            setLoading(true);
            const endpoint = `/search_trials/?info_id=${selectedProfileId}&rank=${maxRank}`;
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch trials. Status: ${response.status}`);
            }
            const data = await response.json();
            setResponseTrials(JSON.parse(data));
        } catch (error) {
            console.error('Error fetching trials:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const displayTrials = () => {
        return (
            loading ? <div>Loading... </div> : responseTrials &&
            Object.values(responseTrials).map((trial) => (
                <TrialContainer key={trial.NCTId}>
                <TrialDescription>
                    <TrialTitle
                        onClick={() => setCurrentDescription(trial.DetailedDescription)}
                    >
                        {trial.BriefTitle}
                    </TrialTitle>
                    <p><u><a href={trial.url} target='__blank' style={{color: 'white', fontFamily: 'math'}}>
                        Learn More About This Study...
                    </a></u></p>
                    <div style={{color: '#BDBDBD', display: 'flex', alignItems: 'center'}}>
                        <RecruitingSpan recruiting={trial.OverallStatus == "Recruiting"} />
                        {trial.OverallStatus}
                    </div>
                </TrialDescription>
                <TrialSymbols>
                <img 
                    src={require("../../images/Bookmark.svg")}
                    style={{height: 45, width: 45}}
                />
                    <TrialLocation>
                        <img 
                            src={require("../../images/Location.svg")}
                            style={{height: 40, width: 40}}
                        />
                        <LocationText>
                            <b style={{color: "white"}}>{trial.Distance} km</b>
                            <div style={{fontSize: 14, color: '#BDBDBD'}}>from you</div>
                        </LocationText>
                    </TrialLocation>
                </TrialSymbols>
                </TrialContainer>
            ))
        )
    }
    
    return (
        <>
            <TrialSearchHeader>
                <StyledDropDown
                    value={selectedProfileId} 
                    onChange={(e) => setSelectedProfileId(e.target.value)}
                >
                    <option value="" disabled>-- Select Patient Profile --</option>
                    {responseProfiles && Object.values(responseProfiles).map((profile) => (
                        <option key={profile.id} value={profile.id}>{profile.title}</option>
                    ))}
                </StyledDropDown>
                <StyledDropDown />
                <StyledButton onClick={fetchTrials}>Search</StyledButton>
                <StyledButton>View Bookmarks</StyledButton>
            </TrialSearchHeader>
            
            <div style={{display: 'flex'}}>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>

                {currentDescription && <div style={{padding: 15, color: 'white', fontFamily: 'math'}}>{currentDescription}</div>}
            </div>
        </>
    );
}

export default TrialSearchPage;