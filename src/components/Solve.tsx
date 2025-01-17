import React from "react";
import { useAppContext } from "../appContext";
import "./css/Solve.css";

export default function Solve() {

    const { state } = useAppContext();

    const handleImportClick = () => {
        console.log("Import");
    }

    const handleSolveClick = () => {
        console.log(state.boxActionsList)
        console.log("Solve");
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