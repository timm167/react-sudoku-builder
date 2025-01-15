import React, { useEffect, useRef } from 'react';

// Utility functions or constants
import { createKeyboardManager } from './app-utils/keyboardManager';

// Components
import SudokuGrid from './components/Grid';
import TopNav from './components/TopNav';
import Killer from './components/Killer';
import Solve from './components/Solve';

// Styles
import './App.css';

// Import your context hook
import { useAppContext } from './appContext';

function App() {
  // Access the context
  const { grid, state, stateSetters, gridSetters, buttonInputRefs, gridInputRefs } = useAppContext();



  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      keyboardManager(e);
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [grid, state, stateSetters, gridSetters]);

  // Initialize keyboard manager
  const keyboardManager = createKeyboardManager(grid, state, stateSetters, gridSetters, gridInputRefs);

  return (
    <>
      <div>
        <h1>Killer Sudoku Builder</h1>
      </div>
      <div>
        {/* TopNav component */}
        <TopNav />
      </div>
      <div className="container">
        {/* SudokuGrid component */}
        <SudokuGrid />
      </div>
      <div className="container">
        {/* Killer component */}
        <Killer />
      </div>
      <div className="container">
        {/* Solve component */}
        <Solve />
      </div>
    </>
  );
}

export default App;
