import Button from '@/components/ui/Button';
import { getCurrentUser } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
    const router = useRouter();
    const [userName, setUserName] = useState('Resident');
    const [userEmail, setUserEmail] = useState('resident@example.com');
    const [userInitials, setUserInitials] = useState('R');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                const name = (user as any).profile?.name || user.name || 'Resident';
                const email = (user as any).profile?.email || user.email || 'resident@example.com';
                const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

                setUserName(name);
                setUserEmail(email);
                setUserInitials(initials);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        }
    };

    const menuItems = [
        { icon: 'person-outline', label: 'Edit Profile', route: '' },
        { icon: 'notifications-outline', label: 'Notifications', route: '' },
        { icon: 'settings-outline', label: 'Settings', route: '' },
        { icon: 'help-circle-outline', label: 'Help & Support', route: '' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Profile Header */}
                <MotiView
                    from={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    style={styles.profileHeader}
                >
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{userInitials}</Text>
                    </View>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.email}>{userEmail}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>Resident</Text>
                    </View>
                </MotiView>

                {/* Stats */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                >
                    <View style={styles.statsCard}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Reports</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, styles.statValueGreen]}>150</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>5</Text>
                            <Text style={styles.statLabel}>Badges</Text>
                        </View>
                    </View>
                </MotiView>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <MotiView
                            key={index}
                            from={{ opacity: 0, translateX: -20 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 500, delay: 300 + index * 100 }}
                        >
                            <Pressable style={styles.menuCard}>
                                <View style={styles.menuContent}>
                                    <View style={styles.menuIcon}>
                                        <Ionicons name={item.icon as any} size={24} color="#374151" />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                                </View>
                            </Pressable>
                        </MotiView>
                    ))}
                </View>

                {/* Logout Button */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 700 }}
                >
                    <Button
                        title="Logout"
                        onPress={() => router.push('/(auth)/login')}
                        variant="outline"
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
    profileHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        backgroundColor: '#22c55e',
        borderRadius: 48,
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    avatarText: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    email: {
        color: '#6b7280',
        marginTop: 4,
    },
    roleBadge: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 12,
    },
    roleText: {
        color: '#22c55e',
        fontWeight: '600',
    },
    statsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    statValueGreen: {
        color: '#22c55e',
    },
    statLabel: {
        color: '#6b7280',
        fontSize: 14,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e5e7eb',
    },
    menuContainer: {
        marginBottom: 24,
    },
    menuCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    menuContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        backgroundColor: '#f3f4f6',
        borderRadius: 24,
        padding: 12,
        marginRight: 16,
    },
    menuLabel: {
        flex: 1,
        color: '#111827',
        fontWeight: '500',
        fontSize: 16,
    },
});
