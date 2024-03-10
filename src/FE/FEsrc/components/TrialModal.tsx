import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { StyledButton } from './ButtonStyle';

const DialogContentInfo = styled.div`
    height: 25px;
    width: 100%;
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
}

const TrialModal: React.FC<TrialModalProps> = ({ open, handleModal, modalDetails }) => {

    return (
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
    )
}

export default TrialModal;