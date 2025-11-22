import { getCurrentUser } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ResidentDashboard() {
    const router = useRouter();
    const [userName, setUserName] = useState('Resident');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                // Try to get name from profile first, then from user object
                const name = (user as any).profile?.name || user.name || 'Resident';
                setUserName(name);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    };

    const stats = [
        { icon: 'checkmark-circle', label: 'Completed', value: '12', color: '#22c55e' },
        { icon: 'time', label: 'Pending', value: '3', color: '#fbbf24' },
        { icon: 'trophy', label: 'Points', value: '150', color: '#3b82f6' },
    ];

    const quickActions = [
        { icon: 'add-circle', label: 'New Report', color: '#22c55e', route: '/(resident)/create-report' },
        { icon: 'document-text', label: 'My Reports', color: '#14b8a0', route: '/(resident)/reports' },
        { icon: 'map', label: 'Map View', color: '#3b82f6', route: '/(resident)/reports' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Greeting */}
                <MotiView
                    from={{ opacity: 0, translateY: -20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600 }}
                    style={styles.greeting}
                >
                    <Text style={styles.greetingText}>Good Morning,</Text>
                    <Text style={styles.greetingName}>{userName} 👋</Text>
                </MotiView>

                {/* Stats Banner */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.bannerContainer}
                >
                    <LinearGradient
                        colors={['#4ade80', '#22c55e']}
                        style={styles.banner}
                    >
                        <Text style={styles.bannerTitle}>Your Impact</Text>
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

                {/* Quick Actions */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                    style={styles.sectionHeader}
                >
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                </MotiView>

                <View style={styles.actionsContainer}>
                    {quickActions.map((action, index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0, translateY: 15 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                delay: 500 + index * 150,
                                type: 'timing',
                                duration: 400,
                            }}
                        >
                            <Pressable
                                style={styles.actionCard}
                                onPress={() => router.push(action.route as any)}
                            >
                                <View style={styles.actionCardContent}>
                                    <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
                                        <Ionicons name={action.icon as any} size={28} color={action.color} />
                                    </View>
                                    <View style={styles.actionText}>
                                        <Text style={styles.actionLabel}>{action.label}</Text>
                                        <Text style={styles.actionSubtext}>Tap to {action.label.toLowerCase()}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
                                </View>
                            </Pressable>
                        </MotiView>
                    ))}
                </View>

                {/* Recent Activity */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 950 }}
                    style={styles.recentSection}
                >
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.emptyCard}>
                        <Ionicons name="leaf-outline" size={48} color="#22c55e" />
                        <Text style={styles.emptyText}>No recent activity</Text>
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
    actionsContainer: {
        gap: 16,
        marginBottom: 24,
    },
    actionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    actionCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        borderRadius: 24,
        padding: 16,
        marginRight: 16,
    },
    actionText: {
        flex: 1,
    },
    actionLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    actionSubtext: {
        fontSize: 14,
        color: '#6b7280',
    },
    recentSection: {
        marginTop: 24,
    },
    emptyCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 32,
        alignItems: 'center',
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    emptyText: {
        color: '#6b7280',
        marginTop: 8,
    },
});
