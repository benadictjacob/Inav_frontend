// ============================================
// Screen 3 — Payment Success
// ============================================
// Confirmation screen shown after a successful
// payment submission.
// ============================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Button from '../components/Button';
import Card from '../components/Card';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export default function SuccessScreen({ route, navigation }) {
    const { payment, accountNumber } = route.params;

    /**
     * Navigate back to the Account Lookup screen.
     */
    const handleGoHome = () => {
        navigation.popToTop();
    };

    /**
     * Navigate back to Loan Details to make another payment.
     */
    const handleNewPayment = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <View style={styles.iconWrapper}>
                <Text style={styles.successIcon}>✅</Text>
            </View>

            <Text style={styles.title}>Payment Successful!</Text>
            <Text style={styles.subtitle}>
                Your payment has been recorded successfully.
            </Text>

            {/* Payment Details Card */}
            <Card style={styles.card}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Account</Text>
                    <Text style={styles.detailValue}>{accountNumber}</Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount</Text>
                    <Text style={[styles.detailValue, styles.amountHighlight]}>
                        {formatCurrency(payment?.data?.amount || payment?.amount)}
                    </Text>
                </View>
                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>SUCCESS</Text>
                    </View>
                </View>
                <View style={styles.divider} />

                {payment?.customer && (
                    <>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Next Due Date</Text>
                            <Text style={styles.detailValue}>
                                {formatDateTime(payment.customer.nextDueDate)}
                            </Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Next Month's Due</Text>
                            <Text style={[styles.detailValue, { color: '#4f8aff' }]}>
                                {formatCurrency(payment.customer.emiDue)}
                            </Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Remaining Total Balance</Text>
                            <Text style={[styles.detailValue, { color: '#ffbd2e' }]}>
                                {payment.customer.totalBalance <= 0
                                    ? 'FULLY PAID 🏆'
                                    : formatCurrency(payment.customer.totalBalance)}
                            </Text>
                        </View>
                        <View style={styles.divider} />
                    </>
                )}

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>
                        {formatDateTime(payment?.paymentDate)}
                    </Text>
                </View>

                {payment?.transactionId && (
                    <>
                        <View style={styles.divider} />
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Transaction ID</Text>
                            <Text style={styles.detailValue}>{payment.transactionId}</Text>
                        </View>
                    </>
                )}
            </Card>

            {/* Action Buttons */}
            <View style={styles.actions}>
                <Button
                    title="Make Another Payment"
                    onPress={handleNewPayment}
                    variant="outline"
                    style={styles.actionButton}
                />
                <Button
                    title="Back to Home"
                    onPress={handleGoHome}
                    style={styles.actionButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        paddingTop: 40,
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(46, 213, 115, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successIcon: {
        fontSize: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2ed573',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 15,
        color: '#8888a0',
        marginBottom: 28,
        textAlign: 'center',
    },
    card: {
        width: '100%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    detailLabel: {
        fontSize: 14,
        color: '#8888a0',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 15,
        color: '#e0e0f0',
        fontWeight: '600',
    },
    amountHighlight: {
        color: '#2ed573',
        fontSize: 18,
        fontWeight: '800',
    },
    divider: {
        height: 1,
        backgroundColor: '#2a2a50',
    },
    statusBadge: {
        backgroundColor: 'rgba(46, 213, 115, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#2ed573',
        letterSpacing: 1,
    },
    actions: {
        width: '100%',
        marginTop: 32,
    },
    actionButton: {
        marginBottom: 12,
    },
});
