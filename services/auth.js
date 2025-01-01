import api from './api';
import { z } from 'zod';

// Define a minimal schema for user data validation
const userSchema = z.object({
    username: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

/**
 * Registers a new user.
 *
 * @param {string} username - The username of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A Promise that resolves with the API response data or rejects with an error.
 */
const register = async (username, email, password) => {
    try {
        // Validate the user data against the schema
        const userData = { username, email, password };
        userSchema.parse(userData);

        // Send the registration request to the API
        const response = await api.post('/auth/register', JSON.stringify(userData));

        // Check for a successful response (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
            return response.data; // Return the response data
        } else {
            console.error('API registration error:', response.status, response.data);
            throw new Error(`Registration failed with status: ${response.status}`);
        }
    } catch (error) {
        // Handle validation errors or API request errors
        if(error instanceof z.ZodError) {
           const errors = error.errors.map(err => err.message);
           console.error('Validation error during registration:', errors);
          throw new Error(`Validation errors: ${errors.join(', ')}`);
        }
         console.error('Error during registration:', error.message);
         throw new Error(`Registration failed: ${error.message}`);
    }
};

/**
 * Logs in an existing user.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - A Promise that resolves with the API response data or rejects with an error.
 */
const login = async (email, password) => {
    try {
         // Validate the user data against the schema
        const userData = { email, password };
        userSchema.parse(userData);
        
        // Send the login request to the API
        const response = await api.post('/auth/login', JSON.stringify(userData));


        // Check for a successful response (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
             // Store the token in localStorage if login is successful
             const token = response.data.token;
             if(token){
                localStorage.setItem('token', token);
            }

            return response.data; // Return the response data
        } else {
            console.error('API login error:', response.status, response.data);
            throw new Error(`Login failed with status: ${response.status}`);
        }
    } catch (error) {
          // Handle validation errors or API request errors
        if(error instanceof z.ZodError) {
            const errors = error.errors.map(err => err.message);
           console.error('Validation error during login:', errors);
          throw new Error(`Validation errors: ${errors.join(', ')}`);
         }
        console.error('Error during login:', error.message);
       throw new Error(`Login failed: ${error.message}`);
    }
};

/**
 * Logs out the current user.
 *
 * @returns {void}
 */
const logout = () => {
    try {
        // Remove the token from localStorage
        localStorage.removeItem('token');
         // Redirect to login
        window.location.href = '/login';
    } catch (error) {
        console.error('Error during logout:', error.message);
    }
};

export default {
    register,
    login,
    logout,
};