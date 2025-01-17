
// ------------------ 
// Undo
// ------------------

// Handle undo for Sudoku cell-related actions
function handleSudokuUndo(state, stateSetters, gridSetters) {

  // Retrieve the current, previous, and two-steps-back actions from the cell actions list
  const currentItem = state.cellActionsList[state.cellActionsList.length - 1];
  const undoItem = state.cellActionsList[state.cellActionsList.length - 2];
  const itemTwoBack = state.cellActionsList[state.cellActionsList.length - 3] || undoItem;

  // Check if input validation is enabled
  if (state.canValidateInputs) {

    // If the previous action cleared a cell (value is 0), move it to the redo list
    // This is important due to prepending actions with empty actions to allow for clearing cells
    if (undoItem.value === 0) {
      stateSetters.appendCellActionsRedoList(undoItem['col'], undoItem['row'], 0);
      stateSetters.popCellActionsList(); 
    }

    // Remove the current action and add it to the redo list for potential redo operations
    stateSetters.popCellActionsList();
    stateSetters.appendCellActionsRedoList(currentItem['col'], currentItem['row'], currentItem['value']);

    // Update the grid to reflect the undo action
    gridSetters.setCellValue(undoItem['col'], undoItem['row'], undoItem['value']);

    // Update cell selection to focus on the appropriate cell after undo
    gridSetters.setCellIsSelected(state.selectedCell['col'], state.selectedCell['row'], false); // Deselect the current cell
    gridSetters.setCellIsSelected(itemTwoBack['col'], itemTwoBack['row'], true); // Select the cell two steps back
    gridSetters.setCellIsSelected(undoItem['col'], undoItem['row'], false); // Deselect the previously undone cell

    // Ensure the undone cell is no longer marked as incorrect
    gridSetters.setCellIsIncorrect(undoItem['col'], undoItem['row'], false);
  } else {

    // If validation was disabled, re-enable it and handle corrections
    stateSetters.setCanValidateInputs(true);
    stateSetters.popCellActionsList(); // Remove the invalid action
    gridSetters.setCellIsIncorrect(currentItem['col'], currentItem['row'], false); // Clear incorrect flag for the current cell
  }
}

// ------------------ 
// Redo
// ------------------

// Handle redo for Sudoku cell-related actions
function handleSudokuRedo(state, stateSetters, gridSetters) {
  
  // Retrieve the most recent redo action and the one before it
  const redoItem = state.cellActionsRedoList[state.cellActionsRedoList.length - 1];
  const recentItem = state.cellActionsRedoList[state.cellActionsRedoList.length - 2];

  // If either the most recent redo or the one before involves clearing a cell, handle it
  if (recentItem['value'] === 0 || redoItem['value'] === 0) {
    stateSetters.popCellActionsRedoList(); // Remove the redo action from the redo list
    stateSetters.appendCellActionsList(recentItem['col'], recentItem['row'], 0); // Add the cleared cell action back to the actions list
  }

  // Remove the redo action and apply it to the actions list
  stateSetters.popCellActionsRedoList();
  stateSetters.appendCellActionsList(redoItem['col'], redoItem['row'], redoItem['value']);

  // Update the grid to reflect the redo action
  gridSetters.setCellValue(redoItem['col'], redoItem['row'], redoItem['value']);
}

export { handleSudokuUndo, handleSudokuRedo };
