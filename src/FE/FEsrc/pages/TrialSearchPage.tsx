import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '..';
import { SuccessMessage } from '../components/FormStyles';
import { PatientInfoList, TrialInfoList } from '../components/types';
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

const DistanceDropDown = styled(StyledDropDown)`
    width: 200px;
`;

const SizedButton = styled(StyledButton)`
    height: 55px;
    margin: 10px;
    padding: 5px 15px;
`;

const TrialsListContainer = styled.div`
    padding: 10px;
    height: calc(95vh - 235px);
    overflow-y: auto;
    max-width: 750px;
    @media (max-width: 1024px) {
        max-height: 40vh;
    }
`;

const MapContainer = styled.div`
    padding: 10px;
    width: 750px;
`;

const Loading = styled.div`
    position: fixed;
    left: 45%;
    top: 50%;
    width: 100%;
    height: 100%;
    z-index: 9999;    
`;

const ResultContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0;
    height: 100%;
    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const trialBatchFetchSize = 30;
const trialBatchDisplaySize = 5;

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
    const [maxDistance, setMaxDistance] = useState('');
    const [profileError, setProfileError] = useState(false);
    const [currentTrialCount, setCurrentTrialCount] = useState(0);
    const [currentTrialPointer, setCurrentTrialPointer] = useState(0);
    const [pageToken, setPageToken] = useState('');
    const [isSelected, setIsSelected] = useState({});
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
                if (trial.OverallOfficialName) {
                    Object.assign(body, { principal_investigator: trial.OverallOfficialName });
                }
                else if (trial.LocationContactName) {
                    Object.assign(body, { principal_investigator: trial.LocationContactName });
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

    const fetchTrials = async (onNextPage = true) => {

        if (!selectedProfileId) {
            setProfileError(true);
            return;
        }

        if (onNextPage) {
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
                if (!formattedData) {
                    setHasNextPage(false);
                }
                else {
                    var newTrials = { ...responseTrials };
                    for (const key in formattedData) {
                        console.log(typeof (key));
                        newTrials[Number(key) + currentTrialCount] = formattedData[key];
                    }
                    setResponseTrials(newTrials);
                }

            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }
        else {
            try {
                console.log("FETCHING THIS WAY")
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
                const trials = JSON.parse(data);
                setResponseTrials(trials);
                setCurrentTrialCount(Object.keys(trials).length);
            } catch (error) {
                console.error('Error fetching trials:', error.message);
            } finally {
                setLoading(false);
            }
        }

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

    const updateDefaultTrial = () => {
        if (responseTrials) {
            const defaultTrial = responseTrials[0];
            setCurrentLocation({ latitude: defaultTrial.LocationLatitude, longitude: defaultTrial.LocationLongitude });
            setIsSelected({ [defaultTrial.NCTId]: true });
        }
    }

    const nextPage = (e) => {
        if (responseTrials && currentTrialCount <= currentTrialPointer) {
            const numTrials = Object.keys(responseTrials).length;
            const nextPage = responseTrials[numTrials - 1].nextPage;
            setPageToken(nextPage);
        }
        else {
            updatePageDetails();
        }
    }

    const resetPageToken = () => {
        setPageToken('');
    }

    const updatePageDetails = () => {
        const currNumTrials = responseTrials ? Object.keys(responseTrials).length : 0;
        setCurrentTrialCount(currNumTrials);
        const currTrialPointer = responseTrials ? currentTrialPointer + Math.min(trialBatchDisplaySize, currNumTrials - currentTrialPointer) : 0;
        setCurrentTrialPointer(currTrialPointer);
    }

    const resetPageDetails = () => {
        setCurrentTrialCount(0);
        setCurrentTrialPointer(0);
    }

    const updateHasNextPage = () => {
        if (responseTrials) {
            const numTrials = Object.keys(responseTrials).length;
            if (responseTrials[numTrials - 1].nextPage) {
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
            Object.values(responseTrials).filter((_, index) => index < currentTrialPointer).map((trial, index) => (
                <TrialCard
                    trial={trial}
                    trialSaved={trialSaved}
                    handleSave={handleSave}
                    setCurrentLocation={setCurrentLocation}
                    handleModal={handleModal}
                    setModalDetails={setModalDetails}
                    trialNumber={index + 1}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
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
        if (pageToken) {
            fetchTrials();
        }
    }, [pageToken]);

    useDidMountEffect(() => {
        updatePageDetails();
        if (responseTrials && Object.keys(responseTrials).length <= trialBatchFetchSize) {
            updateDefaultTrial();
        }
        updateHasNextPage();
    }, [responseTrials]);

    const navigateToBookmarks = () => {
        navigate('/savedTrials');
    };

    return (
        <PageContainer>
            <TrialSearchHeader>
                <StyledDropDown
                    value={selectedProfileId}
                    onChange={(e) => {
                        setSelectedProfileId(e.target.value);
                        setResponseTrials(null);
                        resetPageToken();
                        resetPageDetails();
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
                <DistanceDropDown
                    value={maxDistance}
                    onChange={(e) => {
                        setMaxDistance(e.target.value);
                        setResponseTrials(null);
                        resetPageToken();
                        resetPageDetails();
                    }
                    }
                >
                    <option value=''>-- Distance Limit --</option>
                    <option value={250}>250Km</option>
                    <option value={500}>500Km</option>
                    <option value={1000}>1000Km</option>
                    <option value={2500}>2500Km</option>
                    <option value={5000}>5000Km</option>
                    <option value={10000}>10000Km</option>
                </DistanceDropDown>

                <SizedButton onClick={() => {
                    setResponseTrials(null);
                    resetPageToken();
                    resetPageDetails();
                    fetchTrials(false);
                }}>Search</SizedButton>
                <SizedButton type='button' onClick={navigateToBookmarks}>View Bookmarks</SizedButton>
            </TrialSearchHeader>

            {loading && !responseTrials ? <Loading> <CircularProgress size="5rem" color="success" /> </Loading> : <ResultContainer>
                <TrialsListContainer>
                    {displayTrials()}
                    {responseTrials && !loading && (hasNextPage || currentTrialPointer < currentTrialCount) && <StyledButton onClick={e => { nextPage(e); }}>More Trials</StyledButton>}
                    {responseTrials && !loading && !(hasNextPage || currentTrialPointer < currentTrialCount) && <StyledButton style={{ backgroundColor: '#A5A5A5', cursor: 'default' }} disabled>Sorry, No More Trials!</StyledButton>}
                    {responseTrials && loading && <CircularProgress size="1rem" color="success" />}
                </TrialsListContainer>
                <MapContainer>
                    {(responseTrials) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]} />}
                </MapContainer>
            </ResultContainer>}

            <TrialModal open={open} handleModal={handleModal} modalDetails={modalDetails} patientDetails={getProfile(selectedProfileId)} name={name} />

        </PageContainer>
    );
}

export default TrialSearchPage;
