// ============================================
// API Service
// ============================================
// Centralizes all HTTP requests using Axios.
// Reads the API base URL from Expo constants.
// ============================================

import axios from 'axios';
import Constants from 'expo-constants';

// Read API URL from app.json → extra, fallback to localhost
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000/api';

/**
 * Axios instance configured with base URL and defaults.
 */
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --------- Response interceptor for error normalization ---------
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Normalize error message from backend response or network error
        const message =
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.message ||
            error.message ||
            'An unexpected error occurred';

        return Promise.reject(new Error(message));
    }
);

// ===================== API Functions =====================

/**
 * Fetch a customer's loan details by account number.
 * @param {string} accountNumber
 * @returns {Promise<Object>} Customer data
 */
export const getCustomerByAccount = async (accountNumber) => {
    const response = await apiClient.get(`/customers/${accountNumber}`);
    return response.data;
};

/**
 * Fetch all customers.
 * @returns {Promise<Object>} List of customers
 */
export const getAllCustomers = async () => {
    const response = await apiClient.get('/customers');
    return response.data;
};

/**
 * Submit a payment for a customer.
 * @param {string} accountNumber
 * @param {number} amount
 * @returns {Promise<Object>} Payment confirmation
 */
export const createPayment = async (accountNumber, amount) => {
    const response = await apiClient.post('/payments', {
        account_number: accountNumber,
        amount: parseFloat(amount),
    });
    return response.data;
};

/**
 * Fetch payment history for a customer.
 * @param {string} accountNumber
 * @returns {Promise<Object>} Payment history
 */
export const getPaymentHistory = async (accountNumber) => {
    const response = await apiClient.get(`/payments/${accountNumber}`);
    return response.data;
};

export default apiClient;
