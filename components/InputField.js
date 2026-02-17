// ============================================
// InputField Component
// ============================================

import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

/**
 * Styled text input with label and error display.
 * Designed to integrate with Formik.
 *
 * @param {string} label       - Input label
 * @param {string} error       - Error message (from Formik/Yup)
 * @param {boolean} touched    - Whether field was touched
 * @param {Object} inputProps  - Additional TextInput props
 */
const InputField = ({ label, error, touched, ...inputProps }) => {
    const showError = touched && error;

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, showError && styles.inputError]}
                placeholderTextColor="#555570"
                autoCapitalize="none"
                autoCorrect={false}
                {...inputProps}
            />
            {showError && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        color: '#c0c0d0',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.3,
    },
    input: {
        backgroundColor: '#1e1e36',
        borderWidth: 1.5,
        borderColor: '#2d2d50',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#e0e0f0',
    },
    inputError: {
        borderColor: '#ff4757',
    },
    errorText: {
        color: '#ff4757',
        fontSize: 12,
        marginTop: 6,
        fontWeight: '500',
    },
});

export default InputField;
