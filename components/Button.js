// ============================================
// Button Component
// ============================================

import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

/**
 * Reusable button with loading state support.
 * @param {string}   title    - Button label
 * @param {Function} onPress  - Press handler
 * @param {boolean}  loading  - Shows spinner when true
 * @param {boolean}  disabled - Disables the button
 * @param {string}   variant  - "primary" | "secondary" | "outline"
 * @param {Object}   style    - Custom style overrides
 */
const Button = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    variant = 'primary',
    style,
}) => {
    const isDisabled = disabled || loading;

    const buttonStyles = [
        styles.button,
        styles[variant],
        isDisabled && styles.disabled,
        style,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' ? '#6c63ff' : '#ffffff'}
                />
            ) : (
                <Text style={[styles.text, styles[`${variant}Text`]]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 56,
    },
    primary: {
        backgroundColor: '#6c63ff',
    },
    secondary: {
        backgroundColor: '#2d2d44',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#6c63ff',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    primaryText: {
        color: '#ffffff',
    },
    secondaryText: {
        color: '#e0e0e0',
    },
    outlineText: {
        color: '#6c63ff',
    },
});

export default Button;
