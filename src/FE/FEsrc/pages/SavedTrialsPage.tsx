import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { PatientInfo, SavedTrial } from '../components/types';
import SavedTrialCard from '../components/SavedTrialCard';
import { DropDownInput } from '../components/FormStyles';
import Map from '../components/Map';
import TrialModal from '../components/TrialModal';
import useDidMountEffect from '../components/useDidMountEffect';
import { StyledButton } from '../components/ButtonStyle';


// styling

const TrialsListContainer = styled.div`
    padding: 10px;
    height: calc(95vh - 235px);
    max-width: 750px;
    overflow-y: auto;
    overflow-x: hidden;
    @media (max-width: 1024px) {
        height: 40vh;
    }
`;

const MapContainer = styled.div`
    padding: 10px;
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
    width: 300px;
    height: 55px;
`;

const SizedButton = styled(StyledButton)`
    height: 55px;
    margin: 10px;
    padding: 5px 15px;
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
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0;
    height: 100%;
    overflow-x: hidden;
    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SaveTrialsPage = () => {

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [trials, setTrials] = useState<SavedTrial[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [profiles, setProfiles] = useState<PatientInfo[]>([]);
    const [currentLocation, setCurrentLocation] = useState({});
    const [open, setOpen] = useState(false)
    const [isSelected, setIsSelected] = useState({});
    const [updateDefault, setUpdateDefault] = useState(true);
    const [noTrialsFound, setNoTrialsFound] = useState(false);
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

    // called when a trial is unsaved
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
        if (trials) {
            if (trial.nctid in isSelected) {
                setUpdateDefault(true);
            }
            else {
                setUpdateDefault(false);
            }
            const newTrials = Object.values(trials).filter((trial) => trial.id !== trialId);
            setTrials(newTrials);
        }
    }

    const fetchSavedTrials = () => {
        setLoading(true);
        if (!selectedProfileId || selectedProfileId == "all") {
            // return trials for all profiles
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
            // return trials only for the currently selected profile
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
        setUpdateDefault(true);
    };

    // fetch the list of profiles for the current user
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

    // upon loading of a set of trials, a default must be selected,
    // to ensure map is not empty
    const updateDefaultTrial = () => {
        if (trials) {
            const defaultTrial = trials[0];
            if (defaultTrial) {
                setCurrentLocation({ address: defaultTrial.location["address"] });
                setIsSelected({ [defaultTrial.nctid]: true });
            }
        }
        setUpdateDefault(false);
    }

    const navigateToProfiles = () => {
        navigate('/listprofiles');
    };

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    useEffect(() => {
        fetchSavedTrials();
        fetchProfilesList();
        getName();
    }, []);

    useEffect(() => {
        if (updateDefault) {
            updateDefaultTrial();
        }
    }, [trials]);

    useDidMountEffect(() => {
        if (trials.length == 0) {
            setNoTrialsFound(true);
        }
        else {
            setNoTrialsFound(false);
        }
    }, [trials]);

    useEffect(() => {
        fetchSavedTrials();
    }, [selectedProfileId])

    const displayTrials = () => {
        return (
            loading ? <div>Loading... </div> : trials &&
                Object.values(trials).map((trial, index) => (
                    <SavedTrialCard
                        trial={trial}
                        handleDelete={handleDelete}
                        setCurrentLocation={setCurrentLocation}
                        setModalDetails={setModalDetails}
                        handleModal={handleModal}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        trialNumber={index + 1}
                    />
                ))

        )
    }

    return (
        <PageContainer>
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
                <SizedButton type='button' onClick={navigateToProfiles}>Profiles</SizedButton>
            </TrialSearchHeader>

            {noTrialsFound ? <EmptyResponse>No Studies Found!</EmptyResponse> : <ResultContainer>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>
                <MapContainer>
                    {(trials.length > 0 && !loading) && <Map address={currentLocation["address"]} />}
                </MapContainer>
            </ResultContainer>}

            <TrialModal open={open} handleModal={handleModal} modalDetails={modalDetails} patientDetails={getProfile(selectedProfileId)} name={name} />
        </PageContainer>
    );
}

export default SaveTrialsPage;
