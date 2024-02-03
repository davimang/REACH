import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import MenuHeader from './MenuHeader';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';


function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <MenuHeader />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/login' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
