// ============================================
// ErrorMessage Component
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Displays an error message in a styled container.
 * @param {string} message - Error message to display
 */
const ErrorMessage = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>⚠️</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 71, 87, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 71, 87, 0.3)',
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 20,
        marginRight: 12,
    },
    text: {
        flex: 1,
        color: '#ff4757',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
});

export default ErrorMessage;
