import axios from 'axios';

// Read API base URL from environment variable (never hardcoded!)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging (development only)
if (import.meta.env.DEV) {
    apiClient.interceptors.request.use(
        (config) => {
            console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        },
        (error) => {
            console.error('[API Request Error]', error);
            return Promise.reject(error);
        }
    );
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Server responded with error status
            console.error('[API Error]', error.response.status, error.response.data);
        } else if (error.request) {
            // Request made but no response
            console.error('[API Error] No response from server');
        } else {
            // Error in request setup
            console.error('[API Error]', error.message);
        }
        return Promise.reject(error);
    }
);
