import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '..';
import { PatientInfoList, TrialInfoList, TrialInfo } from '../components/types';
import { StyledButton } from '../components/ButtonStyle';
import { DropDownInput } from '../components/FormStyles';
import TrialCard from '../components/TrialCard';
import useDidMountEffect from '../components/useDidMountEffect';
import Map from '../components/Map';
import TrialModal from '../components/TrialModal';
import CircularProgress from '@mui/material/CircularProgress';
import { ErrorMessage } from '../components/FormStyles';

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

const Loading = styled.div`
    position: fixed;
    left: 45%;
    top: 50%;
    width: 100%;
    height: 100%;
    z-index: 9999;    
`;

const trialBatchFetchSize = 5;
const trialBatchDisplaySize = 3;

const TrialSearchPage = () => {    
    const navigate = useNavigate();
    const [responseProfiles, setResponseProfiles] = useState<PatientInfoList | null>(null);
    const [responseTrials, setResponseTrials] = useState<TrialInfoList | null>(null);
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [currentLocation, setCurrentLocation] = useState({});
    const [trialSaved, setTrialSaved] = useState({});
    const [savedTrialIds, setSavedTrialIds] = useState({});
    const [pageTokens, setPageTokens] = useState([""]);
    const [pageTokenPointer, setPageTokenPointer] = useState(0);
    const [maxDistance, setMaxDistance] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [currentTrialCount, setCurrentTrialCount] = useState(0);
    const [currentTrialPointer, setCurrentTrialPointer] = useState(trialBatchDisplaySize);
    const [pageToken, setPageToken] = useState('');
    const [open, setOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState({
        title: "",
        description: "",
        contactEmail: "",
        principalInvestigator: "",
        address: "",
        url: ""
    })
    const [name, setName] = useState('');
    const userId = localStorage.getItem('userId');
    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

    const handleModal = () => {
        setOpen(!open);
    };

    const handleSave = async (trial) => {
        const isSaved = trial.saved
        trial.saved = !trial.saved;
        setTrialSaved({ ...trialSaved, [trial.NCTId]: trial.saved });
        const endpoint = `/trials/`;
        if (!isSaved) {
            try {
                const body = {
                    title: trial.BriefTitle,
                    description: trial.DetailedDescription ? trial.DetailedDescription : "N/A",
                    url: trial.url,
                    location: {
                        latitude: trial.LocationLatitude,
                        longitude: trial.LocationLongitude
                    },
                    status: "Recruiting",
                    distance: trial.Distance,
                    nctid: trial.NCTId,
                    user: userId,
                    profile: selectedProfileId
                }
                if (trial.PointOfContactEMail) {
                    Object.assign(body, { contact_email: trial.PointOfContactEMail });
                }
                else if (trial.CentralContactEMail) {
                    Object.assign(body, { contact_email: trial.CentralContactEMail });
                }
                if (trial.ResponsiblePartyInvestigatorFullName) {
                    Object.assign(body, { principal_investigator: trial.ResponsiblePartyInvestigatorFullName });
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
                    body: JSON.stringify(body)
                };
                const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Failed to save trial. Status: ${response.status}`);
                }
                const data = await response.json();
                const trialId = data["id"];
                setSavedTrialIds({ ...savedTrialIds, [trial.NCTId]: trialId });
            } catch (error) {
                console.error('Error saving trial:', error.message);
            }
        }
        else {
            try {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${authToken}` }
                };

                const trialId = savedTrialIds[trial.NCTId] ? savedTrialIds[trial.NCTId] : trial.savedId;

                await fetch(`${API_URL}${endpoint}${trialId}/`, requestOptions).then(response => console.log(response));
            }
            catch (error) {
                console.error('Error deleting trial:', error.message);
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
            await setResponseProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
        }
    };

    const fetchTrials = async () => {
        
        if (!selectedProfileId) {
            setProfileError(true);
            return;
        }

        if(responseTrials){
            try {
                setLoading(true);
                const endpoint = `/search_trials/?info_id=${selectedProfileId}&user_id=${userId}&next_page=${pageToken}&max_distance=${maxDistance}`;
                const requestOptions = {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                };
                const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Failed to fetch trials. Status: ${response.status}`);
                }
                const data = await response.json();
                const formattedData = JSON.parse(data);
                var newTrials = {...responseTrials};
                for (const key in formattedData){
                    console.log(typeof(key));
                    newTrials[Number(key) + currentTrialCount] = formattedData[key];
                }
                setResponseTrials(newTrials);
                setCurrentTrialCount(currentTrialCount + 5);
                console.log(responseTrials);
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }
        else{
            try {
                setLoading(true);
                const endpoint = `/search_trials/?info_id=${selectedProfileId}&user_id=${userId}&max_distance=${maxDistance}`;
                const requestOptions = {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                };
                const response = await fetch(`${API_URL}${endpoint}`, requestOptions);
                if (!response.ok) {
                    throw new Error(`Failed to fetch trials. Status: ${response.status}`);
                }
                const data = await response.json();
                setResponseTrials(JSON.parse(data));
                setCurrentTrialCount(5);
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }


        console.log(responseTrials ? responseTrials.length: 0);
        
    };

    const getProfile = (profileId?) => {
        if (!responseProfiles || !profileId)
            return null;

        for (const profile of Object.values(responseProfiles)) {
            if (profile.id == profileId) {
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
        if (responseTrials) {
            const defaultTrial = responseTrials[0];
            setCurrentLocation({ latitude: defaultTrial.LocationLatitude, longitude: defaultTrial.LocationLongitude });
        }
    }

    const nextPage = (e) => {
        e.preventDefault();
        console.log(currentTrialCount);
        console.log(responseTrials);
        if (responseTrials) {
            if(currentTrialCount <= currentTrialPointer){
                const nextPage = responseTrials[currentTrialCount-1].nextPage;
                setPageToken(nextPage);
            }
            // actual
            setCurrentTrialPointer(currentTrialPointer + trialBatchDisplaySize);
        }
    }

    const prevPage = (e) => {
        e.preventDefault();
        setPageTokenPointer(pageTokenPointer - 1);
    }

    const resetPageTokens = () => {
        setPageTokenPointer(0);
        setPageTokens([""]);
    }

    const updateHasNextPage = () => {
        if (responseTrials) {
            if (responseTrials[0].nextPage) {
                setHasNextPage(true);
            }
            else {
                setHasNextPage(false);
            }
        }
    }

    const displayTrials = () => {
        return (
            responseTrials &&
            Object.values(responseTrials).filter((_, index) => index < currentTrialPointer).map((trial) => (
                <TrialCard
                    trial={trial}
                    trialSaved={trialSaved}
                    handleSave={handleSave}
                    setCurrentLocation={setCurrentLocation}
                    handleModal={handleModal}
                    setModalDetails={setModalDetails}
                />
            ))



        );
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    useEffect(() => {
        fetchProfilesList();
        getName();
    }, []);

    useEffect(() => {
        updateDefaultLocation();
        updateHasNextPage();
    }, [responseTrials]);

    useDidMountEffect(() => {
        fetchTrials();
    }, [pageToken]);

    const navigateToBookmarks = () => {
        navigate('/savedTrials');
    };

    return (
        <>
            <TrialSearchHeader>
                <StyledDropDown
                    value={selectedProfileId}
                    onChange={(e) => {
                        setSelectedProfileId(e.target.value);
                        setResponseTrials(null);
                        resetPageTokens();
                        setProfileError(false);
                    }
                    }
                >
                    <option value='' disabled>-- Select Patient Profile --</option>
                    {
                        responseProfiles &&
                        Object.values(responseProfiles).map((profile) => (
                            <option key={profile.id} value={profile.id}>{profile.title}</option>
                        ))
                    }
                </StyledDropDown>
                {profileError && <ErrorMessage>Please select a profile.</ErrorMessage>}
                <StyledDropDown
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(e.target.value)}
                >
                    <option value=''>-- Distance Limit --</option>
                    <option value={250}>250km</option>
                    <option value={500}>500Km</option>
                    <option value={1000}>1000Km</option>
                    <option value={2500}>2500Km</option>
                    <option value={5000}>5000Km</option>
                    <option value={10000}>10000Km</option>
                </StyledDropDown>

                <SizedButton onClick={() => {
                    resetPageTokens();
                    setResponseTrials(null);
                    fetchTrials();
                }}>Search</SizedButton>
                <SizedButton type='button' onClick={navigateToBookmarks}>View Bookmarks</SizedButton>
            </TrialSearchHeader>

            {loading && !responseTrials ? <Loading> <CircularProgress size="5rem" color="success" /> </Loading> : <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                    {responseTrials && !loading && hasNextPage && <StyledButton onClick={e => { nextPage(e); }}>More Trials</StyledButton>}
                    {responseTrials && loading && <CircularProgress color="success" />}
                </TrialsListContainer>
                <MapContainer>
                    {(responseTrials) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]} />}
                </MapContainer>
            </div>}

            <TrialModal open={open} handleModal={handleModal} modalDetails={modalDetails} patientDetails={getProfile(selectedProfileId)} name={name} />

        </>
    );
}

export default TrialSearchPage;
