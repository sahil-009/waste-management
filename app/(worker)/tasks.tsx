import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Task {
    id: string;
    location: string;
    status: 'assigned' | 'in-progress' | 'completed';
    date: string;
    priority: 'high' | 'medium' | 'low';
    distance: string;
}

export default function TasksScreen() {
    const tasks: Task[] = [
        {
            id: '1',
            location: '123 Main Street, Downtown',
            status: 'assigned',
            date: 'Nov 21, 2025',
            priority: 'high',
            distance: '1.2 km',
        },
        {
            id: '2',
            location: '456 Park Avenue, Uptown',
            status: 'in-progress',
            date: 'Nov 21, 2025',
            priority: 'medium',
            distance: '2.5 km',
        },
        {
            id: '3',
            location: '789 Oak Road, Suburb',
            status: 'assigned',
            date: 'Nov 21, 2025',
            priority: 'low',
            distance: '3.8 km',
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#ef4444';
            case 'medium':
                return '#fbbf24';
            case 'low':
                return '#3b82f6';
            default:
                return '#9ca3af';
        }
    };

    const handleCompleteTask = (taskId: string) => {
        Alert.alert('Complete Task', 'Mark this task as completed?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Complete', onPress: () => Alert.alert('Success', 'Task marked as completed!') },
        ]);
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
                    <Text style={styles.title}>My Tasks</Text>
                    <Text style={styles.subtitle}>
                        {tasks.filter((t) => t.status !== 'completed').length} tasks assigned
                    </Text>
                </MotiView>

                {/* Filter Chips */}
                <MotiView
                    from={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15, delay: 200 }}
                    style={styles.filterContainer}
                >
                    {['All', 'Assigned', 'In Progress'].map((filter, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.filterChip,
                                index === 0 ? styles.filterChipActive : styles.filterChipInactive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    index === 0 ? styles.filterTextActive : styles.filterTextInactive,
                                ]}
                            >
                                {filter}
                            </Text>
                        </Pressable>
                    ))}
                </MotiView>

                {/* Tasks List */}
                <View style={styles.tasksList}>
                    {tasks.map((task, index) => (
                        <MotiView
                            key={task.id}
                            from={{ opacity: 0, translateY: 15 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                delay: 400 + index * 150,
                                type: 'timing',
                                duration: 400,
                            }}
                        >
                            <View style={styles.taskCard}>
                                {/* Header */}
                                <View style={styles.taskHeader}>
                                    <View
                                        style={[
                                            styles.priorityBadge,
                                            { backgroundColor: `${getPriorityColor(task.priority)}20` },
                                        ]}
                                    >
                                        <Text
                                            style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}
                                        >
                                            {task.priority} Priority
                                        </Text>
                                    </View>
                                    <Text style={styles.taskId}>#{task.id}</Text>
                                </View>

                                {/* Location */}
                                <View style={styles.locationRow}>
                                    <Ionicons name="location" size={18} color="#9ca3af" />
                                    <Text style={styles.locationText}>{task.location}</Text>
                                </View>

                                {/* Details */}
                                <View style={styles.detailsRow}>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
                                        <Text style={styles.detailText}>{task.date}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Ionicons name="navigate-outline" size={14} color="#9ca3af" />
                                        <Text style={styles.detailText}>{task.distance}</Text>
                                    </View>
                                </View>

                                {/* Actions */}
                                <View style={styles.actionsRow}>
                                    <Pressable style={styles.viewDetailsButton}>
                                        <Text style={styles.viewDetailsText}>View Details</Text>
                                    </Pressable>
                                    {task.status === 'assigned' && (
                                        <Pressable
                                            onPress={() => handleCompleteTask(task.id)}
                                            style={styles.actionButton}
                                        >
                                            <Text style={styles.actionButtonText}>Start Task</Text>
                                        </Pressable>
                                    )}
                                    {task.status === 'in-progress' && (
                                        <Pressable
                                            onPress={() => handleCompleteTask(task.id)}
                                            style={styles.actionButton}
                                        >
                                            <Text style={styles.actionButtonText}>Complete</Text>
                                        </Pressable>
                                    )}
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
        color: '#6b7280',
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 24,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    filterChipActive: {
        backgroundColor: '#22c55e',
    },
    filterChipInactive: {
        backgroundColor: '#ffffff',
    },
    filterText: {
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#ffffff',
    },
    filterTextInactive: {
        color: '#374151',
    },
    tasksList: {
        gap: 16,
    },
    taskCard: {
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
    taskHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priorityBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    priorityText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    taskId: {
        color: '#9ca3af',
        fontSize: 12,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    locationText: {
        color: '#111827',
        fontWeight: '600',
        marginLeft: 8,
        flex: 1,
        fontSize: 16,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    detailText: {
        color: '#6b7280',
        fontSize: 14,
        marginLeft: 4,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    viewDetailsButton: {
        flex: 1,
        backgroundColor: '#ccfbef',
        borderRadius: 24,
        paddingVertical: 12,
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#14b8a0',
        fontWeight: '600',
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#22c55e',
        borderRadius: 24,
        paddingVertical: 12,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
});
