import React, { useState } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { StyledButton } from './ButtonStyle';
import { PatientInfo } from './types';

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

    const emailTemplate = `Dear ${contact},

My name is ${usersName}. I found your study on ${modalDetails["url"]} for patients with ${condition} and am interested in participating.
Please let me know how I could participate in your study.

Thank you,`;

    const [showTemplate, setShowTemplate] = useState(false);

    const handleTemplate = () => {
        setShowTemplate(!showTemplate);
    }

    const copyTemplate = async () => {
        await navigator.clipboard.writeText(emailTemplate);
    }

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
                    <StyledButton onClick={handleTemplate}>Email Template</StyledButton>
                </DialogActions>

            </Dialog>
            <Dialog open={showTemplate} onClose={(handleTemplate)}>
                <DialogTitle>Email Template</DialogTitle>
                <DialogContent>
                    <Box>
                        <div>
                            <b>To:</b> {modalDetails["contactEmail"]}
                        </div>
                    </Box>
                    <Box>
                        <div>
                            <b>Subject:</b> Expressing Interest in Research Trial - {modalDetails["title"]}
                        </div>
                    </Box>
                    <Box>
                        <DialogContentText
                            id="scroll-dialog-description"
                            tabIndex={-1}
                        >
                            <EmailTemplatePre>{emailTemplate}</EmailTemplatePre>
                        </DialogContentText >
                    </Box>
                </DialogContent>
                <DialogActions>
                    <StyledButton onClick={copyTemplate}>Copy Template</StyledButton>
                    <StyledButton onClick={handleTemplate}>Close</StyledButton>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default TrialModal;