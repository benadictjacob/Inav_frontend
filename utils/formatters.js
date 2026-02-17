// ============================================
// Utility Formatters
// ============================================
// Currency and date formatting helpers used
// across multiple screens.
// ============================================

/**
 * Format a number as INR currency.
 * @param {number} amount
 * @returns {string} e.g., "₹15,250.00"
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) {
        return '₹0.00';
    }
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    }).format(amount);
};

/**
 * Format an ISO date string to a readable format.
 * @param {string} dateString - ISO date string
 * @returns {string} e.g., "15 Jan 2024"
 */
export const formatDate = (dateString) => {
    if (!dateString) {
        return 'N/A';
    }
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Format an ISO date string to a readable date-time format.
 * @param {string} dateString - ISO date string
 * @returns {string} e.g., "15 Jan 2024, 02:30 PM"
 */
export const formatDateTime = (dateString) => {
    if (!dateString) {
        return 'N/A';
    }
    return new Date(dateString).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
