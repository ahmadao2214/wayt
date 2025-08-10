import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, dueDate?: Date, timeSlot?: number) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  reorderTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (title: string, dueDate?: Date, timeSlot?: number) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      completed: false,
      createdAt: new Date(),
      dueDate,
      timeSlot: timeSlot || 15, // Default to 15 minutes
      order: 0, // Will be set properly in the setter
    };
    console.log('Adding task with ID:', newTask.id);
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, order: state.tasks.length }]
    }));
  },

  toggleTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  },

  deleteTask: (id: string) => {
    console.log('deleteTask called with id:', id);
    set((state) => {
      console.log('Current tasks before delete:', state.tasks.length);
      console.log('Task IDs:', state.tasks.map(t => t.id));
      const newTasks = state.tasks.filter(task => task.id !== id);
      console.log('Tasks after delete:', newTasks.length);
      console.log('Remaining task IDs:', newTasks.map(t => t.id));
      return { tasks: newTasks };
    });
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  },

  reorderTasks: (tasks: Task[]) => {
    set({ tasks });
  },
}));
