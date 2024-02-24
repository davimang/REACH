import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '..';
import { PatientInfoList, TrialInfoList } from '../components/types';
import { StyledButton } from '../components/ButtonStyle';
import { DropDownInput } from '../components/FormStyles';
import TrialCard from '../components/TrialCard';
import Map from '../components/Map';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    width: 600px;
    padding: 15px;
`;

const DialogContentInfo = styled.div`
    height: 25px;
    width: 100%;
`;

const TrialSearchPage = () => {
    const navigate = useNavigate();
    const [responseProfiles, setResponseProfiles] = useState<PatientInfoList | null>(null);
    const [responseTrials, setResponseTrials] = useState<TrialInfoList | null>(null);
    const [selectedProfileId, setSelectedProfileId] = useState('');
    const [loading, setLoading] = useState(false);
    const [maxRank, setMaxRank] = useState(0);
    const [currentLocation, setCurrentLocation] = useState({});
    const [trialSaved, setTrialSaved] = useState({});
    const [savedTrialIds, setSavedTrialIds] = useState({});
    const [open, setOpen] = useState(false)
    const [modalDetails, setModalDetails] = useState({
        title: "",
        description: "",
        contactEmail: "",
        principalInvestigator: "",
        address: "",
        url: ""
    })
    const userId = localStorage.getItem('userId');

    const handleModal = () => {
        setOpen(!open);
    }

    const handleSave = async (trial) => {
        console.log(trialSaved);
        const isSaved = trialSaved[trial.NCTId]
        setTrialSaved({ ...trialSaved, [trial.NCTId]: !isSaved });
        const endpoint = `/trials/`;
        if (!isSaved) {
            try {
                const body = {
                    title: trial.BriefTitle,
                    description: trial.DetailedDescription,
                    url: trial.url,
                    location: {
                        latitude: trial.latitude,
                        longitude: trial.longitude
                    },
                    status: trial.OverallStatus,
                    distance: trial.Distance,
                    nctid: trial.NCTID,
                    user: userId
                }
                if(trial.contactEmail){
                    Object.assign(body, {contact_email: trial.contactEmail});
                }
                if(trial.principalInvestigator){
                    Object.assign(body, {principal_investigator: trial.principalInvestigator});
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
        else{
            try{
                const requestOptions = {
                    method: 'DELETE'
                };
                await fetch(`${API_URL}${endpoint}${savedTrialIds[trial.NCTId]}/`, requestOptions).then(response => console.log(response));
            }
            catch(error){
                console.error('Error deleting trial:', error.message);
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
            setResponseProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error.message);
        }
    };

    const fetchTrials = async (e) => {
        try {
            setLoading(true);
            const endpoint = `/search_trials/?info_id=${selectedProfileId}&rank=${maxRank}`;
            console.log(endpoint);
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

    const updateRank = () => {
        if (responseTrials) {
            Object.values(responseTrials).map(trial => {
                setTrialSaved({ ...trialSaved, [trial.NCTId]: false });
                if(trial.Rank > maxRank){
                    setMaxRank(trial.Rank);
                }
            })
        }
    }

    const updateDefaultLocation = () => {

    }

    const displayTrials = () => {
        return (
            loading ?
                <div>Loading... </div>
                :
                responseTrials &&
                Object.values(responseTrials).map((trial) => (
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
        fetchProfilesList();
    }, []);

    useEffect(() => {
        updateRank();
        updateDefaultLocation();
    }, [responseTrials]);

    const navigateToBookmarks = () => {
        navigate('/savedTrials');
    };

    return (
        <>
            <TrialSearchHeader>
                <StyledDropDown
                    value={selectedProfileId}
                    onChange={(e) => setSelectedProfileId(e.target.value)}
                >
                    <option value='' disabled>-- Select Patient Profile --</option>
                    {
                        responseProfiles &&
                        Object.values(responseProfiles).map((profile) => (
                            <option key={profile.id} value={profile.id}>{profile.title}</option>
                        ))
                    }
                </StyledDropDown>

                <SizedButton onClick={(e) => {
                    fetchTrials(e);
                }}>Search</SizedButton>
                <SizedButton type='button' onClick={navigateToBookmarks}>View Bookmarks</SizedButton>
            </TrialSearchHeader>

            <div style={{ display: 'flex' }}>
                <TrialsListContainer style={{overflow: 'auto'}}>
                    {displayTrials()}
                </TrialsListContainer>
                {(responseTrials && !loading) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]}/>}
            </div>
      
            <Dialog
                open={open}
                onClose={handleModal}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                scroll="paper"
            >
                    <DialogTitle id="scroll-dialog-title">{modalDetails["title"]}</DialogTitle>
                    <DialogContent >
                    <Box border={1} padding={2}>
                    <DialogContentInfo>
                    <div>
                    Contact Email: David@email.com
                    </div>
                    <div>
                    Principal Investigator: David
                    </div>
                    </DialogContentInfo>
                    </Box>
                    <Box border={1} padding={2}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >{modalDetails["description"]}
                    </DialogContentText >
                    </Box>
                    
                    </DialogContent>
                    <DialogActions>
                        <StyledButton onClick={handleModal}>Close</StyledButton>
                        <a href={modalDetails["url"]} target="_blank">
                            <StyledButton>View Study</StyledButton>
                        </a>
                    </DialogActions>
             
            </Dialog>
        
        </>
    );
}

export default TrialSearchPage;
