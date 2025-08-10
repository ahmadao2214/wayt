import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Platform, Keyboard } from 'react-native';
import { Text } from './Themed';
import { useTaskStore } from '@/stores/taskStore';
import { Ionicons } from '@expo/vector-icons';

export function AddTask() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('15');
  const addTask = useTaskStore((s) => s.addTask);
  const titleRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTask(title.trim(), undefined, parseInt(duration) || 15);
    setTitle('');
    setDuration('15');
    if (Platform.OS === 'web') {
      setTimeout(() => titleRef.current?.focus(), 50);
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <TextInput
          ref={titleRef}
          style={styles.titleInput}
          placeholder="Add a new task..."
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <View style={styles.durationGroup}>
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
        </View>
        <TouchableOpacity
          style={[styles.addButton, !title.trim() && styles.disabledButton]}
          onPress={handleAdd}
          disabled={!title.trim()}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  titleInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: 'transparent',
  },
  durationGroup: { flexDirection: 'row', alignItems: 'center', marginRight: 8 },
  durationInput: {
    width: 54,
    height: 36,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 8,
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: '#fafafa',
  },
  minText: { fontSize: 14, color: '#666', marginLeft: 6 },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: { backgroundColor: '#ccc' },
});

export default AddTask;
