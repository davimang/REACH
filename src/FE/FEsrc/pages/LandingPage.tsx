import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../components/ButtonStyle';
import CustomizedSnackbars from '../components/SnackBar';

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

    const [isLoginSnackBarOpen, setIsLoginSnackBarOpen] = useState(false);
    const [isProfileSnackBarOpen, setIsProfileSnackBarOpen] = useState(false);
    const [isFirstProfileSnackBarOpen, setIsFirstProfileSnackBarOpen] = useState(false);

    const checkLoginSuccess = () => {
        if(localStorage.getItem('openLoginSnack')) {
            setIsLoginSnackBarOpen(true);
            localStorage.removeItem('openLoginSnack');
        }
    }

    const checkProfileSuccess = () => {
        if(localStorage.getItem('openProfileSnack')) {
            if(localStorage.getItem('firstProfileCreated')){
                setIsFirstProfileSnackBarOpen(true);
                localStorage.removeItem('firstProfileCreated');
            }
            else{
                setIsProfileSnackBarOpen(true);
            }
        
            localStorage.removeItem('openProfileSnack');
        }
    }

    const navigate = useNavigate();

    const navigateToSearch = () => {
        navigate('/search');
    };

    useEffect(() => {
        checkLoginSuccess();
        checkProfileSuccess();
    }, []);

    return (
        <LandingPageContainer>
            <CustomizedSnackbars
                isOpen={isLoginSnackBarOpen}
                setIsOpen={setIsLoginSnackBarOpen}
                snackText={"Login Successful!"}
            />
            <CustomizedSnackbars
                isOpen={isProfileSnackBarOpen}
                setIsOpen={setIsProfileSnackBarOpen}
                snackText={"Profile Created Successfully!"}
            />
            <CustomizedSnackbars
                isOpen={isFirstProfileSnackBarOpen}
                setIsOpen={setIsFirstProfileSnackBarOpen}
                snackText={"Profile Created Successfully! You can now visit the reach portal and begin searching for trials."}
            />
            <LandingPageText>
                <p>Looking for opportunities to participate in a clinical trial or research study? REACH can match
                    you to relevant clinical trials based on some basic information about you.</p>
                <p>REACH can be used by both patients and clinicians.</p>
                <p>Note: Currently many values are placeholders. As this is a low-fidelity prototype we are mainly
                    mocking the UI as well as the primary functionality of the application.</p>
                <p>If you are new to REACH, click on one of the buttons to get started.</p>
            </LandingPageText>
            <PortalButtonsContainer>
                <PortalButtons type='button' onClick={navigateToSearch}>REACH Portal</PortalButtons>
                <PortalButtons style={{ visibility: 'hidden' }}>Clinician Portal</PortalButtons>
            </PortalButtonsContainer>
        </LandingPageContainer >
    );
}

export default LandingPage;
