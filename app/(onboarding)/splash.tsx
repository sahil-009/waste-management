import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Logo/Icon with neumorphic effect */}
            <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: 'spring',
                    damping: 12,
                    delay: 200,
                }}
                style={styles.logoContainer}
            >
                <LinearGradient
                    colors={['#4ade80', '#22c55e']}
                    style={styles.logoGradient}
                >
                    <Text style={styles.logoEmoji}>♻️</Text>
                </LinearGradient>
            </MotiView>

            {/* Welcome Text */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    type: 'timing',
                    duration: 600,
                    delay: 400,
                }}
                style={styles.textContainer}
            >
                <Text style={styles.title}>Smart Waste</Text>
                <Text style={[styles.title, styles.titleGreen]}>Management</Text>
                <Text style={styles.subtitle}>
                    Making our cities cleaner, one report at a time
                </Text>
            </MotiView>

            {/* Get Started Button */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    type: 'timing',
                    duration: 600,
                    delay: 600,
                }}
                style={styles.buttonContainer}
            >
                <Pressable
                    style={styles.button}
                    onPress={() => router.push('/(onboarding)/role')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </Pressable>
            </MotiView>

            {/* Bottom decoration */}
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    type: 'timing',
                    duration: 800,
                    delay: 800,
                }}
                style={styles.bottomText}
            >
                <Text style={styles.footerText}>Clean Environment, Better Future</Text>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0fdf9',
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 40,
        padding: 32,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 8,
    },
    logoGradient: {
        width: 128,
        height: 128,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoEmoji: {
        fontSize: 60,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    titleGreen: {
        color: '#22c55e',
        marginBottom: 16,
    },
    subtitle: {
        color: '#6b7280',
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 32,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 32,
    },
    button: {
        backgroundColor: '#22c55e',
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    bottomText: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        color: '#9ca3af',
        fontSize: 14,
    },
});
