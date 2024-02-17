import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../components/ButtonStyle';

const LandingPageContainer = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const LandingPageText = styled.div`
    padding: 25px;
    width: 45vw;
    color: #FFFFFF;
    font-size: 20px;
    font-family: math;
`;

const PortalButtonsContainer = styled.div`
    padding: 25px;
    margin: auto;
    display: grid;
`;

const PortalButtons = styled(StyledButton)`
    width: 200px;
    height: 60px;
    margin-bottom: 15px;
`;

const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToSearch = () => {
        navigate('/search');
    };

    return (
        <LandingPageContainer>
            <LandingPageText>
                <p>Looking for opportunities to participate in a clinical trial or research study? REACH can match
                    you to relevant clinical trials based on some basic information about you.</p>
                <p>REACH can be used by both patients and clinicians.</p>
                <p>Note: Currently many values are placeholders. As this is a low-fidelity prototype we are mainly
                    mocking the UI as well as the primary functionality of the application.</p>
                <p>If you are new to REACH, click on one of the buttons to get started.</p>
            </LandingPageText>
            <PortalButtonsContainer>
                <PortalButtons type='button' onClick={navigateToSearch}>Patient Portal</PortalButtons>
                <PortalButtons style={{ visibility: 'hidden' }}>Clinician Portal</PortalButtons>
            </PortalButtonsContainer>
        </LandingPageContainer >
    );
}

export default LandingPage;
