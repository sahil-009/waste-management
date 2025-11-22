import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom + 12 }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabButton}
                    >
                        <MotiView
                            animate={{
                                scale: isFocused ? 1.1 : 1,
                            }}
                            transition={{
                                type: 'spring',
                                damping: 15,
                            }}
                        >
                            {options.tabBarIcon?.({
                                focused: isFocused,
                                color: isFocused ? '#22c55e' : '#9ca3af',
                                size: 24,
                            })}
                        </MotiView>

                        {isFocused && (
                            <MotiView
                                from={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    type: 'spring',
                                    damping: 12,
                                }}
                                style={styles.indicator}
                            />
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    indicator: {
        position: 'absolute',
        bottom: -4,
        width: 6,
        height: 6,
        backgroundColor: '#22c55e',
        borderRadius: 3,
    },
});
