import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { API_URL } from '..';
import { SavedTrial } from '../components/types';
import SavedTrialCard from '../components/SavedTrialCard';

const TrialsListContainer = styled.div`
    width: 600px;
    padding: 15px;
`;

const TrialContainer = styled.div`
    width: 570px;
    background-color: #38569A;
    border-radius: 20px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const TrialTitle = styled.b`
    color: white;
    font-size: 20px;
    font-family: math;
    max-width: 450px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    cursor: pointer;
`;

const TrialDescription = styled.div`
    width: 450px;
`;

const TrialSymbols = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
`;

const StyledImage = styled.img`
    cursor: pointer;
`;

const SaveTrialsPage = () => {

    const [trials, setTrials] = useState<SavedTrial[]>([]);
    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<string | null>(null);

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
        try {
            const endpoint = `/trials/?user=${userId}`;
            fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setTrials(response) });
        } catch (error) {
            console.error('Error fetching trials:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSavedTrials()
    }, []);

    const displayTrials = () => {
        return (
            loading ? <div>Loading... </div> : trials &&
                Object.values(trials).map((trial) => (
                    <SavedTrialCard
                        trial={trial}
                        setCurrentDescription={setCurrentDescription}
                        handleDelete={handleDelete}
                    />
                ))
                
        )
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <TrialsListContainer>
                    {displayTrials()}
                </TrialsListContainer>

                {currentDescription && <div style={{ padding: 15, color: 'white', fontFamily: 'math' }}>{currentDescription}</div>}
            </div>
        </>
    );
}

export default SaveTrialsPage;
