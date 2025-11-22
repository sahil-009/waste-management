import { getCurrentUser, subscribeToTaskAssignments } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function WorkerDashboard() {
    const router = useRouter();
    const [newTaskAlert, setNewTaskAlert] = useState<string | null>(null);
    const [userName, setUserName] = useState('Worker');

    const stats = [
        { icon: 'checkmark-circle', label: 'Completed', value: '45', color: '#22c55e' },
        { icon: 'time', label: 'Pending', value: '8', color: '#fbbf24' },
        { icon: 'trophy', label: 'Points', value: '520', color: '#3b82f6' },
    ];

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                const name = (user as any).profile?.name || user.name || 'Worker';
                setUserName(name);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    };

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const setupRealtimeAlerts = async () => {
            // Get current user
            const user = await getCurrentUser();
            if (user && 'profile' in user && user.profile && user.profile.role === 'worker') {
                // Subscribe to task assignments
                unsubscribe = subscribeToTaskAssignments(user.$id, async (task) => {
                    // Show in-app alert
                    setNewTaskAlert(task.locationText);
                    Alert.alert(
                        '🎯 New Task Assigned!',
                        `You have been assigned a new waste collection task at ${task.locationText}`,
                        [
                            { text: 'View Tasks', onPress: () => router.push('/(worker)/tasks') },
                            { text: 'OK', style: 'cancel' }
                        ]
                    );
                });
            }
        };

        setupRealtimeAlerts();

        // Cleanup subscription on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);


    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* New Task Alert Badge */}
                {newTaskAlert && (
                    <MotiView
                        from={{ opacity: 0, translateY: -10, scale: 0.9 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        transition={{ type: 'spring', damping: 12 }}
                        style={styles.alertBadge}
                    >
                        <Ionicons name="notifications" size={20} color="#fff" />
                        <Text style={styles.alertText}>New task at {newTaskAlert}</Text>
                    </MotiView>
                )}

                {/* Greeting */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    style={styles.greeting}
                >
                    <Text style={styles.greetingText}>Welcome back,</Text>
                    <Text style={styles.greetingName}>{userName} 👷</Text>
                </MotiView>

                {/* Stats Banner */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.bannerContainer}
                >
                    <LinearGradient
                        colors={['#2dd4b8', '#14b8a0']}
                        style={styles.banner}
                    >
                        <Text style={styles.bannerTitle}>Your Performance</Text>
                        <View style={styles.statsRow}>
                            {stats.map((stat, index) => (
                                <View key={index} style={styles.statItem}>
                                    <View style={styles.statIcon}>
                                        <Ionicons name={stat.icon as any} size={24} color="#fff" />
                                    </View>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                </View>
                            ))}
                        </View>
                    </LinearGradient>
                </MotiView>

                {/* Today's Tasks */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                    style={styles.sectionHeader}
                >
                    <Text style={styles.sectionTitle}>Today's Tasks</Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 15 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ delay: 500, type: 'timing', duration: 400 }}
                >
                    <View style={styles.taskCard}>
                        <View style={styles.taskCardContent}>
                            <View style={styles.taskInfo}>
                                <Text style={styles.taskValue}>8</Text>
                                <Text style={styles.taskLabel}>Assigned tasks</Text>
                            </View>
                            <View style={styles.taskIconContainer}>
                                <Ionicons name="list" size={32} color="#14b8a0" />
                            </View>
                        </View>
                    </View>
                </MotiView>

                {/* Quick Stats */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 650 }}
                    style={styles.quickStatsSection}
                >
                    <Text style={styles.sectionTitle}>Quick Stats</Text>
                    <View style={styles.quickStatsRow}>
                        <View style={styles.quickStatCard}>
                            <Ionicons name="calendar" size={32} color="#22c55e" />
                            <Text style={styles.quickStatValue}>5</Text>
                            <Text style={styles.quickStatLabel}>This Week</Text>
                        </View>
                        <View style={styles.quickStatCard}>
                            <Ionicons name="trending-up" size={32} color="#3b82f6" />
                            <Text style={styles.quickStatValue}>92%</Text>
                            <Text style={styles.quickStatLabel}>Efficiency</Text>
                        </View>
                    </View>
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
    greeting: {
        marginBottom: 24,
    },
    greetingText: {
        fontSize: 16,
        color: '#6b7280',
    },
    greetingName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#111827',
    },
    bannerContainer: {
        marginBottom: 24,
        borderRadius: 40,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    banner: {
        padding: 24,
    },
    bannerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 24,
        padding: 12,
        marginBottom: 8,
    },
    statValue: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    taskCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    taskCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskInfo: {
        flex: 1,
    },
    taskValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    taskLabel: {
        fontSize: 16,
        color: '#6b7280',
    },
    taskIconContainer: {
        backgroundColor: '#ccfbef',
        borderRadius: 30,
        padding: 16,
    },
    quickStatsSection: {
        marginTop: 24,
    },
    quickStatsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    quickStatCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    quickStatValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginTop: 8,
    },
    quickStatLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 4,
    },
    alertBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#22c55e',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        gap: 8,
    },
    alertText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
});
