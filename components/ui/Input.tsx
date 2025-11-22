import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface InputProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export default function Input({
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    label,
    error,
    icon,
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="mb-4">
            {label && <Text className="text-gray-700 font-medium mb-2">{label}</Text>}
            <MotiView
                animate={{
                    borderColor: isFocused ? '#22c55e' : error ? '#ef4444' : '#e5e7eb',
                    scale: isFocused ? 1.01 : 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 200,
                }}
                className="bg-white rounded-3xl px-5 py-4 flex-row items-center border-2"
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                    elevation: 3,
                }}
            >
                {icon && <View className="mr-3">{icon}</View>}
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="flex-1 text-gray-900 text-base"
                    placeholderTextColor="#9ca3af"
                />
            </MotiView>
            {error && <Text className="text-red-500 text-sm mt-1 ml-2">{error}</Text>}
        </View>
    );
}
