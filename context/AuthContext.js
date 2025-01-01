import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '../services/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const userData = await auth.login(email, password);
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error('Login failed:', error.message);
            setLoading(false);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            const userData = await auth.register(username, email, password);
            setUser(userData);
            setLoading(false);
        } catch (error) {
           console.error('Registration failed:', error.message);
            setLoading(false);
        }
    };

    const logout = () => {
        auth.logout();
        setUser(null);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const token = localStorage.getItem('token');
               if (token) {
                    // Mock user data fetch - replace with actual API call when available
                    const mockUserData = { username: 'User', email: 'user@example.com' };
                   setUser(mockUserData);
                }
            } catch (error) {
                console.error('Error during auth check:', error);
            } finally {
                 setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);


    const authContextValue = {
        user,
        loading,
        login,
        register,
        logout,
    };


    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuth = () => {
    return useContext(AuthContext);
};


export { AuthProvider, useAuth };