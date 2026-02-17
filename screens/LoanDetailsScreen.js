// ============================================
// Screen 2 — Loan Details + Payment Form
// ============================================
// Displays customer loan information and
// provides a form to submit a payment.
// ============================================

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputField from '../components/InputField';
import Button from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import useApi from '../hooks/useApi';
import { createPayment, getPaymentHistory, getCustomerByAccount } from '../services/api';
import { formatCurrency, formatDate, formatDateTime } from '../utils/formatters';

// Validation schema for payment amount
const PaymentSchema = Yup.object().shape({
    amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be greater than 0')
        .required('Amount is required'),
});

export default function LoanDetailsScreen({ route, navigation }) {
    const { customer: initialCustomer } = route.params;
    const [customer, setCustomer] = useState(initialCustomer);

    const customerApi = useApi();
    const paymentApi = useApi();
    const historyApi = useApi();
    const [paymentHistory, setPaymentHistory] = useState(null);

    /**
     * Fetch latest customer data from API
     */
    const fetchCustomerData = async () => {
        const result = await customerApi.execute(
            getCustomerByAccount,
            customer.accountNumber
        );
        if (result && result.success) {
            setCustomer(result.data);
        }
    };

    /**
     * Refresh data whenever screen comes into focus
     */
    useFocusEffect(
        useCallback(() => {
            fetchCustomerData();
        }, [])
    );

    /**
     * Submit a payment for the current customer.
     * On success, navigate to the Success screen.
     */
    const handlePayment = async (values, { resetForm }) => {
        const paymentAmount = parseFloat(values.amount);

        // UI-level check for total balance (Allow prepayments, but not overpaying the debt)
        if (paymentAmount > customer.totalBalance) {
            alert(`You cannot pay more than the total outstanding balance of ₹${customer.totalBalance}`);
            return;
        }

        const result = await paymentApi.execute(
            createPayment,
            customer.accountNumber,
            paymentAmount
        );

        if (result && result.success) {
            resetForm();
            // Update local state immediately before navigating
            setCustomer(result.data.customer);

            navigation.navigate('Success', {
                payment: result.data,
                accountNumber: customer.accountNumber,
            });
        }
    };

    /**
     * Load payment history for the current customer.
     */
    const handleLoadHistory = async () => {
        const result = await historyApi.execute(
            getPaymentHistory,
            customer.accountNumber
        );

        if (result && result.success) {
            setPaymentHistory(result.data);
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
                {/* -------- Loan Information Card -------- */}
                <Card title="📋 Loan Information">
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Account</Text>
                        <Text style={styles.infoValue}>{customer.accountNumber}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Issue Date</Text>
                        <Text style={styles.infoValue}>{formatDate(customer.issueDate)}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Monthly Installment</Text>
                        <Text style={styles.infoValue}>{formatCurrency(customer.monthlyInstallment)}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Due Date</Text>
                        <Text style={styles.infoValue}>{formatDate(customer.nextDueDate)}</Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Amount Due for Month</Text>
                        <Text style={[styles.infoValue, { color: customer.emiDue <= 0 ? '#2ed573' : '#ff4757' }]}>
                            {customer.emiDue <= 0 ? 'PAID / PREPAID' : formatCurrency(customer.emiDue)}
                        </Text>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total Outstanding</Text>
                        <Text style={[styles.infoValue, styles.highlight]}>
                            {formatCurrency(customer.totalBalance)}
                        </Text>
                    </View>
                </Card>

                {/* -------- Payment Form Card -------- */}
                <Card title="💰 Make a Payment">
                    <Formik
                        initialValues={{ amount: '' }}
                        validationSchema={PaymentSchema}
                        onSubmit={handlePayment}
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
                                    label="Payment Amount (₹)"
                                    placeholder="Enter amount"
                                    value={values.amount}
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    error={errors.amount}
                                    touched={touched.amount}
                                    keyboardType="decimal-pad"
                                    returnKeyType="done"
                                />

                                {paymentApi.error && <ErrorMessage message={paymentApi.error} />}

                                <Button
                                    title="Submit Payment"
                                    onPress={handleSubmit}
                                    loading={paymentApi.loading}
                                    disabled={!values.amount}
                                />

                                {/* Quick-fill button for EMI amount */}
                                <Button
                                    title={`Pay Full EMI — ${formatCurrency(customer.emiDue)}`}
                                    onPress={() => {
                                        handleChange('amount')(String(customer.emiDue));
                                        // Auto-submit after setting amount
                                        setTimeout(() => handleSubmit(), 100);
                                    }}
                                    variant="outline"
                                    style={styles.quickPayButton}
                                    loading={paymentApi.loading}
                                />
                            </View>
                        )}
                    </Formik>
                </Card>

                {/* -------- Payment History Section -------- */}
                <Card title="📜 Payment History">
                    {!paymentHistory ? (
                        <Button
                            title="Load Payment History"
                            onPress={handleLoadHistory}
                            loading={historyApi.loading}
                            variant="secondary"
                        />
                    ) : (
                        <View>
                            {historyApi.error && <ErrorMessage message={historyApi.error} />}

                            {paymentHistory.payments?.length === 0 ? (
                                <Text style={styles.emptyText}>No payments recorded yet.</Text>
                            ) : (
                                paymentHistory.payments?.map((payment) => (
                                    <View key={payment.id} style={styles.historyItem}>
                                        <View style={styles.historyHeader}>
                                            <Text style={styles.historyAmount}>
                                                {formatCurrency(payment.amount)}
                                            </Text>
                                            <View
                                                style={[
                                                    styles.statusBadge,
                                                    payment.status === 'success'
                                                        ? styles.statusSuccess
                                                        : styles.statusFailed,
                                                ]}
                                            >
                                                <Text style={styles.statusText}>
                                                    {payment.status.toUpperCase()}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.historyDate}>
                                            {formatDateTime(payment.paymentDate)}
                                        </Text>
                                    </View>
                                ))
                            )}
                        </View>
                    )}
                </Card>
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
        paddingBottom: 40,
    },
    // ---- Loan Info Styles ----
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: '#8888a0',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 15,
        color: '#e0e0f0',
        fontWeight: '600',
    },
    highlight: {
        color: '#6c63ff',
        fontSize: 17,
        fontWeight: '800',
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2a50',
    },
    // ---- Payment Form Styles ----
    quickPayButton: {
        marginTop: 12,
    },
    // ---- History Styles ----
    emptyText: {
        color: '#555570',
        textAlign: 'center',
        paddingVertical: 16,
        fontStyle: 'italic',
    },
    historyItem: {
        backgroundColor: '#12122a',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#2a2a50',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    historyAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#e0e0f0',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusSuccess: {
        backgroundColor: 'rgba(46, 213, 115, 0.15)',
    },
    statusFailed: {
        backgroundColor: 'rgba(255, 71, 87, 0.15)',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#2ed573',
        letterSpacing: 1,
    },
    historyDate: {
        fontSize: 12,
        color: '#666680',
    },
});
