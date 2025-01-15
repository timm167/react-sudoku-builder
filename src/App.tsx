// Utility functions or constants
import React, {useEffect, useState} from 'react'
import { initializeGrid } from "./components/utils/Grid";
import initialState from './app-utils/initialState'
import { createStateSetters } from './app-utils/stateSetters';
import { createGridSetters } from './app-utils/gridSetters';
import { createKeyboardManager } from './app-utils/keyboardManager';

// Components
import SudokuGrid from './components/Grid'
import TopNav from './components/TopNav'
import Killer from './components/Killer'
import Solve from './components/Solve'

// Styles
import './App.css' 


// NEXT STEPS:
// Make the grid interactive using my new grid setters
// Redo button
// bugless grid before moving on to killer mode

let initialGrid = initializeGrid();

function App() {
  const [grid, setGrid] = useState(initialGrid); // Sets the grid initially ready for logic to handle its data
  const [state, setState] = useState(initialState) // Sets the state of the app to the initial state 

  // Grid update functions using the spread operator to update grid

  const stateSetters = createStateSetters(setState)
  const gridSetters = createGridSetters(setGrid, state, stateSetters)
  const keyboardManager = createKeyboardManager(grid, state, stateSetters, gridSetters);


  useEffect(() => {
    // Add global key listener
    const keyListener = (e: KeyboardEvent) => {
      keyboardManager(e);
    };
    window.addEventListener("keydown", keyListener);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [grid, state, stateSetters, gridSetters]);
  

  return (
    <>
      <div >
        <h1>Killer Sudoku Builder</h1>
      </div>
      <div>
        {/* TopNav component renders 4 buttons: Undo, Reset, Save, Toggle Killer Mode */}
        <TopNav 
          grid={grid} 
          state={state}
          stateSetters={stateSetters}
          gridSetters={gridSetters}
        />
      </div>
      <div className='container'>
        {/* SudokuGrid container renders the grid itself */}
        <SudokuGrid 
          grid={grid} 
          state={state}
          stateSetters={stateSetters}
          gridSetters={gridSetters}
        />
      </div>
      <div className='container'>
        {/* Killer component renders 4 buttons: Delete Box, Set Box Total, Create Box, and Toggle Color */}
        <Killer 
          grid={grid} 
          state={state}
          stateSetters={stateSetters}
          gridSetters={gridSetters}
        />
      </div>
      <div className='container'>
        {/* Solve renders 2 buttons: Import, and solve */}
        <Solve 
          grid={grid} 
          state={state}
          stateSetters={stateSetters}
          gridSetters={gridSetters}
        />
      </div>
    </>
  )
}

// Exports to be rendered in main.tsx
export default App
