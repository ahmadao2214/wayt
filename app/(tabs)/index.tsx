import { StyleSheet, View } from 'react-native';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header removed as requested */}
        <AddTask />
        <TaskList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
  },
});
