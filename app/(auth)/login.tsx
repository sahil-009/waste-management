import Button from '@/components/ui/Button';
import { createSession, getCurrentUser, signUp } from '@/lib/appwrite';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ role?: string }>();
    const role = (params.role as 'resident' | 'worker') || 'resident';

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                // Login - just create session
                try {
                    await createSession(email, password);
                } catch (sessionError: any) {
                    // If session already exists, ignore and continue
                    if (!sessionError.message?.includes('session is active')) {
                        throw sessionError;
                    }
                }

                const user = await getCurrentUser();

                // Navigate based on role
                if (user && 'profile' in user && user.profile) {
                    const userRole = user.profile.role;
                    router.replace(userRole === 'resident' ? '/(resident)/dashboard' : '/(worker)/dashboard');
                } else {
                    // No profile, use selected role
                    router.replace(role === 'resident' ? '/(resident)/dashboard' : '/(worker)/dashboard');
                }
            } else {
                // Signup
                await signUp(email, password, name, role);

                // Navigate based on selected role
                router.replace(role === 'resident' ? '/(resident)/dashboard' : '/(worker)/dashboard');
            }
        } catch (error: any) {
            console.error('Auth error:', error);
            Alert.alert('Error', error.message || 'Authentication failed');
        } finally {
            setLoading(false);
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
                    <Text style={styles.title}>Welcome Back! 👋</Text>
                    <Text style={styles.subtitle}>
                        {isLogin ? 'Sign in to continue' : 'Create your account'}
                    </Text>
                </MotiView>

                {/* Toggle Pill */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.toggleContainer}
                >
                    <Pressable onPress={() => setIsLogin(true)} style={styles.toggleButton}>
                        <MotiView
                            animate={{
                                backgroundColor: isLogin ? '#22c55e' : '#ffffff',
                            }}
                            transition={{ type: 'timing', duration: 200 }}
                            style={styles.togglePill}
                        >
                            <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                                Login
                            </Text>
                        </MotiView>
                    </Pressable>

                    <Pressable onPress={() => setIsLogin(false)} style={styles.toggleButton}>
                        <MotiView
                            animate={{
                                backgroundColor: !isLogin ? '#22c55e' : '#ffffff',
                            }}
                            transition={{ type: 'timing', duration: 200 }}
                            style={styles.togglePill}
                        >
                            <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                                Sign Up
                            </Text>
                        </MotiView>
                    </Pressable>
                </MotiView>

                {/* Form */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 400 }}
                >
                    {!isLogin && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="person-outline" size={20} color="#9ca3af" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your name"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor="#9ca3af"
                                />
                            </View>
                        </View>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>

                    {isLogin && (
                        <Pressable style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </Pressable>
                    )}

                    <Button
                        title={loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                        onPress={handleSubmit}
                        variant="primary"
                        style={styles.submitButton}
                        disabled={loading}
                    />
                </MotiView>

                {/* Divider */}
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 600 }}
                    style={styles.divider}
                >
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                </MotiView>

                {/* Social Buttons */}
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 600, delay: 700 }}
                    style={styles.socialButtons}
                >
                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-google" size={24} color="#DB4437" />
                        <Text style={styles.socialButtonText}>Google</Text>
                    </Pressable>

                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </Pressable>
                </MotiView>

                {/* Terms */}
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'timing', duration: 600, delay: 850 }}
                    style={styles.terms}
                >
                    <Text style={styles.termsText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
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
        fontSize: 36,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
    },
    toggleContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 40,
        padding: 6,
        flexDirection: 'row',
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    toggleButton: {
        flex: 1,
    },
    togglePill: {
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    toggleText: {
        fontWeight: '600',
        color: '#6b7280',
    },
    toggleTextActive: {
        color: '#ffffff',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: '#374151',
        fontWeight: '500',
        marginBottom: 8,
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#111827',
    },
    forgotPassword: {
        marginBottom: 24,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#22c55e',
        fontSize: 14,
    },
    submitButton: {
        marginBottom: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#d1d5db',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#6b7280',
        fontSize: 14,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    socialButton: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 24,
        paddingVertical: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    socialButtonText: {
        marginLeft: 8,
        fontWeight: '500',
        color: '#374151',
    },
    terms: {
        alignItems: 'center',
    },
    termsText: {
        color: '#6b7280',
        fontSize: 12,
        textAlign: 'center',
    },
    termsLink: {
        color: '#22c55e',
    },
});
