// --- React and Necessary Hooks/Types ---
import React, { createContext, useContext, useState, useRef, ReactNode, RefObject, MutableRefObject } from 'react';

// --- State Management ---
import initialState from './state/initialState';
import { createStateSetters } from './state/stateSetters';
import { createGridSetters } from './state/gridSetters';

// --- Utilities ---
import { initializeGrid } from './state/initialGrid';


// ---------------------------------------------------
// Initial Setup
// ---------------------------------------------------

// Initialise the grid
const initialGrid = initializeGrid();

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
    newBoxButton: RefObject<HTMLButtonElement>;
    toggleColorButton: RefObject<HTMLButtonElement>;
    enterSumButton: RefObject<HTMLButtonElement>;
    enterSumInput: RefObject<HTMLInputElement>;
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
    newBoxButton: { current: null },
    toggleColorButton: { current: null },
    enterSumButton: { current: null },
    enterSumInput: { current: null },
  },
  gridInputRefs: {
    current: Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => React.createRef<HTMLInputElement>())
    ),
  },
};


// ---------------------------------------------------
// Context Creation
// ---------------------------------------------------

// Create the context with the defined types
const AppContext = createContext<AppContextType>(defaultContext);

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);


// ---------------------------------------------------
// Context Provider Component
// ---------------------------------------------------

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State Management
  const [grid, setGrid] = useState<typeof initialGrid>(initialGrid);
  const [state, setState] = useState<typeof initialState>(initialState);

  // Create setters
  const stateSetters = createStateSetters(setState);
  const gridSetters = createGridSetters(setGrid, state, stateSetters);

  // Button input references
  const buttonInputRefs = {
    undoButton: useRef<HTMLButtonElement>(null),
    redoButton: useRef<HTMLButtonElement>(null),
    killerButton: useRef<HTMLButtonElement>(null),
    checkButton: useRef<HTMLButtonElement>(null),
    solveButton: useRef<HTMLButtonElement>(null),
    deleteBoxButton: useRef<HTMLButtonElement>(null),
    newBoxButton: useRef<HTMLButtonElement>(null),
    toggleColorButton: useRef<HTMLButtonElement>(null),
    enterSumButton: useRef<HTMLButtonElement>(null),
    enterSumInput: useRef<HTMLInputElement>(null),
  };

  // Grid input references
  const gridInputRefs = useRef(
    Array.from({ length: 9 }, () =>
      Array.from({ length: 9 }, () => React.createRef<HTMLInputElement>())
    )
  );

  // Context value
  const value = {
    grid,
    state,
    stateSetters,
    gridSetters,
    buttonInputRefs,
    gridInputRefs,
  };

  // Provide the context to children
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
