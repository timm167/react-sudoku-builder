import React from "react";
import { useAppContext } from "../appContext";
import "./css/Solve.css";
import { fetchSolution } from "../server-utils/fetch";
import { getEmptyBoxCells, applyBoxSizes, applyBoxCellValues } from "../server-utils/send";
import  {dummyGrid, expertGrid } from "../server-utils/populate";

export default function Solve() {

    const { grid, gridSetters, stateSetters } = useAppContext();

    const handleImportClick = () => {
        gridSetters.populateGrid(expertGrid);
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                gridSetters.clearBoxSum(grid[i][j]['box']);
            }
        }
    }

    const handleSolveClick = () => {
        console.log(grid)
        let copyGrid = grid

        applyBoxSizes(copyGrid);

        applyBoxCellValues(copyGrid);

        // Set the fixed values in the grid
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (copyGrid[i][j].value !== 0) {
                    copyGrid[i][j].isFixed = true;
                }
            }
        }
        const fetchGrid = getEmptyBoxCells(copyGrid);
        console.log(fetchGrid)
        fetchSolution(fetchGrid, gridSetters);
    }

    return (
        <div className="solve-buttons-holder">
            <button className="solve-nav import-button" onClick={() => handleImportClick()}>
                Import
            </button>
            <button className="solve-nav solve-button" onClick={() => handleSolveClick()}>
                Solve
            </button>
        </div>
    )
}