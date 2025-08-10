import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from './Themed';
import Colors from '@/constants/Colors';
import { Task } from '@/types/task';
import { useTaskStore } from '@/stores/taskStore';
import { Ionicons } from '@expo/vector-icons';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const updateTask = useTaskStore((s) => s.updateTask);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDuration, setEditDuration] = useState(String(task.timeSlot ?? 15));

  const handleTitleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      updateTask(task.id, { title: editTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleDurationSave = () => {
    const duration = parseInt(editDuration) || 15;
    if (duration !== (task.timeSlot ?? 15)) {
      updateTask(task.id, { timeSlot: duration });
    }
    setIsEditingDuration(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleTask(task.id)}>
        <Ionicons
          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={task.completed ? '#4CAF50' : '#666'}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.titleContainer} onPress={() => setIsEditingTitle(true)}>
        {isEditingTitle ? (
          <TextInput
            style={styles.titleInput}
            value={editTitle}
            onChangeText={setEditTitle}
            onBlur={handleTitleSave}
            onSubmitEditing={handleTitleSave}
            autoFocus
            selectTextOnFocus
          />
        ) : (
          <Text style={[styles.title, task.completed && styles.completedText]}>{task.title}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.durationContainer} onPress={() => setIsEditingDuration(true)}>
        {isEditingDuration ? (
          <TextInput
            style={styles.durationInput}
            value={editDuration}
            onChangeText={setEditDuration}
            onBlur={handleDurationSave}
            onSubmitEditing={handleDurationSave}
            keyboardType="numeric"
            autoFocus
            selectTextOnFocus
            maxLength={3}
          />
        ) : (
          <Text style={styles.duration}>{task.timeSlot ?? 15} min</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 60,
    backgroundColor: '#fff',
  },
  checkbox: { marginRight: 12, padding: 4 },
  titleContainer: { flex: 1, paddingRight: 12, borderRadius: 6, paddingVertical: 4, paddingHorizontal: 4 },
  title: { fontSize: 18, lineHeight: 22, color: Colors.light.text, fontWeight: '600' },
  titleInput: {
    fontSize: 15,
    lineHeight: 20,
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: '#fff',
  },
  completedText: { textDecorationLine: 'line-through', color: Colors.light.textSecondary },
  durationContainer: { paddingHorizontal: 8, paddingVertical: 4, marginRight: 8, borderRadius: 6 },
  duration: { fontSize: 15, color: Colors.light.textSecondary, fontWeight: '500' },
  durationInput: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    minWidth: 40,
  },
  deleteButton: { padding: 8, borderRadius: 6 },
});

export default TaskItem;
