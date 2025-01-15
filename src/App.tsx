// Utility functions or constants
import React, {useState} from 'react'
import { initializeGrid } from "./components/utils/Grid";
import initialState from './app-utils/initialState'

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

  const gridSetters = {

    setCellValue: (row: number, col: number, value: number) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].value = value;
        return newGrid;
      }),

    setCellIsSelected: (row: number, col: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].isSelected = value;
        stateSetters.setSelectedCell(newGrid[row][col]);
        return newGrid;
      }),

    setCellIsIncorrect: (row: number, col: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].isIncorrect = value;
        return newGrid;
      }),

    setCellBox: (row: number, col: number, value: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].box = value;
        return newGrid;
      }),
    
    setBoxSum: (box: string) => 
      setGrid((prevState) => {
        const newGrid = [...prevState];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxSum = newGrid[i][j].value;
            }
          }
        }
        return newGrid;
      }),

    setBoxDeclaredSum: (box: string, sum: number) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxDeclaredSum = sum;
            }
          }
        }
        return newGrid;
      }),
    
    setBoxColor: (box: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        const color = state.currentColorsArray[state.currentColorsArray.length - 1];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxColor = color;
            }
          }
        }
        stateSetters.setCurrentColorsArray();
        return newGrid;
      })
  }

  // State update functions using spread operator to update state
  const stateSetters = {
    setIsValid: (value: boolean) =>
      setState((prevState) => ({ ...prevState, isValid: value })),

    setDeletingBox: (value: boolean) =>
      setState((prevState) => ({ ...prevState, deletingBox: value })),

    setSettingBoxTotal: (value: boolean) =>
      setState((prevState) => ({ ...prevState, settingBoxTotal: value })),

    setCreatingBox: (value: boolean) =>
      setState((prevState) => ({ ...prevState, creatingBox: value })),

    setKillerMode: (value: boolean) =>
      setState((prevState) => ({ ...prevState, killerMode: value })),

    setSelectedCell: (value: any) =>
      setState((prevState) => ({ ...prevState, selectedCell: value })),

    setCellActionsList: (row: number, col: number, value: any) => 
      setState((prevState) => ({
        ...prevState,
        cellActionsList: [...prevState.cellActionsList, { row, col, value }]
      })),

    removeCellActionsList: () =>
      setState((prevState) => { 
        const updatedList = prevState.cellActionsList.slice(0, -1);
        return {
          ...prevState,
          cellActionsList: updatedList,
        };
      }),

    setCellActionsRedoList: (row: number, col: number, value: any) => 
      setState((prevState) => ({
        ...prevState,
        cellActionsRedoList: [...prevState.cellActionsRedoList, { row, col, value }]
      })),

    removeCellActionsRedoList: () => 
      setState((prevState) => {
        const newArray = [...prevState.cellActionsRedoList];
        newArray.pop();
        return { ...prevState, cellActionsRedoList: newArray };
      }),

    // If the array is empty, it will push the initial colors array to the currentColorsArray
    setCurrentColorsArray: () => 
      setState((prevState) => {
        const newArray = [...prevState.currentColorsArray];
        newArray.length === 0 ? newArray.push(...initialState.currentColorsArray): newArray.pop();
        return { ...prevState, currentColorsArray: newArray };
      }),
  };

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
