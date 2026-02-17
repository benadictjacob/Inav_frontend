// ============================================
// App Navigator — Tabs + Stack
// ============================================
// Structure:
// - TabNavigator (Root)
//   - Home Tab (HomeScreen)
//   - Pay Tab (PaymentStack)
//     - AccountLookup → LoanDetails → Success
// ============================================

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AccountLookupScreen from '../screens/AccountLookupScreen';
import LoanDetailsScreen from '../screens/LoanDetailsScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Payment Flow
function PaymentStack() {
    return (
        <Stack.Navigator
            initialRouteName="AccountLookup"
            screenOptions={{
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#e0e0e0',
                headerTitleStyle: { fontWeight: '700', fontSize: 18 },
                headerShadowVisible: false,
                contentStyle: { backgroundColor: '#0f0f23' },
            }}
        >
            <Stack.Screen
                name="AccountLookup"
                component={AccountLookupScreen}
                options={{ title: 'Payment Collection' }}
            />
            <Stack.Screen
                name="LoanDetails"
                component={LoanDetailsScreen}
                options={{ title: 'Loan Details' }}
            />
            <Stack.Screen
                name="Success"
                component={SuccessScreen}
                options={{
                    title: 'Payment Confirmed',
                    headerBackVisible: false,
                }}
            />
        </Stack.Navigator>
    );
}

// Main Tab Navigator
export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#1a1a2e',
                    borderTopColor: '#2a2a40',
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarActiveTintColor: '#4f8aff',
                tabBarInactiveTintColor: '#8888a0',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Loans') {
                        iconName = focused ? 'card' : 'card-outline';
                    }

                    return <Ionicons name={iconName} size={24} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="Loans"
                component={PaymentStack}
                options={{ title: 'Pay' }}
            />
        </Tab.Navigator>
    );
}
