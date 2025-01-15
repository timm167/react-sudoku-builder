import React, { useEffect,  } from "react";
import './css/Grid.css';
import { Cell } from "./utils/Grid";
import { validateSudoku } from "./utils/Sudoku";
import { useAppContext } from "../appContext";

export default function SudokuGrid() {
    // Access context
    const { grid, state, stateSetters, gridSetters, gridInputRefs } = useAppContext();

    useEffect(() => {}, [grid]);

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, cell: Cell) => {
        stateSetters.clearCellActionsRedoList();
        let inputValue = e.target.value.slice(-1);
        validateSudoku(inputValue, cell, grid, state, stateSetters, gridSetters)
    }

    const handleCellClick = (cell: Cell) => {
        gridInputRefs.current[cell.col][cell.row].current.focus();
        if (state.selectedCell) {
            gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
            stateSetters.setSelectedCell(cell);
        }
        if (cell.isSelected) {
            gridSetters.setCellIsSelected(cell.col, cell.row, false);
        } else {
            gridSetters.setCellIsSelected(cell.col, cell.row, true);
        }
    }

    return (
        <div className={`grid ${state.deletingBox ? 'highlight-grid' : ''}`}>
            {grid.map((col, colIndex) => (
                <div key={colIndex} className="col">
                    {col.map((cell: Cell, rowIndex) => (
                        <div
                            key={cell.id}
                            className={`cell ${cell.isSelected ? 'selected' : ''} ${cell.isIncorrect ? 'incorrect' : ''}`}
                            onClick={() => handleCellClick(cell)}
                        >
                            <input 
                                ref={gridInputRefs.current[colIndex][rowIndex]}
                                type="text"
                                value={`${cell.value === 0 ? '' : cell.value}`}
                                onChange={(e) => handleCellChange(e, cell)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
