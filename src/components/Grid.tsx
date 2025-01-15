import React, { useEffect } from "react";
import './css/Grid.css';
import { Cell } from "./utils/Grid";
import { validateSudoku } from "./utils/Sudoku";

export default function SudokuGrid({ grid, state, stateSetters, gridSetters }) {

    useEffect(() => {}, [grid]);

    const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, cell: Cell) => {
        stateSetters.clearCellActionsRedoList();
        let inputValue = e.target.value.slice(-1);
        validateSudoku(inputValue, cell, grid, state, stateSetters, gridSetters)
    }

    // For now this just works with css to highlight the selected cell
    const handleCellClick = (cell: Cell) => {
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
                    {col.map((cell: Cell) => (
                        <div
                            key={cell.id}
                            className={`cell ${cell.isSelected ? 'selected' : ''} ${cell.isIncorrect ? 'incorrect' : ''}`}
                            onClick={() => handleCellClick(cell)}
                        >
                            <input 
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