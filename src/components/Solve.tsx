import React from "react";
import { useAppContext } from "../appContext";
import "./css/Solve.css";
import { fetchSolution } from "../server-utils/fetch";

export default function Solve() {

    const { grid, gridSetters, stateSetters } = useAppContext();

    const handleImportClick = () => {
        console.log("Import");
    }

    const handleSolveClick = () => {
        let fetchGrid = grid

        // Set the fixed values in the grid
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (fetchGrid[i][j].value !== 0) {
                    fetchGrid[i][j].isFixed = true;
                }
            }
        }
        fetchSolution(fetchGrid, gridSetters, stateSetters);
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