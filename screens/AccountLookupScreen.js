// ============================================
// Screen 1 — Account Lookup
// ============================================
// Allows the user to enter an account number
// and fetch the associated loan details.
// Uses Formik for form state and Yup for
// input validation.
// ============================================

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';
import useApi from '../hooks/useApi';
import { getCustomerByAccount } from '../services/api';

// Validation schema for account lookup
const AccountSchema = Yup.object().shape({
    accountNumber: Yup.string()
        .trim()
        .required('Account number is required')
        .min(3, 'Account number must be at least 3 characters'),
});

export default function AccountLookupScreen({ navigation }) {
    const { loading, error, execute } = useApi();

    /**
     * Handle form submission:
     * 1. Call the API to look up the customer
     * 2. Navigate to LoanDetails on success
     */
    const handleLookup = async (values) => {
        const result = await execute(getCustomerByAccount, values.accountNumber.trim());

        if (result && result.success) {
            navigation.navigate('LoanDetails', {
                customer: result.data,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.emoji}>💳</Text>
                    <Text style={styles.title}>Account Lookup</Text>
                    <Text style={styles.subtitle}>
                        Enter a customer account number to view loan details and record payments.
                    </Text>
                </View>

                {/* Lookup Form */}
                <Card>
                    <Formik
                        initialValues={{ accountNumber: '' }}
                        validationSchema={AccountSchema}
                        onSubmit={handleLookup}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View>
                                <InputField
                                    label="Account Number"
                                    placeholder="e.g. ACC-10001"
                                    value={values.accountNumber}
                                    onChangeText={handleChange('accountNumber')}
                                    onBlur={handleBlur('accountNumber')}
                                    error={errors.accountNumber}
                                    touched={touched.accountNumber}
                                    returnKeyType="search"
                                    onSubmitEditing={handleSubmit}
                                />

                                {error && <ErrorMessage message={error} />}

                                <Button
                                    title="Look Up Account"
                                    onPress={handleSubmit}
                                    loading={loading}
                                    disabled={!values.accountNumber.trim()}
                                />
                            </View>
                        )}
                    </Formik>
                </Card>

                {/* Quick Access Hint */}
                <Text style={styles.hint}>
                    💡 Try: ACC-10001, ACC-10002, ACC-10003
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#e0e0f0',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#8888a0',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    hint: {
        textAlign: 'center',
        color: '#555570',
        fontSize: 13,
        marginTop: 24,
        fontStyle: 'italic',
    },
});
