# Drag and Drop Functionality

## Overview
The task list now supports drag and drop reordering on web platforms. Users can drag tasks to reorder them in the list.

## Features

### Visual Feedback
- **Drag Handle**: A subtle "⋮⋮" icon appears on the left side of each task item on web
- **Drag Over State**: When dragging over a task, it gets highlighted with a blue border and slight scale effect
- **Dragging State**: The item being dragged becomes semi-transparent and slightly rotated
- **Hint Message**: A helpful hint appears when there are multiple tasks: "💡 Drag tasks to reorder them"

### How It Works
1. **Drag Start**: Click and hold on any task item to start dragging
2. **Drag Over**: As you drag over other tasks, they highlight to show where the item will be dropped
3. **Drop**: Release the mouse button to drop the task in its new position
4. **Reorder**: The task list automatically reorders and updates the task order in the store

### Technical Implementation
- Uses HTML5 Drag and Drop API for web compatibility
- React Native Platform.select() to ensure web-only functionality
- Zustand store integration with `reorderTasks` function
- Visual feedback through CSS transforms and opacity changes
- Proper TypeScript typing for all drag event handlers

### Browser Compatibility
- Works on all modern browsers that support HTML5 Drag and Drop
- Gracefully degrades on mobile platforms (no drag functionality)
- Maintains all existing task functionality (edit, delete, toggle)

## Usage
1. Open the app in a web browser
2. Add multiple tasks using the "Add Task" input
3. Click and drag any task to reorder it
4. The task order is automatically saved and persisted

## Code Structure
- `TaskItem.tsx`: Handles individual task drag events and visual states
- `TaskList.tsx`: Manages drag state and reordering logic
- `taskStore.tsx`: Provides `reorderTasks` function for state updates
