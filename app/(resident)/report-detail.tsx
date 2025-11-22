import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReportDetailScreen() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </Pressable>
                <Text style={styles.headerTitle}>Report Details</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                {/* Status Banner */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    <View style={styles.statusBanner}>
                        <View style={styles.statusIcon}>
                            <Ionicons name="checkmark-circle" size={32} color="#22c55e" />
                        </View>
                        <View style={styles.statusText}>
                            <Text style={styles.statusTitle}>Collected</Text>
                            <Text style={styles.statusSubtitle}>Nov 20, 2025 - 3:45 PM</Text>
                        </View>
                    </View>
                </MotiView>

                {/* Photo Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Waste Photo</Text>
                        <View style={styles.photoContainer}>
                            <View style={styles.photoPlaceholder}>
                                <Ionicons name="image" size={48} color="#9ca3af" />
                                <Text style={styles.photoText}>Photo uploaded</Text>
                            </View>
                        </View>
                    </View>
                </MotiView>

                {/* Location Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 300 }}
                >
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="location" size={20} color="#22c55e" />
                            <Text style={styles.cardTitle}>Location</Text>
                        </View>
                        <Text style={styles.locationText}>123 Main Street, Downtown</Text>
                        <Text style={styles.locationSubtext}>City Center, Block A</Text>
                    </View>
                </MotiView>

                {/* Details Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Report Information</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Report ID:</Text>
                            <Text style={styles.infoValue}>#12345</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Reported:</Text>
                            <Text style={styles.infoValue}>Nov 19, 2025 - 10:30 AM</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Assigned Worker:</Text>
                            <Text style={styles.infoValue}>Mike Worker</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Reward Points:</Text>
                            <Text style={[styles.infoValue, styles.pointsValue]}>+10 Points</Text>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.descriptionLabel}>Description:</Text>
                        <Text style={styles.descriptionText}>
                            Large pile of mixed waste including plastic bottles, cardboard boxes, and
                            general household waste.
                        </Text>
                    </View>
                </MotiView>

                {/* Timeline Card */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 500 }}
                >
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Timeline</Text>
                        <View style={styles.timeline}>
                            <View style={styles.timelineItem}>
                                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineTitle}>Collected</Text>
                                    <Text style={styles.timelineTime}>Nov 20, 2025 - 3:45 PM</Text>
                                </View>
                            </View>
                            <View style={styles.timelineItem}>
                                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineTitle}>Assigned to Worker</Text>
                                    <Text style={styles.timelineTime}>Nov 19, 2025 - 2:15 PM</Text>
                                </View>
                            </View>
                            <View style={styles.timelineItem}>
                                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineTitle}>Report Created</Text>
                                    <Text style={styles.timelineTime}>Nov 19, 2025 - 10:30 AM</Text>
                                </View>
                            </View>
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
    statusBanner: {
        backgroundColor: '#dcfce7',
        borderRadius: 24,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    statusIcon: {
        marginRight: 16,
    },
    statusText: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#22c55e',
    },
    statusSubtitle: {
        fontSize: 14,
        color: '#16a34a',
        marginTop: 2,
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
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginLeft: 8,
        marginBottom: 16,
    },
    photoContainer: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    photoPlaceholder: {
        backgroundColor: '#f3f4f6',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        color: '#6b7280',
        marginTop: 8,
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
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    infoValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
    },
    pointsValue: {
        color: '#22c55e',
    },
    divider: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginVertical: 16,
    },
    descriptionLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        color: '#374151',
        lineHeight: 20,
    },
    timeline: {
        marginTop: 8,
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 16,
        marginTop: 4,
    },
    timelineDotActive: {
        backgroundColor: '#22c55e',
    },
    timelineContent: {
        flex: 1,
    },
    timelineTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    timelineTime: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
});
