import { deleteUndo } from './TopNav';

// ------------------ 
// Undo
// ------------------

// Handle undo for Killer Sudoku box-related actions
function handleKillerUndo(state, stateSetters, gridSetters) {
    gridSetters.clearCellIsSelected();
  
    // Check if there are actions to undo
    if (state.boxActionsList.length > 0) {
      const boxAction = state.boxActionsList[state.boxActionsList.length - 1];
      stateSetters.appendBoxActionsRedoList(boxAction);
  
      // Undo box creation by deleting it
      if (boxAction['type'] === 'create') {
        deleteUndo(boxAction, gridSetters);
      }
  
      // Undo box deletion by creating it
      if (boxAction['type'] === 'delete') {
        const boxName = boxAction['boxName'];
        const cellToDisplay = boxAction['displayCell'];
  
        // Restore box colour and display sum
        gridSetters.setSpecifiedBoxColor(boxName, boxAction['color']);
        gridSetters.setIsDisplayingBoxSum(cellToDisplay['col'], cellToDisplay['row'], true);
  
        // Reassign box to all its cells
        for (const cell of boxAction['cells']) {
          gridSetters.setCellBox(cell.col, cell.row, boxName);
        }
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
        deleteUndo(boxAction, gridSetters);
      }
  
      // Redo box creation by creating it
      if (boxAction['type'] === 'create') {
        const boxName = boxAction['boxName'];
        const cellToDisplay = boxAction['displayCell'];
  
        // Restore box colour and display sum
        gridSetters.setSpecifiedBoxColor(boxName, boxAction['color']);
        gridSetters.setIsDisplayingBoxSum(cellToDisplay['col'], cellToDisplay['row'], true);
  
        // Reassign box to all its cells
        for (const cell of boxAction['cells']) {
          gridSetters.setCellBox(cell.col, cell.row, boxName);
        }
      }
  
      // Remove the last action from the redo list
      stateSetters.popBoxActionsRedoList();
    }
  }

export { handleKillerUndo, handleKillerRedo };