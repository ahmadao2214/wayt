import { StyleSheet, View } from 'react-native';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <AddTask />
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
