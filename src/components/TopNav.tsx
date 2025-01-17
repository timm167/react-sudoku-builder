import React, { useState} from "react";
import { useAppContext } from "../appContext";
import "./css/TopNav.css";
import { handleKillerUndo, handleKillerRedo, handleSave, handleSudokuUndo, handleSudokuRedo } from "./utils/TopNav";

export default function TopNav() {
    const [isChecked, setIsChecked] = useState(false);
    const { state, stateSetters, grid, gridSetters, buttonInputRefs } = useAppContext();

    const handleUndoClick = () => { 
        setIsChecked(false);
        if (state.killerMode) {
            handleKillerUndo(state, stateSetters, gridSetters)
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
            handleKillerRedo(state, stateSetters, gridSetters)
            return;
        }
        if (state.cellActionsRedoList.length === 0 || state.canValidateInputs === false) {
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
        console.log(state.boxActionsList)
        handleSave(grid)
    }

    const handleKillerClick = () => {
        if (state.killerMode) {
            stateSetters.setCanValidateInputs(true)
        } else {
            stateSetters.setCanValidateInputs(false)
        }
        stateSetters.setKillerMode(!state.killerMode);
        stateSetters.setDeletingBox(false);
        stateSetters.setSettingBoxTotal(false);
        stateSetters.setIsRequestingSum(false);
        stateSetters.setCreatingBox(false);
    }

    return (
        <>
        <div className="killer-button-container">
            <button 
                ref={buttonInputRefs.killerButton}
                className={`top-nav-button toggle-killer-button ${state.killerMode ? 'exit-killer-mode' : ''}`} 
                onClick={() => handleKillerClick()}
            >
                {state.killerMode ? 'Normal Sudoku Mode' : 'Killer Mode'} <span className={`${state.killerMode ? 'hidden' : 'key-indicator'}`}>(Shft)</span>
            </button>
        </div>
        <div className="top-nav-buttons">
            <button 
            ref={buttonInputRefs.undoButton}
            className="top-nav-button undo-button" 
            onClick={() => handleUndoClick()}
            >
                Undo <span className="key-indicator">(Cmd+Z)</span>
            </button>
            <button 
            ref={buttonInputRefs.redoButton}
            className="top-nav-button redo-button" 
            onClick={() => handleRedoClick()}
            >
                Redo <span className="key-indicator">(Cmd+X)</span>
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