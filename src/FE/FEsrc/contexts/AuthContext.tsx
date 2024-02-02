import React, { createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextValue {
    isAuthenticated: boolean;
    login: (acessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = ;

    const login = (acessToken: string, refreshToken: string) => {
        localStorage.setItem('accessToken', acessToken);
        localStorage.setItem('refreshToken', refreshToken);

        navigate('/LandingPage');
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        navigate('/LandingPage');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};