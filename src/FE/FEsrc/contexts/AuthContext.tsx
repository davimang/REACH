import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
    register: (username: string, password: string, email: string, first_name: string, last_name: string, is_clininician: boolean) => Promise<void>;
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

    const register = async (username: string, password: string, email: string, first_name: string, last_name: string, is_clinician: boolean) => {
        try {
            const response = await fetch(`${API_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, userData: { first_name, last_name, is_clinician } }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            await login(username, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('Refresh token not found');
            }

            const response = await fetch(`${API_URL}/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const { access } = await response.json();

            localStorage.setItem('accessToken', access);
            setAuthenticated(true);

        } catch (error) {
            console.error('Token refresh failed:', error);
            logout();
        }
    };

    useEffect(() => {
        const checkTokenExpiration = () => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                const decodedToken: any = jwtDecode(accessToken);
                const timeToExpiration = decodedToken.exp * 1000 - Date.now();

                const refreshTime = 65000;

                if (timeToExpiration < refreshTime && timeToExpiration > 0) {
                    refreshAccessToken();
                }

                if (timeToExpiration > 0) {
                    setAuthenticated(true);
                }
                else {
                    refreshAccessToken();
                }
            }
        };

        checkTokenExpiration();

        const tokenCheckInterval = setInterval(() => {
            checkTokenExpiration();
        }, 60000);

        return () => clearInterval(tokenCheckInterval);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout, register }}>
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