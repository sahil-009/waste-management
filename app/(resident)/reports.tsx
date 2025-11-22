import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

interface Report {
    id: string;
    location: string;
    status: 'pending' | 'assigned' | 'collected';
    date: string;
    time: string;
}

export default function ReportsScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const reports: Report[] = [
        {
            id: '1',
            location: '123 Main Street, Downtown',
            status: 'pending',
            date: 'Nov 20, 2025',
            time: '10:30 AM',
        },
        {
            id: '2',
            location: '456 Park Avenue, Uptown',
            status: 'assigned',
            date: 'Nov 19, 2025',
            time: '2:15 PM',
        },
        {
            id: '3',
            location: '789 Oak Road, Suburb',
            status: 'collected',
            date: 'Nov 18, 2025',
            time: '9:00 AM',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return '#fbbf24';
            case 'assigned':
                return '#3b82f6';
            case 'collected':
                return '#22c55e';
            default:
                return '#9ca3af';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return 'time';
            case 'assigned':
                return 'person';
            case 'collected':
                return 'checkmark-circle';
            default:
                return 'help-circle';
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
                    <Text style={styles.title}>My Reports</Text>
                    <Text style={styles.subtitle}>Track your waste reports</Text>
                </MotiView>

                {/* Search Bar */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.searchContainer}
                >
                    <Ionicons name="search" size={20} color="#9ca3af" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#9ca3af"
                    />
                </MotiView>

                {/* Reports List */}
                <View style={styles.reportsList}>
                    {reports.map((report, index) => (
                        <MotiView
                            key={report.id}
                            from={{ opacity: 0, translateY: 15 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                delay: 400 + index * 150,
                                type: 'timing',
                                duration: 400,
                            }}
                        >
                            <View style={styles.reportCard}>
                                <View style={styles.reportHeader}>
                                    <View style={[styles.statusIcon, { backgroundColor: `${getStatusColor(report.status)}20` }]}>
                                        <Ionicons
                                            name={getStatusIcon(report.status) as any}
                                            size={24}
                                            color={getStatusColor(report.status)}
                                        />
                                    </View>

                                    <View style={styles.reportContent}>
                                        <View style={styles.reportTop}>
                                            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(report.status)}20` }]}>
                                                <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>
                                                    {report.status}
                                                </Text>
                                            </View>
                                            <Text style={styles.reportId}>#{report.id}</Text>
                                        </View>

                                        <View style={styles.locationRow}>
                                            <Ionicons name="location" size={16} color="#9ca3af" />
                                            <Text style={styles.locationText}>{report.location}</Text>
                                        </View>

                                        <View style={styles.metaRow}>
                                            <View style={styles.metaItem}>
                                                <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                                                <Text style={styles.metaText}>{report.date}</Text>
                                            </View>
                                            <Text style={styles.metaDot}>•</Text>
                                            <View style={styles.metaItem}>
                                                <Ionicons name="time-outline" size={14} color="#9ca3af" />
                                                <Text style={styles.metaText}>{report.time}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                                </View>
                            </View>
                        </MotiView>
                    ))}
                </View>
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
        marginBottom: 24,
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
    searchContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#111827',
    },
    reportsList: {
        gap: 16,
    },
    reportCard: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
    reportHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    statusIcon: {
        borderRadius: 24,
        padding: 12,
        marginRight: 16,
    },
    reportContent: {
        flex: 1,
    },
    reportTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    reportId: {
        fontSize: 12,
        color: '#9ca3af',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    locationText: {
        flex: 1,
        marginLeft: 4,
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 4,
    },
    metaDot: {
        color: '#9ca3af',
        marginHorizontal: 8,
    },
});
