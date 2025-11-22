import TabBar from '@/components/ui/TabBar';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function ResidentLayout() {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create-report"
                options={{
                    title: 'Report',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
