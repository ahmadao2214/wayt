import { StyleSheet, View } from 'react-native';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';
import { Header } from '@/components/Header';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
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
    width: '100%',
    maxWidth: 600,
  },
});
