import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { StyledButton } from './ButtonStyle';
import { API_URL } from '..';
import { PatientInfo } from './types';

interface ModalProps {
    isOpen: boolean;
    handleModal: () => void;
    profile: PatientInfo;
    profileList: PatientInfo[];
    setProfileList: (profileLife: Object) => void;
}

const DeleteProfileModal: React.FC<ModalProps> = ({ isOpen, handleModal, profile, profileList, setProfileList }) => {

    const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

    const handleDelete = () => {
        const profileId = profile.id;
        try {
            const endpoint = `/patientinfo/${profileId}/`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${authToken}` }
            };
            fetch(`${API_URL}${endpoint}`, requestOptions).then(response => {
                console.log(response);
                handleModal();
            });
        } catch (error) {
            console.error('Error deleting profile:', error.message);
        }
        if (profileList) {
            const newProfiles = Object.values(profileList).filter((profile) => profile.id !== profileId);
            setProfileList(newProfiles);
        }
    }

    useEffect(() => {
        setAuthToken(localStorage.getItem('accessToken'));
    }, [localStorage.getItem('accessToken')]);

    return (
        <Dialog
            open={isOpen}
            onClose={handleModal}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            scroll="paper"
        >
            <DialogTitle id="scroll-dialog-title">Delete Profile</DialogTitle>
            <DialogContent >
                {`Are you sure you would like to delete the following profile: "${profile.title}"?`}
            </DialogContent>
            <DialogActions>
                <StyledButton onClick={handleModal}>Cancel</StyledButton>
                <StyledButton onClick={handleDelete}>Delete</StyledButton>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteProfileModal;