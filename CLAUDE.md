# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

wayt is a visual time allocation app built with Expo, React Native, and TypeScript. It allows users to drag tasks onto a calendar to visualize their day realistically.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Platform-specific development
npx expo start --ios      # iOS Simulator
npx expo start --android  # Android Emulator  
npx expo start --web      # Web Browser

# Run tests
npm run test        # Vitest unit tests
npm run test:e2e    # Playwright E2E tests (post-MVP)

# Build for production
npx expo export --platform web  # Web deployment
npx expo run:ios                 # iOS build
npx expo run:android             # Android build
```

## Architecture

The app follows a cross-platform architecture using Expo Router and platform-specific implementations:

### Core Technologies
- **Framework**: Expo SDK 51+ with Expo Router v3
- **State Management**: Zustand store handles all CRUD operations and business logic
- **UI Components**: Tamagui for React Native components
- **Calendar**: React Native Big Calendar (mobile), React Big Calendar (web)
- **Drag & Drop**: Expo Drag and Drop (React Native), @dnd-kit (Web)
- **Code Quality**: Biome for linting and formatting
- **Testing**: Vitest (unit), React Testing Library (components)

### Key Architectural Decisions

1. **Platform-Specific Code**: Use `Platform.select()` or conditional imports in hooks like `useDragAndDrop.ts` to handle platform differences.

2. **State Management**: All business logic lives in Zustand store (`src/stores/timeStore.ts`) with CRUD operations for:
   - Buckets (task categories)
   - Tasks (unscheduled items)
   - ScheduledTasks (calendar entries)

3. **Calendar Integration**: Abstract calendar libraries behind a common component interface (`CalendarGrid.tsx`) that renders platform-appropriate calendar.

4. **Drag & Drop**: Platform-specific implementations wrapped in a common hook interface for consistent API.

### Data Flow
1. User creates buckets and tasks via UI
2. Zustand store manages all state and CRUD operations
3. Tasks are dragged from buckets to calendar slots
4. ScheduledTasks are created with conflict checking
5. Calendar components display scheduled tasks with bucket colors

## Critical Implementation Notes

- **CRUD First**: Ensure all CRUD operations work perfectly before adding features
- **Offline-First**: App should work without network connectivity
- **Time Conflicts**: Prevent overlapping tasks with visual indicators
- **15-Minute Grid**: All time operations snap to 15-minute increments
- **Haptic Feedback**: Use expo-haptics for all interactions on mobile
- **Default Duration**: Tasks default to 30 minutes unless specified

## Testing Requirements

All CRUD operations must have test coverage:
- Bucket creation, update, deletion
- Task creation, update, deletion  
- Schedule operations and conflict detection
- Cross-platform drag and drop behavior

## MVP Focus

Ship these features first:
1. Complete CRUD for buckets and tasks
2. Drag and drop between task list and calendar
3. Single day view (today) from 6 AM - 10 PM
4. Visual conflict resolution
5. Mobile drawer / desktop split view layouts