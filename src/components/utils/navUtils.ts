import { clearBox } from "./deleteBox";

function createBoxShortcut(boxAction, gridSetters) {
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
        gridSetters.setBoxCells(cell.col, cell.row, boxAction['cells']);
    }
}

// Undo a box deletion by restoring its cells and colour
function deleteBoxShortcut(boxAction, gridSetters) {

    // Get the first cell in the box
    const firstCell = boxAction['cells'][0];
  
    // Remove the box colour
    gridSetters.emptyBoxColor(boxAction['boxName']);
  
    // Reset the declared box sum to 0 and clear box sum
    gridSetters.clearBoxDeclaredSum(firstCell.box);
    gridSetters.clearBoxSum(firstCell.box);
    
    // Clear each cell in the box
    for (const cell of boxAction['cells']) {
      gridSetters.setBoxCells(cell.col, cell.row, []);
      clearBox(cell, gridSetters);
    }
  }

export { createBoxShortcut, deleteBoxShortcut };