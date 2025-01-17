import { clearBox } from "./deleteBox";

// Undo a box deletion by restoring its cells and colour
function deleteUndo(boxAction, gridSetters) {
  // Remove the box colour
  gridSetters.emptyBoxColor(boxAction['boxName']);

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

export { handleSave, deleteUndo };
