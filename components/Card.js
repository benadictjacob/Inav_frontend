// ============================================
// Card Component
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Reusable card with optional title.
 * Used to wrap content sections in a styled container.
 *
 * @param {string}  title    - Optional card title
 * @param {Object}  style    - Custom style overrides
 * @param {ReactNode} children - Card content
 */
const Card = ({ title, style, children }) => {
    return (
        <View style={[styles.card, style]}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a35',
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#2a2a50',
        // Subtle shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    title: {
        color: '#e0e0f0',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        letterSpacing: 0.3,
    },
});

export default Card;
