function handleKillerUndo() {
  // ...
}

function handleKillerRedo() {
  // ...
}

function handleSudokuUndo( state, stateSetters, gridSetters) {
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

function handleSudokuRedo(state, stateSetters, gridSetters) {
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

function handleSave(grid) {
  console.log('Save')
  console.log(grid)
}

export { handleKillerUndo, handleKillerRedo, handleSudokuUndo, handleSudokuRedo, handleSave }

