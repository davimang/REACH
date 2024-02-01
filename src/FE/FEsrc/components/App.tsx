import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MenuHeader from './MenuHeader';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

function App () {

    return (
        <BrowserRouter>
            <MenuHeader />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
