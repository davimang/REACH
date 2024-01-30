import React from 'react';
import styled from '@emotion/styled';

const Header = styled.div`
    padding: 25px;
    background-color: #1D366F;
    height: 100px;
    min-width: fit-content;
`;

const HeaderComponents = styled.div`
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const StyledButton = styled.button`
    height: 65px;
    width: inherit;
    border-radius: inherit;
    background-color: #039D5F;
    border: inherit;
    color: #FFFFFF;
    font-size: 22px;
    font-family: math;
    cursor: pointer;
    padding: 0 15px;
`;

const MenuButtons = styled.div`
    display: inline-flex;
`;

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
        <>
            <Header>
                <HeaderComponents>
                    <img src={require("../images/Logo.svg")} height={100} style={{paddingRight: 20}}/>
                    <MenuButtons>
                        <div style={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}><StyledButton>FAQs</StyledButton></div>
                        <div style={{paddingLeft: 2, paddingRight: 2, backgroundColor: '#FFFFFF'}}><StyledButton>Contact Us</StyledButton></div>
                        <div style={{borderTopRightRadius: 10, borderBottomRightRadius: 10}}><StyledButton>About Us</StyledButton></div>
                    </MenuButtons>
                    <div style={{borderRadius: 10, width: 125, paddingLeft: 20}}><StyledButton>Sign In</StyledButton></div>
                </HeaderComponents>
            </Header>
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
        </>
    );
}

export default LandingPage;
