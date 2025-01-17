import { clearBox } from "./deleteBox";

// Undo a box deletion by restoring its cells and colour
function deleteShortcut(boxAction, gridSetters) {

  // Get the first cell in the box
  const firstCell = boxAction['cells'][0];

  // Remove the box colour
  gridSetters.emptyBoxColor(boxAction['boxName']);

  // Reset the declared box sum to 0 and clear box sum
  gridSetters.clearBoxDeclaredSum(firstCell.box);
  gridSetters.clearBoxSum(firstCell.box);
  
  // Clear each cell in the box
  for (const cell of boxAction['cells']) {
    clearBox(cell, gridSetters);
  }
}

// Placeholder for saving the grid state
function handleSave(grid) {
  console.log('Save');
  console.log(grid);
}

export { handleSave, deleteShortcut };
