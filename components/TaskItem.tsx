import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Task } from '../types/task';
import { useTaskStore } from '../stores/taskStore';
import Colors from '../constants/Colors';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask, updateTask } = useTaskStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editTime, setEditTime] = useState(task.timeSlot?.toString() || '15');
  const titleInputRef = useRef<TextInput>(null);
  const timeInputRef = useRef<TextInput>(null);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.focus(), 100);
  };

  const handleTitleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, { title: editTitle.trim() });
      setIsEditingTitle(false);
    } else {
      setEditTitle(task.title);
      setIsEditingTitle(false);
    }
  };

  const handleTimeEdit = () => {
    setIsEditingTime(true);
    setTimeout(() => timeInputRef.current?.focus(), 100);
  };

  const handleTimeSave = () => {
    const timeValue = parseInt(editTime) || 15;
    updateTask(task.id, { timeSlot: timeValue });
    setIsEditingTime(false);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <TouchableOpacity 
        style={styles.taskContent} 
        onPress={() => toggleTask(task.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checked]}>
          {task.completed && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          {isEditingTitle ? (
            <TextInput
              ref={titleInputRef}
              style={[styles.title, styles.editInput]}
              value={editTitle}
              onChangeText={setEditTitle}
              onBlur={handleTitleSave}
              onSubmitEditing={handleTitleSave}
              returnKeyType="done"
              autoFocus
              placeholderTextColor={Colors.light.textTertiary}
            />
          ) : (
            <TouchableOpacity onPress={handleTitleEdit} style={styles.titleContainer}>
              <Text style={[styles.title, task.completed && styles.completedText]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.metadata}>
            {isEditingTime ? (
              <TextInput
                ref={timeInputRef}
                style={[styles.timeSlot, styles.editInput]}
                value={editTime}
                onChangeText={setEditTime}
                onBlur={handleTimeSave}
                onSubmitEditing={handleTimeSave}
                returnKeyType="done"
                keyboardType="numeric"
                autoFocus
                placeholderTextColor={Colors.light.textTertiary}
              />
            ) : (
              <TouchableOpacity onPress={handleTimeEdit} style={styles.timeContainer}>
                <View style={styles.timeBadge}>
                  <Text style={styles.timeSlot}>⏱️ {formatTime(task.timeSlot || 15)}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDelete}
        activeOpacity={0.6}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.light.surface,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    ...Platform.select({
      web: {
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-1px)',
          shadowOpacity: 0.12,
        },
      },
    }),
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: Colors.light.background,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.border,
    marginRight: 12,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.surface,
  },
  checked: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  checkmarkContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: Colors.light.surface,
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.light.text,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.light.textTertiary,
  },
  editInput: {
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Colors.light.surface,
    fontSize: 16,
    color: Colors.light.text,
  },
  titleContainer: {
    flex: 1,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  timeContainer: {
    marginLeft: 0,
  },
  timeBadge: {
    backgroundColor: Colors.light.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.accent + '30',
  },
  timeSlot: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.error + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Colors.light.error + '20',
  },
  deleteText: {
    color: Colors.light.error,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
