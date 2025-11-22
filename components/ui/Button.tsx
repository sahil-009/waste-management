import { MotiView } from 'moti';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    style?: any;
}

export default function Button({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
}: ButtonProps) {
    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryButton;
            case 'secondary':
                return styles.secondaryButton;
            case 'outline':
                return styles.outlineButton;
            default:
                return styles.primaryButton;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'primary':
                return styles.primaryText;
            case 'secondary':
                return styles.secondaryText;
            case 'outline':
                return styles.outlineText;
            default:
                return styles.primaryText;
        }
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={disabled ? styles.disabled : null}
        >
            {({ pressed }) => (
                <MotiView
                    animate={{
                        scale: pressed ? 0.95 : 1,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 100,
                    }}
                    style={[styles.baseButton, getButtonStyle(), style]}
                >
                    {loading ? (
                        <ActivityIndicator color={variant === 'outline' ? '#22c55e' : '#fff'} />
                    ) : (
                        <Text style={getTextStyle()}>{title}</Text>
                    )}
                </MotiView>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    baseButton: {
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: '#22c55e',
    },
    secondaryButton: {
        backgroundColor: '#14b8a0',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#22c55e',
    },
    primaryText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    secondaryText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
    outlineText: {
        color: '#22c55e',
        fontWeight: '600',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.5,
    },
});
