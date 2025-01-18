import { deleteShortcut } from './TopNav';

// ------------------ 
// Undo
// ------------------

// Handle undo for Killer Sudoku box-related actions
function handleKillerUndo(grid, state, stateSetters, gridSetters) {
    gridSetters.clearCellIsSelected();
  
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
        deleteShortcut(boxAction, gridSetters);
      }
  
      // Undo box deletion by creating it
      if (boxAction['type'] === 'delete') {
        const boxName = boxAction['boxName'];
        const cellToDisplay = boxAction['displayCell'];
  
        // Restore box colour and display sum
        gridSetters.setSpecifiedBoxColor(boxName, boxAction['color']);
        gridSetters.setIsDisplayingBoxSum(cellToDisplay['col'], cellToDisplay['row'], true);
        gridSetters.setBoxDeclaredSum(boxName, boxAction['declaredSum']);
        gridSetters.applyBoxSum(boxName);
  
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
        deleteShortcut(boxAction, gridSetters);
      }
  
      // Redo box creation by creating it
      if (boxAction['type'] === 'create') {
        const boxName = boxAction['boxName'];
        const cellToDisplay = boxAction['displayCell'];
  
        // Restore box colour and display sum
        console.log(cellToDisplay);
        console.log("boxAction", boxAction)
        console.log("boxdeclared", boxAction['declaredSum']);
        gridSetters.setSpecifiedBoxColor(boxName, boxAction['color']);
        gridSetters.setIsDisplayingBoxSum(cellToDisplay['col'], cellToDisplay['row'], true);
        gridSetters.setBoxDeclaredSum(boxName, boxAction['declaredSum']);
        gridSetters.applyBoxSum(boxName);
  
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