// To do:
// Collect and configure data to be sent to the backend including fixing values
// Create a mock front end receipt of data from the backend and create populateGrid.ts
// Set up venv and install dependencies
// Simple flask backend with RESTful API
// Create a backend with python that will receive the data and send it back
// Create sql database to store saved puzzles
// Create a way to save puzzles
// Create a way to load and play puzzles
// Configure with Docker
// Deploy

// --- External Dependencies ---
import React, { useEffect } from 'react';

// --- Utility Functions or Constants ---
import { createKeyboardManager } from './utils/keyboardManager';

// --- Components ---
import SudokuGrid from './components/Grid';
import TopNav from './components/TopNav';
import Killer from './components/Killer';
import Solve from './components/Solve';

// --- Styles ---
import './App.css';

// --- Context ---
import { useAppContext } from './appContext';


// App Component
function App() {

  // Initialize context
  const { grid, state, stateSetters, gridSetters, gridInputRefs, buttonInputRefs } = useAppContext();
  
  // Initialize keyboard manager
  const keyboardManager = createKeyboardManager(grid, state, stateSetters, gridSetters, gridInputRefs, buttonInputRefs);


  // Use effect hook to listen for keyboard events
  useEffect(() => {

    // Allows only numbers to be inputted anywhere in the app
    const keyListener = (e: KeyboardEvent) => {
      if (!/^\d$/.test(e.key)) { keyboardManager(e) }
    };
    
    // Add event listener
    window.addEventListener("keydown", keyListener);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [grid, state, stateSetters, gridSetters]);

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
