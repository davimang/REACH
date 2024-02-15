import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, TextField, stepClasses } from '@mui/material';
import { ClinicalTrial, ClinicalTrialsData } from './types';
import { json } from 'express';
import { API_URL } from '..';

const StyledTextField = styled.div`
    padding: 10px 0px;
`;

const PatientForm = () => {

    const [formValues, setFormValues] = useState({
        condition: '',
        age: '',
        address: '',
    });
    const textFieldLabels = ["Condition", "Age", "Address"];
    const [responseData, setResponseData] = useState<ClinicalTrialsData | null>(null);
    const [loading, setLoading] = useState(false);

    const ClinicalTrialComponent: React.FC<{ trial: ClinicalTrial }> = ({ trial }) => (
        <div key={trial.Rank}>
            <hr />
            <h2>{trial.BriefTitle}</h2>
            <p>Condition: {trial.Condition}</p>
            <p>Age Range: {trial.MinimumAge} - {trial.MaximumAge}</p>
            <p>Full Address: {trial.FullAddress}</p>
        </div>
    );

    const generateTextField = (label: string) => (
        <StyledTextField key={label}>
            <TextField
                id={`${label}-text-field`}
                label={label}
                size='small'
                onChange={(event) => {
                    setFormValues((prevValues) => ({
                        ...prevValues,
                        [label.toLowerCase()]: event.target.value,
                    }));
                }}
            />
        </StyledTextField>
    )

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const { address, age, condition } = formValues;
            const endpoint = `/trials/?address=${address.replace(/\s/g, '+')}&age=${age}&condition=${condition.replace(/\s/g, '+')}`;

            const response = await fetch(`${API_URL}${endpoint}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }

            const data = await response.json();
            setResponseData(JSON.parse(data));
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {textFieldLabels.map((label) => generateTextField(label))}
            <Button
                size='small'
                variant='contained'
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Submit'}
            </Button>

            <div id='result-container'>
                {responseData && Object.values(responseData).map((trial) => (
                    <ClinicalTrialComponent key={trial.Rank} trial={trial} />
                ))}
            </div>
        </>
    );
}

export default PatientForm;
