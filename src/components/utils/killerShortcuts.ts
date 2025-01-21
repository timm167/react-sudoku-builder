import { createBoxShortcut, deleteBoxShortcut } from './navUtils';

// ------------------ 
// Undo
// ------------------

// Handle undo for Killer Sudoku box-related actions
function handleKillerUndo(grid, state, stateSetters, gridSetters) {
    gridSetters.clearCellIsSelected();
    stateSetters.setBoxSumIsIncorrect(false);
  
    // Check if there are actions to undo
    if (state.boxActionsList.length > 0) {
      const boxAction = state.boxActionsList[state.boxActionsList.length - 1];

      // Save the declared sum for redo as this is not necessarily stored when the box is created
      if( boxAction['declaredSum'] === 0 ) {
        // If there's no declared sum, get it from the first cell in the box
        let boxActionWithDeclaredSum = boxAction;
        boxActionWithDeclaredSum['declaredSum'] = grid[boxAction['cells'][0].col][boxAction['cells'][0].row].boxDeclaredSum;
        stateSetters.appendBoxActionsRedoList(boxActionWithDeclaredSum);
      } else {
        stateSetters.appendBoxActionsRedoList(boxAction);
      }
  
      // Undo box creation by deleting it
      if (boxAction['type'] === 'create') {
        deleteBoxShortcut(boxAction, gridSetters);
      }
  
      // Undo box deletion by creating it
      if (boxAction['type'] === 'delete') {
        createBoxShortcut(boxAction, gridSetters);
      }
  
      // Remove the last action from the undo list
      stateSetters.popBoxActionsList();
    }
  }

  // ------------------ 
  // Redo
  // ------------------
  
  // Handle redo for Killer Sudoku box-related actions
  function handleKillerRedo(state, stateSetters, gridSetters) {
    gridSetters.clearCellIsSelected();
  
    // Check if there are actions to redo
    if (state.boxActionsRedoList.length > 0) {
      const boxAction = state.boxActionsRedoList[state.boxActionsRedoList.length - 1];
      stateSetters.appendBoxActionsList(boxAction);
  
      // Redo box deletion by deleting it
      if (boxAction['type'] === 'delete') {
        deleteBoxShortcut(boxAction, gridSetters);
      }
  
      // Redo box creation by creating it
      if (boxAction['type'] === 'create') {
        createBoxShortcut(boxAction, gridSetters);
      }
  
      // Remove the last action from the redo list
      stateSetters.popBoxActionsRedoList();
    }
  }

export { handleKillerUndo, handleKillerRedo };