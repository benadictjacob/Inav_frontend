import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to</Text>
                    <Text style={styles.appName}>EasyPay</Text>
                    <Text style={styles.subtitle}>Your trusted partner for loan management.</Text>
                </View>

                <View style={styles.illustrationContainer}>
                    <View style={styles.circle}>
                        <Ionicons name="wallet-outline" size={60} color="#4f8aff" />
                    </View>
                </View>

                <View style={styles.features}>
                    <FeatureItem
                        icon="search-outline"
                        text="Quick Account Lookup"
                        onPress={() => navigation.navigate('Loans')}
                    />
                    <FeatureItem
                        icon="flash-outline"
                        text="Instant EMI Payments"
                        onPress={() => navigation.navigate('Loans')}
                    />
                    <FeatureItem
                        icon="shield-checkmark-outline"
                        text="Secure & Encrypted"
                        onPress={() => navigation.navigate('Loans')}
                    />
                </View>

                <Pressable
                    style={({ pressed, hovered }) => [
                        styles.button,
                        hovered && styles.buttonHover,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => navigation.navigate('Loans')}
                >
                    <Text style={styles.buttonText}>Get Started Now</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const FeatureItem = ({ icon, text, onPress }) => (
    <Pressable
        style={({ pressed, hovered }) => [
            styles.featureItem,
            hovered && styles.featureHover,
            pressed && styles.featurePressed
        ]}
        onPress={onPress}
    >
        <Ionicons name={icon} size={24} color="#4f8aff" style={{ marginRight: 12 }} />
        <Text style={styles.featureText}>{text}</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="#8888a0" style={{ marginLeft: 'auto' }} />
    </Pressable>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f23',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        paddingBottom: 80,
    },
    header: {
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        color: '#a0a0b0',
        fontWeight: '500',
    },
    appName: {
        fontSize: 40,
        color: '#4f8aff',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8888a0',
        lineHeight: 24,
    },
    illustrationContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 32,
    },
    circle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1a1a2e',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2a2a40',
        shadowColor: '#4f8aff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    features: {
        gap: 16,
        marginBottom: 32,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#2a2a40',
    },
    featureHover: {
        borderColor: '#4f8aff',
        backgroundColor: '#20203a',
    },
    featurePressed: {
        backgroundColor: '#18182b',
        transform: [{ scale: 0.98 }],
    },
    featureText: {
        fontSize: 16,
        color: '#e0e0f0',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#4f8aff',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#4f8aff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        transform: [{ scale: 1 }],
    },
    buttonHover: {
        backgroundColor: '#3b75e3',
        transform: [{ scale: 1.02 }],
    },
    buttonPressed: {
        backgroundColor: '#2a5bb5',
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
