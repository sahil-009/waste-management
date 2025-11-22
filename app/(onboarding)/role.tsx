import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RoleSelectionScreen() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<'resident' | 'worker' | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            router.push({
                pathname: '/(auth)/login',
                params: { role: selectedRole }
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    style={styles.header}
                >
                    <Text style={styles.title}>Choose Your Role</Text>
                    <Text style={styles.subtitle}>Select how you'd like to contribute</Text>
                </MotiView>

                {/* Top Image Placeholder */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.imageContainer}
                >
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imageEmoji}>🌍</Text>
                    </View>
                </MotiView>

                {/* Role Cards */}
                <View style={styles.cardsContainer}>
                    {/* Resident Card */}
                    <Pressable onPress={() => setSelectedRole('resident')}>
                        <MotiView
                            from={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 500, delay: 400 }}
                        >
                            <MotiView
                                animate={{
                                    borderColor: selectedRole === 'resident' ? '#22c55e' : '#ffffff',
                                    scale: selectedRole === 'resident' ? 1.02 : 1,
                                }}
                                transition={{ type: 'spring', damping: 15 }}
                                style={[
                                    styles.roleCard,
                                    selectedRole === 'resident' && styles.roleCardSelected,
                                ]}
                            >
                                <View style={styles.roleCardContent}>
                                    <View style={styles.roleIconContainer}>
                                        <Text style={styles.roleIcon}>🏠</Text>
                                    </View>
                                    <View style={styles.roleTextContainer}>
                                        <Text style={styles.roleTitle}>Resident</Text>
                                        <Text style={styles.roleSubtitle}>Report waste issues</Text>
                                    </View>
                                    {selectedRole === 'resident' && (
                                        <MotiView
                                            from={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                            style={styles.checkmark}
                                        >
                                            <Text style={styles.checkmarkText}>✓</Text>
                                        </MotiView>
                                    )}
                                </View>
                                <Text style={styles.roleDescription}>
                                    Help keep your community clean by reporting waste collection needs
                                </Text>
                            </MotiView>
                        </MotiView>
                    </Pressable>

                    {/* Worker Card */}
                    <Pressable onPress={() => setSelectedRole('worker')}>
                        <MotiView
                            from={{ opacity: 0, translateX: 20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 500, delay: 550 }}
                        >
                            <MotiView
                                animate={{
                                    borderColor: selectedRole === 'worker' ? '#22c55e' : '#ffffff',
                                    scale: selectedRole === 'worker' ? 1.02 : 1,
                                }}
                                transition={{ type: 'spring', damping: 15 }}
                                style={[
                                    styles.roleCard,
                                    selectedRole === 'worker' && styles.roleCardSelected,
                                ]}
                            >
                                <View style={styles.roleCardContent}>
                                    <View style={[styles.roleIconContainer, styles.workerIconBg]}>
                                        <Text style={styles.roleIcon}>👷</Text>
                                    </View>
                                    <View style={styles.roleTextContainer}>
                                        <Text style={styles.roleTitle}>Worker</Text>
                                        <Text style={styles.roleSubtitle}>Collect & manage waste</Text>
                                    </View>
                                    {selectedRole === 'worker' && (
                                        <MotiView
                                            from={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                            style={styles.checkmark}
                                        >
                                            <Text style={styles.checkmarkText}>✓</Text>
                                        </MotiView>
                                    )}
                                </View>
                                <Text style={styles.roleDescription}>
                                    View assigned tasks and complete waste collection efficiently
                                </Text>
                            </MotiView>
                        </MotiView>
                    </Pressable>
                </View>

                {/* Continue Button */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 700 }}
                    style={styles.buttonContainer}
                >
                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        variant="primary"
                        disabled={!selectedRole}
                    />
                </MotiView>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0fdf9',
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 64,
        paddingBottom: 32,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    imageContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        marginBottom: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    imagePlaceholder: {
        width: '100%',
        height: 192,
        backgroundColor: '#ccfbef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageEmoji: {
        fontSize: 70,
    },
    cardsContainer: {
        gap: 16,
        marginBottom: 24,
    },
    roleCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 24,
        borderWidth: 4,
        borderColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 16,
    },
    roleCardSelected: {
        shadowOpacity: 0.15,
        elevation: 8,
    },
    roleCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    roleIconContainer: {
        backgroundColor: '#dcfce7',
        borderRadius: 24,
        padding: 12,
        marginRight: 16,
    },
    workerIconBg: {
        backgroundColor: '#ccfbef',
    },
    roleIcon: {
        fontSize: 30,
    },
    roleTextContainer: {
        flex: 1,
    },
    roleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    roleSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    checkmark: {
        backgroundColor: '#22c55e',
        borderRadius: 20,
        padding: 4,
    },
    checkmarkText: {
        color: '#ffffff',
        fontSize: 18,
    },
    roleDescription: {
        color: '#6b7280',
        fontSize: 14,
    },
    buttonContainer: {
        marginBottom: 16,
    },
    skipContainer: {
        alignItems: 'center',
    },
    skipText: {
        color: '#6b7280',
        fontSize: 14,
    },
});
