import React, {useEffect, useState} from "react";
import "./css/TopNav.css";

export default function TopNav({ grid, state, stateSetters, gridSetters }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {}, [grid, state]);

    const handleUndoClick = () => { 
        setIsChecked(false);
        console.log(state.cellActionsList)
        if (state.killerMode) {
            // Handle this in a separate function to avoid excessively long functions
            return;
        }
         
        // If there are no actions to undo, do nothing
        if (state.cellActionsList.length === 0) {
            return;
        }

        // If there's one action, it is empty so clear it to avoid unnecessary data being stored
        if (state.cellActionsList.length === 1) {
            stateSetters.removeCellActionsList()
            return
        } 

        // Picks the cell to undo and the cell to select after the undo
        const currentItem = state.cellActionsList[state.cellActionsList.length - 1];
        const undoItem = state.cellActionsList[state.cellActionsList.length - 2];
        let itemTwoBack = undoItem;

        if (state.cellActionsList.length > 2) {
            itemTwoBack = state.cellActionsList[state.cellActionsList.length - 3];
        } 
        
        if (state.isValid) { 
            stateSetters.removeCellActionsList()
            stateSetters.setCellActionsRedoList(currentItem['row'], currentItem['col'],currentItem['value'])
            gridSetters.setCellValue(undoItem['row'], undoItem['col'], undoItem['value'])
            gridSetters.setCellIsSelected(state.selectedCell['row'], state.selectedCell['col'], false)
            gridSetters.setCellIsSelected(itemTwoBack['row'], itemTwoBack['col'], true)
            gridSetters.setCellIsSelected(undoItem['row'], undoItem['col'], false)
            gridSetters.setCellIsIncorrect(undoItem['row'], undoItem['col'], false)
            if (undoItem.value === 0) {
                stateSetters.removeCellActionsList()
            }
        } else {
            stateSetters.setIsValid(true);
            stateSetters.removeCellActionsList()
            gridSetters.setCellIsIncorrect(currentItem['row'], currentItem['col'], false)
        }
        
    }

    const handleRedoClick = () => { // FIX THIS
        setIsChecked(false);
        stateSetters.setIsValid(true)

        if (state.cellActionsRedoList.length === 0) {
            return;
        }

        const redoItem = state.cellActionsRedoList[state.cellActionsRedoList.length - 1];
        // This is the redo function using the cellActionsList and cellActionsListIndex 
        gridSetters.setCellValue(redoItem['row'], redoItem['col'], redoItem['value']);
        stateSetters.removeCellActionsRedoList();
        stateSetters.setCellActionsList(redoItem['row'], redoItem['col'], redoItem['value']);
    }

    const handleResetClick = () => {
        isChecked ? window.location.reload() : setIsChecked(true) // Requires a double click to reset
        setTimeout(() => {setIsChecked(false)}, 4000); // Resets the button after 4 seconds to avoid accidental resets
    }

    const handleSaveClick = () => {
        console.log("Save"); 
        // fill in later
    }

    const handleKillerClick = () => {
        stateSetters.setKillerMode(!state.killerMode);
        // This is all this button needs to do I think
        // Other logic will rely on the killer mode state
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