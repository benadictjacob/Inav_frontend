// ============================================
// LoadingSpinner Component
// ============================================

import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

/**
 * Full-screen loading indicator with optional message.
 * @param {string} message - Loading text to display
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#6c63ff" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        color: '#a0a0b0',
        fontWeight: '500',
    },
});

export default LoadingSpinner;
