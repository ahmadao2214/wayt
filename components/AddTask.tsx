import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTaskStore } from '../stores/taskStore';
import Colors from '../constants/Colors';

export const AddTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('15');
  const { addTask } = useTaskStore();
  const inputRef = useRef<TextInput>(null);

  const handleAddTask = () => {
    if (title.trim()) {
      const timeSlotMinutes = parseInt(timeSlot) || 15;
      addTask(title.trim(), undefined, timeSlotMinutes);
      setTitle('');
      setTimeSlot('15');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          style={styles.taskInput}
          placeholder="Add a task..."
          placeholderTextColor={Colors.light.textTertiary}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
          blurOnSubmit={false}
        />
        
        <View style={styles.timeInputWrapper}>
          <TextInput
            style={styles.timeInput}
            placeholder="15"
            placeholderTextColor={Colors.light.textTertiary}
            value={timeSlot}
            onChangeText={setTimeSlot}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity 
          style={[styles.addButton, !title.trim() && styles.addButtonDisabled]} 
          onPress={handleAddTask}
          disabled={!title.trim()}
          activeOpacity={0.7}
        >
          <Text style={[styles.addButtonText, !title.trim() && styles.addButtonTextDisabled]}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.surface,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },
  timeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 50,
  },
  timeInput: {
    fontSize: 14,
    color: Colors.light.text,
    padding: 0,
    marginRight: 2,
    minWidth: 25,
  },
  timeUnit: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
  },
  addButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  addButtonText: {
    color: Colors.light.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonTextDisabled: {
    color: Colors.light.textTertiary,
  },
});
