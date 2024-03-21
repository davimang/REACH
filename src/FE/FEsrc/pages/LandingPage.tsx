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
    const [isProfileSnackBarOpen, setIsProfileSnackBarOpen] = useState(false);
    const [isFirstProfileSnackBarOpen, setIsFirstProfileSnackBarOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const checkLoginSuccess = () => {
        if (localStorage.getItem('openLoginSnack')) {
            setIsLoginSnackBarOpen(true);
            localStorage.removeItem('openLoginSnack');
        }
    }

    const checkProfileSuccess = () => {
        if (localStorage.getItem('openProfileSnack')) {
            if (localStorage.getItem('firstProfileCreated')) {
                setIsFirstProfileSnackBarOpen(true);
                localStorage.removeItem('firstProfileCreated');
            }
            else {
                setIsProfileSnackBarOpen(true);
            }

            localStorage.removeItem('openProfileSnack');
        }
    }

    const navigate = useNavigate();

    const navigateToSearch = () => {
        isAuthenticated ? navigate('/search') : navigate('/login');
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
                <p>Looking for opportunities to participate in a clinical trial or research study? REACH can find
                    you relevant studies based on some basic information about you.</p>
                <p>REACH can be used by both patients and clinicians.</p>
                <p>If you are new to REACH, click on the REACH Portal button.</p>
            </LandingPageText>
            <PortalButtonsContainer>
                <PortalButtons type='button' onClick={navigateToSearch}>REACH Portal</PortalButtons>
            </PortalButtonsContainer>
        </LandingPageContainer >
    );
}

export default LandingPage;
