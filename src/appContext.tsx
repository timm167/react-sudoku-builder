import React, { createContext, useContext, useState, useRef, ReactNode, RefObject, MutableRefObject } from 'react';
import initialState from './app-utils/initialState';
import { createStateSetters } from './app-utils/stateSetters';
import { createGridSetters } from './app-utils/gridSetters';
import { initializeGrid } from "./components/utils/Grid";

// Initialize the grid
let initialGrid = initializeGrid();

// Define the types for context value
interface AppContextType {
  state: typeof initialState;
  stateSetters: ReturnType<typeof createStateSetters>;
  grid: typeof initialGrid;
  gridSetters: ReturnType<typeof createGridSetters>;
  buttonInputRefs: {
    undoButton: RefObject<HTMLButtonElement>;
    redoButton: RefObject<HTMLButtonElement>;
    killerButton: RefObject<HTMLButtonElement>;
    checkButton: RefObject<HTMLButtonElement>;
    solveButton: RefObject<HTMLButtonElement>;
    deleteBoxButton: RefObject<HTMLButtonElement>;
  };
  gridInputRefs: MutableRefObject<RefObject<HTMLInputElement>[][]>;  
}

// Default context value
const defaultContext: AppContextType = {
  state: initialState,
  stateSetters: {} as ReturnType<typeof createStateSetters>,
  grid: initialGrid,
  gridSetters: {} as ReturnType<typeof createGridSetters>,
  buttonInputRefs: {
    undoButton: { current: null },
    redoButton: { current: null },
    killerButton: { current: null },
    checkButton: { current: null },
    solveButton: { current: null },
    deleteBoxButton: { current: null },
  },
  gridInputRefs: { current: Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => React.createRef<HTMLInputElement>())
  ) },
};

// Create the context with the defined types
const AppContext = createContext<AppContextType>(defaultContext);

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [grid, setGrid] = useState<typeof initialGrid>(initialGrid);
  const [state, setState] = useState<typeof initialState>(initialState);

  // Setters
  const stateSetters = createStateSetters(setState);
  const gridSetters = createGridSetters(setGrid, state, stateSetters);

  const buttonInputRefs = {
    undoButton: useRef<HTMLButtonElement>(null),
    redoButton: useRef<HTMLButtonElement>(null),
    killerButton: useRef<HTMLButtonElement>(null),
    checkButton: useRef<HTMLButtonElement>(null),
    solveButton: useRef<HTMLButtonElement>(null),
    deleteBoxButton: useRef<HTMLButtonElement>(null),
  };

  const gridInputRefs = useRef(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => React.createRef<HTMLInputElement>())
    )
  );  // MutableRefObject for the grid input refs

  const value = {
    grid,
    state,
    stateSetters,
    gridSetters,
    buttonInputRefs,
    gridInputRefs
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
