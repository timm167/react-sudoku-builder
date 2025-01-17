// --- React and Necessary Hooks ---
import React, { useState } from "react";

// --- Context ---
import { useAppContext } from "../appContext";

// --- Styles ---
import "./css/TopNav.css";

// --- Utility Functions ---
import { handleSave } from "./utils/TopNav";
import { handleKillerUndo, handleKillerRedo } from "./utils/killerShortcuts";
import { handleSudokuUndo, handleSudokuRedo } from "./utils/sudokuShortcuts";

// --- TopNav Component ---
export default function TopNav() {
    // --- Local State ---
    const [isChecked, setIsChecked] = useState(false);

    // --- Context State ---
    const { state, stateSetters, grid, gridSetters, buttonInputRefs } = useAppContext();

    // --- Handlers ---
    // Handle undo button click
    const handleUndoClick = () => { 
        setIsChecked(false);
        if (state.killerMode) {
            handleKillerUndo(state, stateSetters, gridSetters);
            return;
        }
        
        // If there are no actions to undo, do nothing
        if (state.cellActionsList.length === 0) { return; }

        // Undo the last action
        handleSudokuUndo(state, stateSetters, gridSetters);
    }

    // Handle redo button click
    const handleRedoClick = () => {
        setIsChecked(false);

        if (state.killerMode) {
            handleKillerRedo(state, stateSetters, gridSetters);
            return;
        }
        
        // If there are no actions to redo or inputs cannot be validated, do nothing
        if (state.cellActionsRedoList.length === 0 || state.canValidateInputs === false) {
            return;
        }

        // Redo the last action
        handleSudokuRedo(state, stateSetters, gridSetters);
    }

    // Handle reset button click (requires double click)
    const handleResetClick = () => {
        isChecked ? window.location.reload() : setIsChecked(true);
        setTimeout(() => { setIsChecked(false); }, 4000); // Resets the button after 4 seconds to avoid accidental resets
    }

    // Handle save button click
    const handleSaveClick = () => {
        console.log(state.boxActionsList);
        handleSave(grid);
    }

    // Handle Killer Mode toggle
    const handleKillerClick = () => {
        if (state.killerMode) {
            stateSetters.setCanValidateInputs(true);
        } else {
            stateSetters.setCanValidateInputs(false);
        }
        stateSetters.setKillerMode(!state.killerMode);
        stateSetters.setDeletingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setCreatingBox(false);
    }

    return (
        <>
            {/* Killer Mode Toggle Button */}
            <div className="killer-button-container">
                <button 
                    ref={buttonInputRefs.killerButton}
                    className={`top-nav-button toggle-killer-button ${state.killerMode ? 'exit-killer-mode' : ''}`} 
                    onClick={() => handleKillerClick()}
                >
                    {state.killerMode ? 'Normal Sudoku Mode' : 'Killer Mode'} 
                    <span className={`${state.killerMode ? 'hidden' : 'key-indicator'}`}>(Shft)</span>
                </button>
            </div>

            {/* Top Navigation Buttons */}
            <div className="top-nav-buttons">
                {/* Undo Button */}
                <button 
                    ref={buttonInputRefs.undoButton}
                    className="top-nav-button undo-button" 
                    onClick={() => handleUndoClick()}
                >
                    Undo <span className="key-indicator">(Cmd+Z)</span>
                </button>

                {/* Redo Button */}
                <button 
                    ref={buttonInputRefs.redoButton}
                    className="top-nav-button redo-button" 
                    onClick={() => handleRedoClick()}
                >
                    Redo <span className="key-indicator">(Cmd+X)</span>
                </button>

                {/* Reset Button */}
                <button className={`top-nav-button reset-button`} onClick={() => handleResetClick()}>
                    {isChecked ? 'Reset!': 'Reset'}
                </button>

                {/* Save Button */}
                <button className="top-nav-button save-button" onClick={() => handleSaveClick()}>
                    Save
                </button>
            </div>
        </>
    );
}
