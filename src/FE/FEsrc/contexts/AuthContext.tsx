import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { API_URL } from '..';

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextValue {
    isAuthenticated: boolean;
    userId: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {

            const response = await fetch(`${API_URL}/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { access, refresh } = await response.json();

            const decodedAccessToken: any = jwtDecode(access);
            const user_id = decodedAccessToken.user_id;

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('userID', user_id);

            setUserId(userId);
            setAuthenticated(true);

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userID');

        setUserId(null);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
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