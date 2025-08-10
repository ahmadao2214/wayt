export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  order: number;
  timeSlot?: number; // Time in minutes
}
