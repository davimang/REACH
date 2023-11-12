import React from 'react';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { json } from 'express';

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

    const handleSubmit = async () => {
        try {
            const address = filters['address'].replace(/\s/g, '+');
            const age = filters['age'];
            const condition = filters['condition'].replace(/\s/g, '+');
            const endpoint = `/trials/?address=${address}&age=${age}&condition=${condition}`;
            
            const response = await fetch(`http://127.0.0.1:8000${endpoint}`)

          console.log(JSON.stringify(response.json));
    
          if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('API Response:', data);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
    
    return (
        <>
            {textFieldLabels.map((label) => generateTextField(label))}
            <Button
                size='small'
                variant='contained'
                onClick={
                    handleSubmit
                }
            >
                Submit
            </Button>
        </>
    );
}

export default PatientForm;
