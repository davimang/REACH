import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { PatientInfo, SavedTrial, TrialInfo } from '../components/types';
import SavedTrialCard from '../components/SavedTrialCard';
import { DropDownInput } from '../components/FormStyles';
import { StyledButton } from '../components/ButtonStyle';
import Map from '../components/Map';

const TrialsListContainer = styled.div`
    width: 600px;
    padding: 15px;
`;

const TrialSearchHeader = styled.div`
    background-color: #213E80;
    min-width: 100%;
    height: 85px;
    display: inline-flex;
    align-items: center;
`;

const StyledDropDown = styled(DropDownInput)`
    margin: 10px;
    width: 400px;
    height: 55px;
`;

const SizedButton = styled(StyledButton)`
    height: 55px;
    margin: 10px;
    padding: 5px 15px;
`;


const SaveTrialsPage = () => {

    const userId = localStorage.getItem('userId');
    const [trials, setTrials] = useState<SavedTrial[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<string | null>(null);
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [profiles, setProfiles] = useState<PatientInfo[]>([]);
    const [currentLocation, setCurrentLocation] = useState({});

    const handleDelete = (trial) => {
        const trialId = trial.id;
        try {
            const endpoint = `/trials/${trialId}/`;
            const requestOptions = {
                method: 'DELETE'
            };
            fetch(`${API_URL}${endpoint}`, requestOptions).then(response => console.log(response));
        } catch (error) {
            console.error('Error deleting trial:', error.message);
        }
        console.log(trials)
        if (trials) {
            const newTrials = Object.values(trials).filter((trial) => trial.id !== trialId);
            setTrials(newTrials);
        }
    }

    const fetchSavedTrials = () => {
        if(!selectedProfileId || selectedProfileId == "all"){
            try {
                const endpoint = `/trials/?user=${userId}`;
                fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setTrials(response) });
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }
        else{
            try {
                const endpoint = `/trials/?profile=${selectedProfileId}`;
                fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setTrials(response) });
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }

    };

    const fetchProfilesList = async () => {
        try {
            const endpoint = `/patientinfo/?user=${userId}`;
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
            }
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
        }
    };

    useEffect(() => {
        fetchSavedTrials();
        fetchProfilesList();
    }, []);

    useEffect(() => {
        fetchSavedTrials();
    }, [selectedProfileId])

    const displayTrials = () => {
        return (
            loading ? <div>Loading... </div> : trials &&
                Object.values(trials).map((trial) => (
                    <SavedTrialCard
                        trial={trial}
                        setCurrentDescription={setCurrentDescription}
                        handleDelete={handleDelete}
                        setCurrentLocation={setCurrentLocation}
                    />
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
                    <option value='' disabled>-- Filter by profile --</option>
                    <option key="all" value='all'>All Profiles</option>
                    {
                        profiles &&
                        Object.values(profiles).map((profile) => (
                            <option key={profile.id} value={profile.id}>{profile.title}</option>
                        ))
                    }
                </StyledDropDown>
            </TrialSearchHeader>
            <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>
                {(trials && !loading) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]}/>}
                {currentDescription && <div style={{ padding: 15, color: 'white', fontFamily: 'math' }}>{currentDescription}</div>}
            </div>
        </>
    );
}

export default SaveTrialsPage;
