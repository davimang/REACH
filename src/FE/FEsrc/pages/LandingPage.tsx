import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../components/ButtonStyle';
import CustomizedSnackbars from '../components/SnackBar';
import { useAuth } from '../contexts/AuthContext';

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
    
    const { isAuthenticated } = useAuth();
    const isClinician = localStorage.getItem('isClinician') == "true";

    const checkLoginSuccess = () => {
        if (localStorage.getItem('openLoginSnack')) {
            setIsLoginSnackBarOpen(true);
            localStorage.removeItem('openLoginSnack');
        }
    }

    const navigate = useNavigate();

    const navigateToSearch = () => {
        isAuthenticated ? navigate('/search') : navigate('/login');
    };

    const navigateToProfiles = () => {
        isAuthenticated ? navigate('/listprofiles') : navigate('/login');
    };

    useEffect(() => {
        checkLoginSuccess();
    }, []);

    return (
        <LandingPageContainer>
            <CustomizedSnackbars
                isOpen={isLoginSnackBarOpen}
                setIsOpen={setIsLoginSnackBarOpen}
                snackText={"Login Successful!"}
            />
            <LandingPageText>
                <p>Looking for opportunities to participate in a clinical trial or research study? REACH can find
                    you relevant studies based on some basic information about you.</p>
                <p>REACH can be used by both patients and clinicians.</p>
                <p>If you are new to REACH, click on the REACH Portal button.</p>
            </LandingPageText>
            <PortalButtonsContainer>
                <PortalButtons type='button' onClick={navigateToSearch}>REACH Portal</PortalButtons>
                <PortalButtons type='button' onClick={navigateToProfiles}>{isClinician ? "Patient Profiles" : "Search Profiles"}</PortalButtons>
            </PortalButtonsContainer>
        </LandingPageContainer >
    );
}

export default LandingPage;
