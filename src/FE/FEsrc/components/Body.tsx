import React, { useState } from 'react';
import styled from '@emotion/styled';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

interface Props {
    currentPage: string;
    setCurrentPage: (currentPage: string) => void;
}

const Body = ({currentPage, setCurrentPage}: Props) => {
    
    

    return (
        <>
        {currentPage == "LANDING" && <LandingPage />}
        {currentPage == "LOGIN" && <LoginPage />}
        </>
    );
}

export default Body;
