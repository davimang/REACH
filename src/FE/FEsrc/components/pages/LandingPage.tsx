import React from 'react';
import styled from '@emotion/styled';

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

const PortalButtons = styled.button`
    width: 200px;
    height: 60px;
    margin-bottom: 15px;
    background-color: #039D5F;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
`;

const LandingPage = () => {
    
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
                <PortalButtons>Patient Portal</PortalButtons>
                <PortalButtons>Clinician Portal</PortalButtons>
            </PortalButtonsContainer>
        </LandingPageContainer>
    );
}

export default LandingPage;
