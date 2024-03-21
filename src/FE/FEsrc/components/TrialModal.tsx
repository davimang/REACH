import React, { useState } from 'react';
import { SuccessMessage } from './FormStyles';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { StyledButton } from './ButtonStyle';
import { PatientInfo } from './types';
import CustomizedSnackbars from './SnackBar';

const Box = styled.div`
    border: 1px solid;
    padding: 16px;
    display: grid;
`;

const EmailTemplatePre = styled.div`
    white-space: pre-wrap;
    word-wrap: break-word;
`;

interface TrialModalProps {
    open: boolean;
    handleModal: () => void;
    modalDetails: {
        title: string;
        description: string;
        contactEmail: string;
        principalInvestigator: string;
        address: string;
        url: string;
    };
    patientDetails?: PatientInfo | null;
    name?: string;
}

const TrialModal: React.FC<TrialModalProps> = ({ open, handleModal, modalDetails, patientDetails, name }) => {

    const contact = modalDetails["principalInvestigator"] != "N/A" ? modalDetails["principalInvestigator"] : "Researcher";

    const usersName = name ? name : "NAME HERE";

    const condition = patientDetails ? patientDetails["condition"] : "DISEASE";

    const isClinician = localStorage.getItem('isClinician') == 'true';

    const patientTemplate = `Dear ${contact},%0D%0A%0D%0A

My name is ${usersName}. I found your study on ${modalDetails["url"]} for patients with ${condition} through REACH, an app that helps match patients to research studies, and I am interested in participating. Please let me know how I could participate in your study.%0D%0A%0D%0A
    
Thank you,`;

    const clinicianTemplate = `Dear ${contact},%0D%0A%0D%0A

My name is Dr. ${usersName}. I am looking for clincial studies on behalf of one of my patients through REACH, an app that helps match patients to research studies. I found your study on ${modalDetails["url"]} for patients with ${condition} and I am interested in having my patient participate. Please let me know how I could set them up to participate in your study.%0D%0A%0D%0A
    
Thank you,`;

    const emailTemplate = isClinician ? clinicianTemplate : patientTemplate;

    return (
        <div>
            
            <Dialog
                open={open}
                onClose={handleModal}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                scroll="paper"
            >
                <DialogTitle id="scroll-dialog-title">{modalDetails["title"]}</DialogTitle>
                <DialogContent >
                    <Box>
                        <div>
                            Contact Email: {modalDetails["contactEmail"]}
                        </div>
                        <div>
                            Principal Investigator: {modalDetails["principalInvestigator"]}
                        </div>
                    </Box>
                    <Box>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            {modalDetails["description"]}
                        </DialogContentText >
                    </Box>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={handleModal}>Close</StyledButton>
                    <a href={modalDetails["url"]} target="_blank">
                        <StyledButton>View Study</StyledButton>
                    </a>
                    <a href={`mailto:${modalDetails["contactEmail"]}?subject=Expressing Interest in Research Study - ${modalDetails["title"]}&body=${emailTemplate}`}>
                    <StyledButton >Email Researcher</StyledButton>
                    </a>
                </DialogActions>

            </Dialog>
        </div >
    )
}

export default TrialModal;