import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { PatientInfo, SavedTrial } from '../components/types';
import SavedTrialCard from '../components/SavedTrialCard';
import { DropDownInput } from '../components/FormStyles';
import Map from '../components/Map';
import TrialModal from '../components/TrialModal';

const TrialsListContainer = styled.div`
    width: 42%;
    padding: 10px;
    height: 450px;
    overflow-y: auto;
`;

const MapContainer = styled.div`
    padding: 10px;
    width: 58%;
    height: 95%;
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


const EmptyResponse = styled.div`
    position: fixed;
    left: 45%;
    top: 50%;
    width: 100%;
    height: 100%;
    z-index: 9999;
    font-size: 30px;
    color: white;
`

const SaveTrialsPage = () => {

    const userId = localStorage.getItem('userId');
    const [trials, setTrials] = useState<SavedTrial[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [profiles, setProfiles] = useState<PatientInfo[]>([]);
    const [currentLocation, setCurrentLocation] = useState({});
    const [open, setOpen] = useState(false)
    const [modalDetails, setModalDetails] = useState({
        title: "",
        description: "",
        contactEmail: "",
        principalInvestigator: "",
        address: "",
        url: ""
    })
    const [name, setName] = useState('');

    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

    const handleModal = () => {
        setOpen(!open);
    }

    const handleDelete = (trial) => {
        const trialId = trial.id;
        try {
            const endpoint = `/trials/${trialId}/`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
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
        if (!selectedProfileId || selectedProfileId == "all") {
            try {
                const endpoint = `/trials/?user=${userId}`;
                const requestOptions = {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                };
                fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setTrials(response) });
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }
        else {
            try {
                const endpoint = `/trials/?profile=${selectedProfileId}`;
                const requestOptions = {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                };
                fetch(`${API_URL}${endpoint}`, requestOptions).then(response => response.json()).then(response => { setTrials(response) });
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
            const requestOptions = {
                headers: { 'Authorization': `Bearer ${authToken}` }
            };
            const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Failed to fetch profiles. Status: ${response.status}`);
            }
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
        }
    };

    const getProfile = (profileId?) => {
        if (!profiles || !profileId)
            return null;

        for (const profile of Object.values(profiles)) {
            if (profile.id == profileId) {
                console.log(profile);
                return profile;
            }
        }
    }

    const getName = async () => {
        try {
            const endpoint = `/userdata/${userId}/`;
            const requestOptions = {
                headers: { 'Authorization': `Bearer ${authToken}` }
            };

            const response = await fetch(`${API_URL}${endpoint}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Failed to fetch user. Status: ${response.status}`);
            }

            const data = await response.json();
            setName(data["first_name"] + " " + data["last_name"]);
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }
    }

    const updateDefaultLocation = () => {
        console.log(trials);
        if (trials) {
            const defaultTrial = trials[0];
            console.log(defaultTrial);
            if (defaultTrial) {
                setCurrentLocation({ latitude: defaultTrial.location["latitude"], longitude: defaultTrial.location["longitude"] });
            }
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    useEffect(() => {
        fetchSavedTrials();
        fetchProfilesList();
        getName();
    }, []);

    useEffect(() => {
        updateDefaultLocation();
    }, [trials])

    useEffect(() => {
        fetchSavedTrials();
        updateDefaultLocation();
    }, [selectedProfileId])

    const displayTrials = () => {
        return (
            loading ? <div>Loading... </div> : trials &&
                Object.values(trials).map((trial) => (
                    <SavedTrialCard
                        trial={trial}
                        handleDelete={handleDelete}
                        setCurrentLocation={setCurrentLocation}
                        setModalDetails={setModalDetails}
                        handleModal={handleModal}
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

            {(trials.length == 0) ? <EmptyResponse>No Trials Found!</EmptyResponse> : <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>
                <MapContainer>
                    {(trials && !loading) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]} />}
                </MapContainer>
            </div>}

            <TrialModal open={open} handleModal={handleModal} modalDetails={modalDetails} patientDetails={getProfile(selectedProfileId)} name={name} />
        </>
    );
}

export default SaveTrialsPage;
