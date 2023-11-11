import React from 'react';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

const StyledTextField = styled.div`
    padding: 10px 0px;
`;

const PatientForm = () => {

    const filters = {};
    const textFieldLabels = ["Condition", "Age", "Address"];

    const generateTextField = (label: string) => (
        <StyledTextField key={label}>
            <TextField
                id={`${label}-text-field`}
                label={label}
                size='small'
                onChange={(event) => {
                    filters[label.toLowerCase()] = event.target.value; 
                }}
            />
        </StyledTextField>
    )
    
    return (
        <>
            {textFieldLabels.map((label) => generateTextField(label))}
            <Button
                size='small'
                variant='contained'
                onClick={() => {
                    // fetch trials api call here
                    console.log(filters);
                }}
            >
                Submit
            </Button>
        </>
    );
}

export default PatientForm;
