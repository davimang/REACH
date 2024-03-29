import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import MenuHeader from './MenuHeader';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AboutUsPage from '../pages/AboutUsPage';
import ContactUsPage from '../pages/ContactUsPage';
import FAQPage from '../pages/FAQPage'
import TrialSearchPage from '../pages/TrialSearchPage';
import SaveTrialsPage from '../pages/SavedTrialsPage';
import ProfileCreationPage from '../pages/ProfileCreation';
import AccountProfile from '../pages/AccountProfile';
import ListProfiles from '../pages/ListProfiles';
import EditProfilePage from '../pages/EditProfilePage';
import EditAccountInfoPage from '../pages/EditAccountInfoPage';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <MenuHeader />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/about' element={<AboutUsPage />} />
                    <Route path='/contact' element={<ContactUsPage />} />
                    <Route path='/faq' element={<FAQPage />} />
                    <Route path='/search' element={<TrialSearchPage />} />
                    <Route path='/savedStudies' element={<SaveTrialsPage />} />
                    <Route path='/createProfile' element={<ProfileCreationPage />} />
                    <Route path='/accountProfile' element={<EditAccountInfoPage />} />
                    <Route path='/listprofiles' element={<ListProfiles />} />
                    <Route path='/editProfile' element={<EditProfilePage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
