import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
    const router = useRouter();
    const [coords, setCoords] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleGetLocation = async () => {
        try {
            setLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied. Enable location permissions.');
                return;
            }
            // Mock location for Jain University, Jayanagar, Bangalore
            const latitude = 12.9254533;
            const longitude = 77.5938607;
            setCoords(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        } catch (e) {
            console.error(e);
            alert('Failed to get location');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#111827" />
                </Pressable>
                <Text style={styles.headerTitle}>Live Map</Text>
                <Pressable style={styles.filterButton}>
                    <Ionicons name="filter" size={24} color="#111827" />
                </Pressable>
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapPlaceholder}>
                <Ionicons name="map" size={64} color="#9ca3af" />
                <Text style={styles.mapText}>Map View</Text>
                <Text style={styles.mapSubtext}>Integrate Google Maps or Mapbox here</Text>
                <Pressable onPress={handleGetLocation} style={styles.locationButton} disabled={loading}>
                    <View style={styles.locationButtonContent}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#3b82f6" />
                        ) : (
                            <Ionicons name="navigate" size={20} color="#3b82f6" />
                        )}
                        <Text style={styles.locationButtonText}>
                            {coords ? `Location: ${coords}` : 'Get Current Location'}
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Bottom Sheet */}
            <MotiView
                from={{ translateY: 100 }}
                animate={{ translateY: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                style={styles.bottomSheet}
            >
                <View style={styles.handle} />
                <Text style={styles.sheetTitle}>Nearby Tasks</Text>

                <View style={styles.tasksList}>
                    {[1, 2, 3].map((item) => (
                        <Pressable key={item} style={styles.taskCard}>
                            <View style={styles.taskIcon}>
                                <Ionicons name="location" size={24} color="#22c55e" />
                            </View>
                            <View style={styles.taskInfo}>
                                <Text style={styles.taskLocation}>123 Main Street</Text>
                                <Text style={styles.taskDistance}>1.2 km away</Text>
                            </View>
                            <View style={styles.priorityBadge}>
                                <Text style={styles.priorityText}>High</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </MotiView>
        </View>
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
    filterButton: {
        padding: 8,
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6b7280',
        marginTop: 16,
    },
    mapSubtext: {
        fontSize: 14,
        color: '#9ca3af',
        marginTop: 8,
    },
    // GPS button styles
    locationButton: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    locationButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#111827',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#d1d5db',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    sheetTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    tasksList: {
        gap: 12,
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 20,
        padding: 16,
    },
    taskIcon: {
        backgroundColor: '#dcfce7',
        borderRadius: 20,
        padding: 12,
        marginRight: 12,
    },
    taskInfo: {
        flex: 1,
    },
    taskLocation: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    taskDistance: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
    priorityBadge: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    priorityText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ef4444',
    },
});
