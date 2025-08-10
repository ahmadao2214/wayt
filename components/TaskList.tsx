import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { TaskItem } from './TaskItem';
import { useTaskStore } from '../stores/taskStore';

export const TaskList: React.FC = () => {
  const { tasks } = useTaskStore();

  const renderTask = ({ item }: { item: any }) => (
    <TaskItem task={item} />
  );

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tasks yet!</Text>
        <Text style={styles.emptySubtext}>Add a task to get started</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderTask}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
