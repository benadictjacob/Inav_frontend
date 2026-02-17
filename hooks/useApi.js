// ============================================
// useApi — Custom Hook for API Calls
// ============================================
// Manages loading, data, and error state for
// any async API function.
// ============================================

import { useState, useCallback } from 'react';

/**
 * Custom hook that wraps an async API function.
 * Returns { data, loading, error, execute, reset }.
 *
 * @returns {Object} API state and execute function
 */
const useApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Execute an async API function.
     * @param {Function} apiFunc - The API function to call
     * @param  {...any} args    - Arguments forwarded to the API function
     * @returns {Promise<Object|null>} Response data or null on error
     */
    const execute = useCallback(async (apiFunc, ...args) => {
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const result = await apiFunc(...args);
            setData(result);
            return result;
        } catch (err) {
            const message = err.message || 'Something went wrong';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Reset all state to initial values.
     */
    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    return { data, loading, error, execute, reset };
};

export default useApi;
