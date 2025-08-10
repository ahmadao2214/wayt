import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useTaskStore } from '@/stores/taskStore';
import TaskItem from './TaskItem';
// Resolve platform DnD implementation at runtime
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PlatformSortable: any = Platform.OS === 'web'
  ? require('./dnd/PlatformSortable.web').default
  : require('./dnd/PlatformSortable.native').default;

export function TaskList() {
  const { tasks, reorderTasks } = useTaskStore();
  const sortedTasks = React.useMemo(() => [...tasks].sort((a, b) => a.order - b.order), [tasks]);

  const handleMove = (from: number, to: number) => {
    if (from === to) return;
    const newTasks = [...sortedTasks];
    const [movedTask] = newTasks.splice(from, 1);
    newTasks.splice(to, 0, movedTask);
    const reordered = newTasks.map((t, i) => ({ ...t, order: i, updatedAt: new Date() }));
    reorderTasks(reordered);
  };

  if (sortedTasks.length === 0) {
    return <View style={styles.empty} />;
  }

  return (
    <View style={styles.list}>
      <PlatformSortable
        items={sortedTasks}
        itemHeight={60}
        onMove={handleMove}
        renderItem={(item: any) => <TaskItem task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, width: '100%' },
  empty: { flex: 1 },
});

export default TaskList;
