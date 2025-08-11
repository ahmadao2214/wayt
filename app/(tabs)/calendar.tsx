import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, Pressable, Text, Animated, Platform, ScrollView } from 'react-native';
import { Calendar } from 'react-native-big-calendar';
import { useTaskStore } from '../../stores/taskStore';
import { useColorScheme } from '../../components/useColorScheme';
import Colors from '../../constants/Colors';
import TaskList from '../../components/TaskList';
import BottomSheet from '../../components/BottomSheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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
  const { height, width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const calendarMaxWidth = 900;

  const tasks = useTaskStore((s) => s.tasks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [panelOpen, setPanelOpen] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const panelWidth = Math.min(360, Math.max(280, Math.floor((isWeb ? 0.3 : 0.85) * width)));
  const hiddenX = -(panelWidth + 40);
  const slideX = useRef(new Animated.Value(isWeb ? hiddenX : panelWidth)).current;
  const openProgress = useRef(new Animated.Value(0)).current; // 0: dock closed, 1: open (web)

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
    <View style={[styles.container, { backgroundColor: theme.background, paddingTop: insets.top }]}>
      {!panelOpen && (
        <Pressable
          onPress={() => {
            if (isWeb) {
              setPanelOpen(true);
              Animated.parallel([
                Animated.timing(slideX, { toValue: 0, duration: 260, useNativeDriver: true }),
                Animated.timing(openProgress, { toValue: 1, duration: 260, useNativeDriver: false }),
              ]).start();
            } else {
              setSheetOpen(true);
            }
          }}
          style={[
            styles.toggleButton,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              top: insets.top + 8,
              left: isWeb ? 12 : undefined,
              right: isWeb ? undefined : 12,
            },
          ]}
        >
          <Text style={[styles.toggleButtonText, { color: theme.primary }]}>Tasks</Text>
        </Pressable>
      )}

      {panelOpen && !isWeb && (
        <Pressable
          accessibilityLabel="Close tasks panel"
          onPress={() => {
            Animated.timing(slideX, { toValue: isWeb ? hiddenX : panelWidth, duration: 220, useNativeDriver: true }).start(() =>
              setPanelOpen(false)
            );
          }}
          style={[styles.backdrop, { top: insets.top, bottom: insets.bottom }]}
        />
      )}

      <Animated.View
        style={[
          styles.calendarOuter,
          isWeb && {
            paddingRight: 16,
          },
        ]}
      >
        {(() => {
          const marginLeft = isWeb
            ? openProgress.interpolate({ inputRange: [0, 1], outputRange: [16, panelWidth + 16] })
            : 0;
          const closedWidth = Math.max(320, width - 32);
          const openWidth = Math.max(320, Math.min(calendarMaxWidth, width - panelWidth - 32));
          const animatedWidth = isWeb
            ? openProgress.interpolate({ inputRange: [0, 1], outputRange: [closedWidth, openWidth] })
            : (width as unknown as number);
          return (
            <Animated.View style={{ width: isWeb ? (animatedWidth as unknown as number) : '100%', alignSelf: 'flex-start', marginLeft: isWeb ? (marginLeft as unknown as number) : 0 }}>
              {/* Mask the tiny top segment of the time-gutter divider */}
              {isWeb && (
                <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 64, height: 24, width: 2, backgroundColor: theme.background, zIndex: 2 }} />
              )}
              <Calendar
                events={events}
                date={selectedDate}
                mode="day"
                height={height - insets.top - insets.bottom}
                hourRowHeight={48}
                scrollOffsetMinutes={360}
                ampm
                hourStyle={{ borderRightWidth: 0, borderRightColor: 'transparent' }}
                onLongPressCell={() => setSheetOpen(true)}
                swipeEnabled={false}
              />
            </Animated.View>
          );
        })()}
      </Animated.View>

      {/* Side Panel (Web/Desktop) */}
      <Animated.View
        pointerEvents={panelOpen ? 'auto' : 'none'}
        style={[
          styles.sidePanel,
          {
            width: panelWidth,
            backgroundColor: theme.background,
            borderRightColor: theme.border,
            transform: [{ translateX: slideX }],
            top: insets.top,
            bottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.panelHeader}>
          <Pressable
            accessibilityLabel="Close tasks panel"
            hitSlop={8}
            onPress={() => {
              Animated.parallel([
                Animated.timing(slideX, { toValue: isWeb ? hiddenX : panelWidth, duration: 260, useNativeDriver: true }),
                Animated.timing(openProgress, { toValue: 0, duration: 260, useNativeDriver: false }),
              ]).start(() => setPanelOpen(false));
            }}
          >
            <Ionicons name="close" size={20} color={theme.primary} />
          </Pressable>
          <Text style={[styles.panelTitle, { color: theme.text }]}>Tasks</Text>
        </View>
        <View style={styles.panelBody}>
          <TaskList />
        </View>
      </Animated.View>

      {/* Bottom Sheet (Mobile) */}
      {Platform.OS !== 'web' && (
        <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
          <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 8, color: theme.text }}>Tasks</Text>
          </View>
          <View style={{ maxHeight: Math.min(420, tasks.length * 60 + 24) }}>
            <TaskList />
          </View>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    top: 12,
    zIndex: 5,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.08)',
    zIndex: 4,
  },
  sidePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 6,
    borderRightWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 4 },
    elevation: 2,
  },
  calendarFrame: {
    flex: 1,
  },
  calendarOuter: {
    flex: 1,
    width: '100%',
  },
  panelHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  closeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  panelBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  // Removed custom header styles
});
