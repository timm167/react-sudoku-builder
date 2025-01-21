// --- External Dependencies ---
import React from "react";

// --- CSS Styles ---
import './css/Grid.css';

// --- Utility Functions ---
import { Cell } from "../state/initialGrid";
import { validateSudoku } from "./utils/Sudoku";
import { addCellToBox } from "./utils/createBox";
import { deleteBox } from "./utils/deleteBox";

// --- Context ---
import { useAppContext } from "../appContext";

// --- Grid Component ---
export default function SudokuGrid() {
    

    // Access Context
    const { grid, state, stateSetters, gridSetters, gridInputRefs, buttonInputRefs } = useAppContext();

    // --- Handle cell change ---
    // Function to manage cell value changes and trigger Sudoku validation
    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, cell: Cell) => {
        stateSetters.clearCellActionsRedoList();  // Clear redo list when a new action is made
        let inputValue = e.target.value.slice(-1);  // Get the last character entered
        validateSudoku(inputValue, cell, grid, state, stateSetters, gridSetters, buttonInputRefs);  // Validate the input
    }

    // --- Handle cell click ---
    // Function to handle various actions when a cell is clicked (e.g., create/delete boxes, select cells)
    const handleCellClick = (cell: Cell) => {

        // If in create box mode, add cell to box
        if (state.creatingBox) {
            addCellToBox(cell, state, stateSetters, gridSetters);  
            return;
        }

        // If in delete box mode, delete box
        if (state.deletingBox && cell.box !== 'noBox') {
            deleteBox(cell, state, stateSetters, gridSetters);  // Delete box if in delete mode
            return;
        }

        // If in set box total mode, request sum for the box
        if (state.settingBoxTotal && cell.box !== 'noBox'){
            stateSetters.setIsRequestingSum(true);  // Request sum for the box using input field
            stateSetters.setBoxBeingDeclared(cell.box);  // Declare the box to request sum for
            return;
        }

        // Focus on the input field of the clicked cell
        gridInputRefs.current[cell.col][cell.row].current.focus();  

        // Deselect previously selected cell and select the new one
        if (state.selectedCell) {
            gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
            stateSetters.setSelectedCell(cell);  // Update selected cell state
        }

        // Toggle selection of the clicked cell
        if (cell.isSelected) {
            gridSetters.setCellIsSelected(cell.col, cell.row, false);  // Deselect cell
        } else {
            gridSetters.setCellIsSelected(cell.col, cell.row, true);  // Select cell
        }
    }

    // --- JSX Return ---
    return (
        <div className="inner-grid-holder">
            <h4 className={`${state.boxSumIsIncorrect ? 'alert' : 'hidden'}`}>
                Box Sum Error
            </h4>
        <div 
            className={`grid ${state.deletingBox ? 'delete' : ''} 
                    ${state.creatingBox ? 'create' : ''} 
                    ${state.settingBoxTotal ? 'setting' : ''}
                    ${state.boxSumIsIncorrect ? 'delete' : ''}`}>

            {/* Column Mapping: Iterating over each column */}
            {grid.map((col, colIndex) => (
                <div key={colIndex} className="col">
                    
                    {/* Row Mapping: Iterating over each cell in the current column */}
                    {col.map((cell: Cell, rowIndex) => (
                        <div
                            key={cell.id}
                            className={`cell ${cell.isSelected ? 'selected' : ''} 
                                        ${cell.isIncorrect ? 'incorrect' : ''}
                                        ${cell.isBeingAddedToBox ? 'box-add-highlight' : ''}
                                        ${cell.box === 'noBox' ? '' : 'box-highlight'}
                                        ${cell.boxColor}`}
                            onClick={() => handleCellClick(cell)}  // Handle click for the current cell
                        >
                            {/* Display Box Sum: Show sum if box sum is being displayed */}
                            <span className="box-sum-displayer">
                                {cell.isDisplayingBoxSum && cell.boxDeclaredSum !== 0 ? cell.boxDeclaredSum : ''}
                            </span>

                            {/* Input Field for Cell: Handle user input for cell values */}
                            <input 
                                ref={gridInputRefs.current[colIndex][rowIndex]}  // Ref to manage focus on input field
                                type="text"
                                value={`${cell.value === 0 ? '' : cell.value}`}  // Display value or empty if 0
                                onChange={(e) => handleCellChange(e, cell)}  // Call function to handle input change
                            />
                        </div>
                    ))}
                    {/* End Row Mapping */}
                </div>
            ))}
            {/* End Column Mapping */}

        </div>
        </div>
    );
}
