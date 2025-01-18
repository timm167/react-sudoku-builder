// This file uses opposing data stacks to handle undo and redo actions for the Sudoku grid.

// ------------------ 
// Undo
// ------------------

// Handle undo for Sudoku cell-related actions
function handleSudokuUndo(state, stateSetters, gridSetters) {
  stateSetters.setBoxSumIsIncorrect(false);
  if (state.cellActionsList.length === 0) {return}

  // Retrieve the most recent undo action
  const lastAction = state.cellActionsList[state.cellActionsList.length - 1];

  // If the last action was an incorrect input, undo the incorrect action
  if (lastAction.isIncorrect) {
    gridSetters.setCellIsIncorrect(lastAction.col, lastAction.row, false);
    gridSetters.setCellValue(lastAction.col, lastAction.row, lastAction.from);
    stateSetters.popCellActionsList();
    return;
  }

  // Update the grid to reflect the undo action
  gridSetters.subFromBoxSum(lastAction.box, lastAction.to);
  gridSetters.addToBoxSum(lastAction.box, lastAction.from);
  gridSetters.setCellValue(lastAction.col, lastAction.row, lastAction.from);
  
  // Update cell selection to focus on the appropriate cell after undo
  if (state.cellActionsList.length > 1) {
    const oneActionBack = state.cellActionsList[state.cellActionsList.length - 2] 
    gridSetters.setCellIsSelected(oneActionBack.col, oneActionBack.row, true); // Select the cell just before the undone cell
    gridSetters.clearCellIsSelectedExcept(oneActionBack.col, oneActionBack.row); // Deselect the current cell
  }
  
  // Remove the last action from the actions list and apply it to the redo list
  stateSetters.popCellActionsList(); 
  stateSetters.appendCellActionsRedoList(lastAction);
}

// ------------------ 
// Redo
// ------------------

// Handle redo for Sudoku cell-related actions
// Mirrors the undo function
function handleSudokuRedo(state, stateSetters, gridSetters) {
  
  const lastAction = state.cellActionsRedoList[state.cellActionsRedoList.length - 1];
  
  stateSetters.popCellActionsRedoList();
  stateSetters.appendCellActionsList(lastAction);

  // Update the grid to reflect the redo action
  gridSetters.subFromBoxSum(lastAction.box, lastAction.from);
  gridSetters.addToBoxSum(lastAction.box, lastAction.to);
  gridSetters.setCellValue(lastAction.col, lastAction.row, lastAction.to);

  // Update cell selection to focus on the appropriate cell after redo
  gridSetters.setCellIsSelected(lastAction.col, lastAction.row, true); // Deselect the current cell
  gridSetters.clearCellIsSelectedExcept(lastAction.col, lastAction.row); // Select the cell just before the undone cell


}

export { handleSudokuUndo, handleSudokuRedo };
