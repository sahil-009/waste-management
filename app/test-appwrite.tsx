import { account, appwriteConfig } from '@/lib/appwrite';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AppwriteTest() {
    const [status, setStatus] = useState('Not tested');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        try {
            setLoading(true);
            setStatus('Testing...');

            // Test connection by getting account info (will fail if not logged in, but connection works)
            const response = await account.get();
            setStatus('✅ Connected! User logged in');
            Alert.alert('Success', 'Appwrite connection working!');
        } catch (error: any) {
            // If error is about no session, connection is still working
            if (error.message?.includes('Missing scope') || error.message?.includes('Unauthorized')) {
                setStatus('✅ Connected! (Not logged in)');
                Alert.alert('Success', 'Appwrite connection working! You can now login.');
            } else {
                setStatus('❌ Connection failed');
                Alert.alert('Error', error.message || 'Failed to connect to Appwrite');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Appwrite Connection Test</Text>

            <View style={styles.infoCard}>
                <Text style={styles.label}>Endpoint:</Text>
                <Text style={styles.value}>{appwriteConfig.endpoint}</Text>

                <Text style={styles.label}>Project ID:</Text>
                <Text style={styles.value}>{appwriteConfig.projectId}</Text>

                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{status}</Text>
            </View>

            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={testConnection}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Testing...' : 'Test Connection'}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0fdf9',
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 24,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
        marginTop: 4,
    },
    button: {
        backgroundColor: '#22c55e',
        borderRadius: 24,
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
