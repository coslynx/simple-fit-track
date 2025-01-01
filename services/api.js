import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
        console.error('Error retrieving token from local storage:', error);
    }
    return config;
  },
  (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.removeItem('token');
          window.location.href = '/login';
            return Promise.reject(error);
        }
          console.error('API response error:', error.response.status, error.response.data || error.message);
          return Promise.reject(error);
      } else if (error.request) {
        console.error('API request error, no response received:', error.message);
          return Promise.reject(error);
      } else {
          console.error('API error:', error.message);
          return Promise.reject(error);
      }
    } catch (err) {
        console.error('Error in response interceptor:', err);
        return Promise.reject(error);
    }

  }
);

export default api;