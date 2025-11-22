import Button from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TaskDetailScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </Pressable>
                <Text style={styles.headerTitle}>Task Details</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                {/* Status Banner */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    style={styles.bannerContainer}
                >
                    <LinearGradient colors={['#fbbf24', '#f59e0b']} style={styles.banner}>
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerIcon}>
                                <Ionicons name="time" size={32} color="#fff" />
                            </View>
                            <View style={styles.bannerText}>
                                <Text style={styles.bannerTitle}>New Task Assigned</Text>
                                <Text style={styles.bannerSubtitle}>Priority: High</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </MotiView>

                {/* Location Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="location" size={24} color="#22c55e" />
                            <Text style={styles.cardTitle}>Location</Text>
                        </View>
                        <Text style={styles.locationText}>123 Main Street, Downtown</Text>
                        <Text style={styles.locationSubtext}>City Center, Block A</Text>
                        <View style={styles.distanceRow}>
                            <Ionicons name="navigate" size={16} color="#6b7280" />
                            <Text style={styles.distanceText}>1.2 km away</Text>
                        </View>
                    </View>
                </MotiView>

                {/* Photo Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 300 }}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="image" size={24} color="#3b82f6" />
                            <Text style={styles.cardTitle}>Waste Photo</Text>
                        </View>
                        <View style={styles.photoPlaceholder}>
                            <Ionicons name="camera" size={48} color="#9ca3af" />
                            <Text style={styles.photoText}>Photo uploaded by resident</Text>
                        </View>
                    </View>
                </MotiView>

                {/* Details Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="information-circle" size={24} color="#14b8a0" />
                            <Text style={styles.cardTitle}>Task Information</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Task ID:</Text>
                            <Text style={styles.infoValue}>#12345</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Reported:</Text>
                            <Text style={styles.infoValue}>Nov 21, 2025 - 10:30 AM</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Reporter:</Text>
                            <Text style={styles.infoValue}>John Doe</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Description:</Text>
                        </View>
                        <Text style={styles.descriptionText}>
                            Large pile of mixed waste including plastic bottles, cardboard boxes, and
                            general household waste. Needs immediate collection.
                        </Text>
                    </View>
                </MotiView>

                {/* Action Buttons */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                    style={styles.actionsContainer}
                >
                    <Pressable style={styles.mapButton}>
                        <Ionicons name="map" size={20} color="#3b82f6" />
                        <Text style={styles.mapButtonText}>View on Map</Text>
                    </Pressable>

                    <Button
                        title="Start Task"
                        onPress={() => { }}
                        variant="primary"
                        style={styles.startButton}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    placeholder: {
        width: 40,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 32,
    },
    bannerContainer: {
        marginBottom: 24,
        borderRadius: 30,
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
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        padding: 16,
        marginRight: 16,
    },
    bannerText: {
        flex: 1,
    },
    bannerTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bannerSubtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginLeft: 12,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    locationSubtext: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 12,
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 4,
    },
    photoPlaceholder: {
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        color: '#6b7280',
        marginTop: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
    },
    descriptionText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
        marginTop: 8,
    },
    actionsContainer: {
        marginTop: 8,
    },
    mapButton: {
        backgroundColor: '#dbeafe',
        borderRadius: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    mapButtonText: {
        color: '#3b82f6',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 16,
    },
    startButton: {
        marginTop: 4,
    },
});
