import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import auth from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import { z } from 'zod';

const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext) || {};

    // Define a schema for login data validation
    const loginSchema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    });
    // Define a schema for register data validation
   const registerSchema = z.object({
    username: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
   });

    const login = async (email, password) => {
        setLoading(true);
        try {
            loginSchema.parse({ email, password });
            const userData = await auth.login(email, password);
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (error) {
            console.error('Login failed:', error.message);
            setLoading(false);
             if (error instanceof z.ZodError) {
               const errors = error.errors.map(err => err.message);
                throw new Error(`Validation error during login: ${errors.join(', ')}`);
            }
            throw new Error(`Login failed: ${error.message}`);
        }
    };

    const register = async (username, email, password) => {
        setLoading(true);
        try {
            registerSchema.parse({username, email, password});
            const userData = await auth.register(username, email, password);
            setUser(userData);
            setLoading(false);
            return userData;
        } catch (error) {
            console.error('Registration failed:', error.message);
            setLoading(false);
            if (error instanceof z.ZodError) {
                const errors = error.errors.map(err => err.message);
                throw new Error(`Validation error during registration: ${errors.join(', ')}`);
            }
              throw new Error(`Registration failed: ${error.message}`);
        }
    };


    const logout = () => {
      try {
        auth.logout();
        setUser(null);
        // window.location.href = '/login';
       } catch(error) {
        console.error("Error logging out:", error);
       }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
             setLoading(true);
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
    }, [setUser, setLoading]);

    return {
        user,
        loading,
        login,
        register,
        logout,
    };
};

export default useAuth;