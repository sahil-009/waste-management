import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    onPress?: () => void;
    animated?: boolean;
    delay?: number;
    style?: any;
}

export default function Card({
    children,
    onPress,
    animated = true,
    delay = 0,
    style,
}: CardProps) {
    const cardContent = (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );

    if (!animated) {
        return onPress ? (
            <Pressable onPress={onPress}>{cardContent}</Pressable>
        ) : (
            cardContent
        );
    }

    return (
        <MotiView
            from={{ opacity: 0, translateY: 15 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                delay,
                type: 'timing',
                duration: 400,
            }}
        >
            {onPress ? (
                <Pressable onPress={onPress}>
                    <MotiView
                        animate={({ pressed }: any) => ({
                            scale: pressed ? 0.98 : 1,
                        })}
                        transition={{
                            type: 'timing',
                            duration: 100,
                        }}
                    >
                        {cardContent}
                    </MotiView>
                </Pressable>
            ) : (
                cardContent
            )}
        </MotiView>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
    },
});
