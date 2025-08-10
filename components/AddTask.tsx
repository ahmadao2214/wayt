import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Themed';
import { useTaskStore } from '@/stores/taskStore';
import { Ionicons } from '@expo/vector-icons';

export function AddTask() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('15');
  const addTask = useTaskStore((s) => s.addTask);
  const titleRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title.trim(), undefined, parseInt(duration) || 15);
    setTitle('');
    setDuration('15');
    setTimeout(() => titleRef.current?.focus(), 50);
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(12, insets.bottom || 0) }] }>
      <View style={styles.inputContainer}>
        <TextInput
          ref={titleRef}
          style={styles.titleInput}
          placeholder="Add a new task..."
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TextInput
          style={styles.durationInput}
          placeholder="15"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          maxLength={3}
          returnKeyType="done"
        />
        <Text style={styles.minText}>min</Text>
        <TouchableOpacity
          style={[styles.addButton, !title.trim() && styles.disabledButton]}
          onPress={handleAdd}
          disabled={!title.trim()}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  titleInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  durationInput: {
    width: 50,
    height: 44,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 16,
    textAlign: 'center',
    marginRight: 4,
    backgroundColor: '#fff',
  },
  minText: { fontSize: 14, color: '#666', marginRight: 12 },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: '#007AFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#ccc' },
});

export default AddTask;
