import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '..';
import { PatientInfoList, TrialInfoList } from '../components/types';
import { StyledButton } from '../components/ButtonStyle';
import { DropDownInput } from '../components/FormStyles';
import TrialCard from '../components/TrialCard';
import useDidMountEffect from '../components/useDidMountEffect';
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
    display: flex;
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
    const [hasNextPage, setHasNextPage] = useState(true);
    const [currentLocation, setCurrentLocation] = useState({});
    const [trialSaved, setTrialSaved] = useState({});
    const [savedTrialIds, setSavedTrialIds] = useState({});
    const [open, setOpen] = useState(false);
    const[pageTokens, setPageTokens] = useState([""]);
    const [pageTokenPointer, setPageTokenPointer] = useState(0);
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
        const isSaved = trial.saved
        trial.saved = !trial.saved;
        setTrialSaved({ ...trialSaved, [trial.NCTId]: trial.saved });
        const endpoint = `/trials/`;
        if (!isSaved) {
            try {
                const body = {
                    title: trial.BriefTitle,
                    description: trial.DetailedDescription ? trial.DetailedDescription: "N/A",
                    url: trial.url,
                    location: {
                        latitude: trial.Distance[1],
                        longitude: trial.Distance[2]
                    },
                    status: "Recruiting",
                    distance: trial.Distance[0],
                    nctid: trial.NCTId,
                    user: userId,
                    profile: selectedProfileId
                }
                if(trial.PointOfContactEMail){
                    Object.assign(body, {contact_email: trial.PointOfContactEMail});
                }
                else if(trial.CentralContactEMail){
                    Object.assign(body, {contact_email: trial.CentralContactEMail});
                }
                if(trial.ResponsiblePartyInvestigatorFullName){
                    Object.assign(body, {principal_investigator: trial.ResponsiblePartyInvestigatorFullName});
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
                
                const trialId = savedTrialIds[trial.NCTId] ? savedTrialIds[trial.NCTId] : trial.savedId;

                await fetch(`${API_URL}${endpoint}${trialId}/`, requestOptions).then(response => console.log(response));
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

    const fetchTrials = async () => {
        try {
            setLoading(true);
            const endpoint = `/search_trials/?info_id=${selectedProfileId}&user_id=${userId}&next_page=${pageTokens[pageTokenPointer]}`;
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

    const updateDefaultLocation = () => {
        if(responseTrials){
            const defaultTrial = responseTrials[0];
            setCurrentLocation({latitude: defaultTrial.Distance[1], longitude: defaultTrial.Distance[2]});
        }
    }

    const nextPage = (e) => {
        e.preventDefault();
        if(responseTrials){

            if(pageTokenPointer == pageTokens.length - 1) {
                const nextPage = responseTrials[0].nextPage;
                setPageTokens([...pageTokens, nextPage]);
                setPageTokenPointer(pageTokenPointer + 1);
            }
            else{
                setPageTokenPointer(pageTokenPointer+1);
            }
            
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
        if(responseTrials){
            if(responseTrials[0].nextPage){
                setHasNextPage(true);
            }
            else{
                setHasNextPage(false);
            }
        }
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
        updateDefaultLocation();
        updateHasNextPage();
    }, [responseTrials]);

    useDidMountEffect(() => {
        fetchTrials();
    }, [pageTokenPointer]);  

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


                <SizedButton onClick={() => {
                    resetPageTokens();
                    fetchTrials();
                }}>Search</SizedButton>
                <SizedButton type='button' onClick={navigateToBookmarks}>View Bookmarks</SizedButton>      
            </TrialSearchHeader>

            <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                    {responseTrials && !loading && pageTokenPointer > 0 && <StyledButton onClick={e => {prevPage(e);}}>Previous Page</StyledButton>}
                    {responseTrials && !loading && hasNextPage && <StyledButton style={{float: 'right'}} onClick={e => {nextPage(e);}}>Next Page</StyledButton>}
                </TrialsListContainer>
                <MapContainer>
                    {(responseTrials && !loading) && <Map latitude={currentLocation["latitude"]} longitude={currentLocation["longitude"]}/>}
                </MapContainer>
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

export default TrialSearchPage;
