import Button from '@/components/ui/Button';
import { appwriteConfig, createReport, getCurrentUser, uploadFile } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function CreateReportScreen() {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    // ---------- GPS Handling ----------
    const handleGetLocation = async () => {
        try {
            setLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Enable location permissions to use GPS');
                return;
            }
            // Mock location for Jain University, Jayanagar, Bangalore
            const lat = 12.9254533;
            const lng = 77.5938607;

            setLatitude(lat);
            setLongitude(lng);

            // Reverse geocode for a readable address
            const addresses = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
            if (addresses.length > 0) {
                const addr = addresses[0];
                const address = [
                    addr.name,
                    addr.street,
                    addr.city,
                    addr.region,
                    addr.country,
                ]
                    .filter(Boolean)
                    .join(', ');
                setLocation(address);
                Alert.alert('Location detected', address);
            } else {
                const coordText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                setLocation(coordText);
                Alert.alert('Location detected', coordText);
            }
        } catch (error: any) {
            console.error('Location error:', error);
            Alert.alert('Error', error.message || 'Failed to get location');
        } finally {
            setLoading(false);
        }
    };

    // ---------- Photo Picker ----------
    const handleTakePhoto = async () => {
        const options = [
            {
                text: 'Take Photo',
                onPress: async () => {
                    const { status } = await ImagePicker.requestCameraPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission denied', 'Camera permission is required');
                        return;
                    }
                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        quality: 0.8,
                    });
                    if (!result.canceled && result.assets[0]) {
                        setPhotoUri(result.assets[0].uri);
                    }
                },
            },
            {
                text: 'Choose from Gallery',
                onPress: async () => {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission denied', 'Gallery permission is required');
                        return;
                    }
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        quality: 0.8,
                    });
                    if (!result.canceled && result.assets[0]) {
                        setPhotoUri(result.assets[0].uri);
                    }
                },
            },
            { text: 'Cancel', style: 'cancel' },
        ];
        Alert.alert('Add Photo', 'Choose an option', options);
    };

    // ---------- Submit Report ----------
    const handleSubmit = async () => {
        if (!location || !description) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (!photoUri) {
            Alert.alert('Error', 'Please add a photo');
            return;
        }
        if (latitude === null || longitude === null) {
            Alert.alert('Error', 'Please obtain GPS location');
            return;
        }
        try {
            setLoading(true);
            const user = await getCurrentUser();
            if (!user) {
                Alert.alert('Error', 'You must be logged in');
                router.push('/(auth)/login');
                return;
            }
            // Upload photo
            setUploadingPhoto(true);
            const uploaded = await uploadFile(photoUri, appwriteConfig.wasteBucketId);
            setUploadingPhoto(false);
            // Create report
            await createReport({
                residentId: user.$id,
                locationText: location,
                latitude,
                longitude,
                wastePhotoUrl: uploaded.$id,
            });
            Alert.alert('Success', 'Report created successfully!', [
                { text: 'OK', onPress: () => router.push('/(resident)/reports') },
            ]);
        } catch (error: any) {
            console.error('Submit error:', error);
            Alert.alert('Error', error.message || 'Failed to create report');
        } finally {
            setLoading(false);
            setUploadingPhoto(false);
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
                    <Text style={styles.title}>Create Report</Text>
                    <Text style={styles.subtitle}>Help keep your community clean</Text>
                </MotiView>

                {/* Form */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 200 }}
                >
                    {/* Photo Upload */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Waste Photo *</Text>
                        <Pressable onPress={handleTakePhoto} disabled={uploadingPhoto}>
                            <View style={styles.photoCard}>
                                {photoUri ? (
                                    <View style={styles.photoPreviewContainer}>
                                        <Image source={{ uri: photoUri }} style={styles.photoImage} />
                                        <Pressable style={styles.removePhotoButton} onPress={() => setPhotoUri(null)}>
                                            <Ionicons name="close-circle" size={32} color="#ef4444" />
                                        </Pressable>
                                    </View>
                                ) : (
                                    <View style={styles.photoPlaceholder}>
                                        {uploadingPhoto ? (
                                            <ActivityIndicator size="large" color="#14b8a0" />
                                        ) : (
                                            <>
                                                <View style={styles.cameraIconContainer}>
                                                    <Ionicons name="camera" size={40} color="#14b8a0" />
                                                </View>
                                                <Text style={styles.photoText}>Add Photo</Text>
                                                <Text style={styles.photoSubtext}>Tap to take or upload</Text>
                                            </>
                                        )}
                                    </View>
                                )}
                            </View>
                        </Pressable>
                    </View>

                    {/* Location Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Location *</Text>
                        {/* GPS Button */}
                        <Pressable onPress={handleGetLocation} disabled={loading} style={styles.gpsButton}>
                            <View style={styles.gpsButtonContent}>
                                <View style={styles.gpsIconBg}>
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#3b82f6" />
                                    ) : (
                                        <Ionicons name="navigate" size={24} color="#3b82f6" />
                                    )}
                                </View>
                                <View style={styles.gpsTextContainer}>
                                    <Text style={styles.gpsButtonTitle}>
                                        {latitude && longitude ? '✓ Location Detected' : 'Use Current Location'}
                                    </Text>
                                    <Text style={styles.gpsButtonSubtext}>
                                        {latitude && longitude
                                            ? `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                                            : 'Auto-detect via GPS'}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                            </View>
                        </Pressable>
                        {/* Divider */}
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>
                        {/* Manual Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons name="location-outline" size={20} color="#9ca3af" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter location manually"
                                value={location}
                                onChangeText={setLocation}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    {/* Description Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description *</Text>
                        <View style={[styles.inputContainer, styles.textAreaContainer]}>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe the waste issue in detail..."
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={5}
                                textAlignVertical="top"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                        <Text style={styles.helperText}>Include details like waste type, quantity, and any hazards</Text>
                    </View>

                    {/* Submit Button */}
                    <MotiView
                        from={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', damping: 15, delay: 400 }}
                    >
                        <Button
                            title={loading ? 'Submitting...' : 'Submit Report'}
                            onPress={handleSubmit}
                            variant="primary"
                            loading={loading}
                            disabled={loading}
                            style={styles.submitButton}
                        />
                    </MotiView>

                    {/* Info Card */}
                    <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 600, delay: 500 }}
                    >
                        <View style={styles.infoCard}>
                            <Ionicons name="information-circle" size={20} color="#3b82f6" />
                            <Text style={styles.infoText}>
                                Your report will be reviewed and assigned to a worker within 24 hours
                            </Text>
                        </View>
                    </MotiView>
                </MotiView>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0fdf9' },
    content: { paddingHorizontal: 24, paddingTop: 64, paddingBottom: 32 },
    header: { marginBottom: 32 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#6b7280' },
    section: { marginBottom: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 12 },
    photoCard: { backgroundColor: '#ffffff', borderRadius: 24, overflow: 'hidden', borderWidth: 2, borderColor: '#e5e7eb', borderStyle: 'dashed' },
    photoPreviewContainer: { position: 'relative' },
    photoImage: { width: '100%', height: 200, resizeMode: 'cover' },
    removePhotoButton: { position: 'absolute', top: 12, right: 12, backgroundColor: '#ffffff', borderRadius: 16 },
    photoPlaceholder: { alignItems: 'center', paddingVertical: 48 },
    cameraIconContainer: { backgroundColor: '#ccfbef', borderRadius: 40, padding: 20, marginBottom: 16 },
    photoText: { color: '#111827', fontWeight: '600', fontSize: 16, marginBottom: 4 },
    photoSubtext: { color: '#9ca3af', fontSize: 14 },
    gpsButton: { backgroundColor: '#ffffff', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    gpsButtonContent: { flexDirection: 'row', alignItems: 'center' },
    gpsIconBg: { backgroundColor: '#dbeafe', borderRadius: 24, padding: 12, marginRight: 16, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
    gpsTextContainer: { flex: 1 },
    gpsButtonTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
    gpsButtonSubtext: { fontSize: 14, color: '#6b7280', marginTop: 2 },
    divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
    dividerText: { marginHorizontal: 16, color: '#9ca3af', fontSize: 14 },
    inputContainer: { backgroundColor: '#ffffff', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#e5e7eb', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    textAreaContainer: { alignItems: 'flex-start', paddingVertical: 16 },
    input: { flex: 1, marginLeft: 12, fontSize: 16, color: '#111827' },
    textArea: { marginLeft: 0, height: 120 },
    helperText: { fontSize: 12, color: '#9ca3af', marginTop: 8, marginLeft: 4 },
    submitButton: { marginBottom: 16 },
    infoCard: { backgroundColor: '#dbeafe', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'flex-start' },
    infoText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#1e40af', lineHeight: 20 },
});
