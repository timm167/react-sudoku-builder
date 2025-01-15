import React, { useState} from "react";
import { useAppContext } from "../appContext";
import "./css/TopNav.css";
import { handleKillerUndo, handleKillerRedo, handleSave, handleSudokuUndo, handleSudokuRedo } from "./utils/TopNav";

export default function TopNav() {
    const [isChecked, setIsChecked] = useState(false);
    const { state, stateSetters, grid, gridSetters } = useAppContext();

    const handleUndoClick = () => { 
        setIsChecked(false);
        if (state.killerMode) {
            handleKillerUndo()
            return;
        }
        // If there are no actions to undo, do nothing
        if (state.cellActionsList.length === 0) {return}

        // If there's one action, it is empty so clear it to avoid unnecessary data being stored
        if (state.cellActionsList.length === 1) {
            stateSetters.removeCellActionsList()
            return
        } 
        
        // Undo the last action
        handleSudokuUndo(state, stateSetters, gridSetters)
    }

    const handleRedoClick = () => {
        setIsChecked(false);

        if (state.killerMode) {
            handleKillerRedo()
            return;
        }
        if (state.cellActionsRedoList.length === 0 || state.isValid === false) {
            return;
        }
        // Redo the last action
        handleSudokuRedo(state, stateSetters, gridSetters)
    }

    const handleResetClick = () => {
        isChecked ? window.location.reload() : setIsChecked(true) // Requires a double click to reset
        setTimeout(() => {setIsChecked(false)}, 4000); // Resets the button after 4 seconds to avoid accidental resets
    }

    const handleSaveClick = () => {
        handleSave(grid)
    }

    const handleKillerClick = () => {
        stateSetters.setKillerMode(!state.killerMode);
    }

    return (
        <>
        <div className="killer-button-container">
            <button 
                className={`top-nav-button toggle-killer-button ${state.killerMode ? 'exit-killer-mode' : ''}`} 
                onClick={() => handleKillerClick()}
            >
                {state.killerMode ? 'Normal Sudoku Mode' : 'Killer Mode'} <span>(Shft)</span>
            </button>
        </div>
        <div className="top-nav-buttons">
            <button className="top-nav-button undo-button" onClick={() => handleUndoClick()}>
                Undo <span>(Bsp)</span>
            </button>
            <button className="top-nav-button redo-button" onClick={() => handleRedoClick()}>
                Redo <span>(Shft + Bsp)</span>
            </button>
            <button className={`top-nav-button reset-button`} onClick={() => handleResetClick()}>
                {isChecked ? 'Reset!': 'Reset'}
            </button>
            <button className="top-nav-button save-button" onClick={() => handleSaveClick()}>
                Save
            </button>
        </div>
        </>
    )
}