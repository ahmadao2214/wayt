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
  const [version, setVersion] = React.useState(0);
  const sortedTasks = React.useMemo(() => [...tasks].sort((a, b) => a.order - b.order), [tasks, version]);

  const handleMove = (from: number, to: number) => {
    if (from === to) return;
    const newTasks = [...sortedTasks];
    const [movedTask] = newTasks.splice(from, 1);
    newTasks.splice(to, 0, movedTask);
    const reordered = newTasks.map((t, i) => ({ ...t, order: i, updatedAt: new Date() }));
    reorderTasks(reordered);
  };

  React.useEffect(() => {
    // Force a render tick on native after tasks change to avoid rare layout delays
    setVersion((v) => v + 1);
  }, [tasks.length]);

  const isEmpty = sortedTasks.length === 0;

  return (
    <View style={styles.list}>
      {isEmpty ? (
        <View style={styles.empty} />
      ) : (
        <PlatformSortable
          items={sortedTasks}
          itemHeight={60}
          onMove={handleMove}
          renderItem={(item: any) => <TaskItem task={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, width: '100%' },
  empty: { flex: 1 },
});

export default TaskList;
