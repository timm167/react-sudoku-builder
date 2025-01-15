import React, {useEffect, useState} from "react";
import "./css/TopNav.css";

export default function TopNav({ grid, state, stateSetters, gridSetters }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {}, [grid, state]);

    const handleUndoClick = () => { 
        setIsChecked(false);
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
            if (undoItem.value === 0) {
                stateSetters.setCellActionsRedoList(undoItem['col'], undoItem['row'], 0)
                stateSetters.removeCellActionsList()
            }
            stateSetters.removeCellActionsList()
            stateSetters.setCellActionsRedoList(currentItem['col'], currentItem['row'],currentItem['value'])
            gridSetters.setCellValue(undoItem['col'], undoItem['row'], undoItem['value'])
            gridSetters.setCellIsSelected(state.selectedCell['col'], state.selectedCell['row'], false)
            gridSetters.setCellIsSelected(itemTwoBack['col'], itemTwoBack['row'], true)
            gridSetters.setCellIsSelected(undoItem['col'], undoItem['row'], false)
            gridSetters.setCellIsIncorrect(undoItem['col'], undoItem['row'], false)
        } else {
            stateSetters.setIsValid(true);
            stateSetters.removeCellActionsList()
            gridSetters.setCellIsIncorrect(currentItem['col'], currentItem['row'], false)
        }
        
    }

    const handleRedoClick = () => {
        setIsChecked(false);

        if (state.cellActionsRedoList.length === 0 || state.isValid === false) {
            return;
        }

        const redoItem = state.cellActionsRedoList[state.cellActionsRedoList.length - 1];
        const recentItem = state.cellActionsRedoList[state.cellActionsRedoList.length - 2];
        // This is the redo function using the cellActionsList and cellActionsListIndex 
        if (recentItem['value'] === 0 || redoItem['value'] === 0) {
            stateSetters.removeCellActionsRedoList();
            stateSetters.setCellActionsList(recentItem['col'], recentItem['row'], 0);
        }

        stateSetters.removeCellActionsRedoList();
        stateSetters.setCellActionsList(redoItem['col'], redoItem['row'], redoItem['value']);
        gridSetters.setCellValue(redoItem['col'], redoItem['row'], redoItem['value']);
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