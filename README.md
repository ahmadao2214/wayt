# Wayt - Simple Task Management

A clean, simple task management app built with Expo Router and React Native.

## Features

- ✅ Add tasks with priority levels (low, medium, high)
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Clean, modern UI without external UI libraries
- ✅ Built with Expo Router for seamless navigation

## Tech Stack

- **Expo Router** - File-based routing
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety
- **React Context** - State management (no external libraries)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - `npm run ios` - iOS simulator
   - `npm run android` - Android emulator
   - `npm run web` - Web browser

## Project Structure

```
wayt/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   └── index.tsx      # Main tasks page
│   └── _layout.tsx        # Root layout with TaskProvider
├── components/            # Reusable components
│   ├── AddTask.tsx        # Task creation form
│   ├── TaskItem.tsx       # Individual task display
│   └── TaskList.tsx       # Task list container
├── stores/               # State management
│   └── taskStore.tsx     # Task context and hooks
└── types/                # TypeScript definitions
    └── task.ts           # Task interface
```

## State Management

The app uses React Context for state management, keeping it simple and lightweight:

- `TaskProvider` - Wraps the app and provides task state
- `useTaskStore` - Hook to access task operations
- Tasks are stored in memory (can be extended with AsyncStorage later)

## Future Enhancements

- [ ] Persist tasks with AsyncStorage
- [ ] Add due dates to tasks
- [ ] Task categories/tags
- [ ] Search and filter tasks
- [ ] Dark mode support
- [ ] Calendar view
