import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { PatientInfo, SavedTrial, TrialInfo } from '../components/types';
import SavedTrialCard from '../components/SavedTrialCard';
import { DropDownInput } from '../components/FormStyles';
import { StyledButton } from '../components/ButtonStyle';
import Map from '../components/Map';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

const DialogContentInfo = styled.div`
    height: 25px;
    width: 100%;
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

    const handleModal = () => {
        setOpen(!open);
    }

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

    const updateDefaultLocation = () => {
        console.log(trials);
        if(trials){
            const defaultTrial = trials[0];
            console.log(defaultTrial);
            if(defaultTrial){
                setCurrentLocation({latitude: defaultTrial.location["latitude"], longitude: defaultTrial.location["longitude"]});
            }
        }
    }

    useEffect(() => {
        fetchSavedTrials();
        fetchProfilesList();
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
            
            {(trials.length == 0) ? <EmptyResponse>No Trials Found!</EmptyResponse>: <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>
                <MapContainer>
                    {(trials && !loading) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]}/>}
                </MapContainer>
            </div>}
            
              
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
                    Contact Email: {modalDetails["contactEmail"]}
                    </div>
                    <div>
                    Principal Investigator: {modalDetails["principalInvestigator"]}
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

export default SaveTrialsPage;
