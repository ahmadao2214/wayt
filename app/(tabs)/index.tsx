import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useKeyboardBottomInset from '@/hooks/useKeyboardBottomInset';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';
import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  const insets = useSafeAreaInsets();
  const keyboardBottom = useKeyboardBottomInset();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.centerColumn}>
        {/* List takes all available space and manages its own scrolling */}
        <View style={styles.listArea}>
          <TaskList />
        </View>
        {/* Fixed bottom input with keyboard avoidance */}
        <View style={{ paddingBottom: Math.max(insets.bottom, keyboardBottom) }}>
          <AddTask />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  centerColumn: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  listArea: { flex: 1 },
});
