import React, { useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable, Text } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { useTaskStore } from '../../stores/taskStore';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

function addMinutes(date: Date, minutes: number): Date {
  const copied = new Date(date);
  copied.setMinutes(copied.getMinutes() + minutes);
  return copied;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarScreen() {
  const { height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const tasks = useTaskStore((s) => s.tasks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const events: CalendarEvent[] = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate)
      .map((t) => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      }))
      .filter((t) => t.dueDate && isSameDay(t.dueDate, selectedDate))
      .map((t) => {
        const start = t.dueDate as Date;
        const duration = t.timeSlot ?? 15;
        const end = addMinutes(start, duration);
        return { title: t.title, start, end } as CalendarEvent;
      });
  }, [tasks, selectedDate]);

  const goToPrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const goToNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Calendar
        events={events}
        date={selectedDate}
        mode="day"
        height={height - 56}
        hourRowHeight={48}
        scrollOffsetMinutes={360}
        ampm
        swipeEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Removed custom header styles
});
