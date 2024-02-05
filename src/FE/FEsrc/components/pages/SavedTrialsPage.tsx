import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { API_URL } from '../..';
import { SavedTrialList } from '../types';

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

const TrialLocation = styled.div`
    display: flex;
`;

const LocationText = styled.div`
    align-content: center;
    display: grid
`;

const SaveTrialsPage = () => {

    const [trials, setTrials] = useState<SavedTrialList | null>(null);
    const userId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);
    const [currentDescription, setCurrentDescription] = useState<string | null>(null);

    const fetchSavedTrials = () => {
        try {

            const endpoint = `/trials/?user=${userId}`;
            const response = fetch(`${API_URL}${endpoint}`).then(response => response.json()).then(response => { setTrials(response) });
            console.log(trials);
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
                    <TrialContainer>
                        <TrialDescription>
                            <TrialTitle
                                onClick={() => setCurrentDescription(trial.description)}
                            >
                                {trial.title}
                            </TrialTitle>
                            <p><u><a href={trial.url} target='__blank' style={{ color: 'white', fontFamily: 'math' }}>
                                Learn More About This Study...
                            </a></u></p>
                        </TrialDescription>
                        <TrialSymbols>
                            <img
                                src={require("../../images/Saved.svg")}
                                style={{ height: 45, width: 45 }}
                            />
                        </TrialSymbols>
                    </TrialContainer>
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
