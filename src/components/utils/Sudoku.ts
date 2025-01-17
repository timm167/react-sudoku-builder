// Helper function to check if the input follows Sudoku rules
function checkSudoku(e, cell, grid, gridSetters) {
    const colIndex = cell.col;
    const rowIndex = cell.row;
    const cubeIndex = cell.cube;
    const value = parseInt(e);
    const gridRow = [];
    const gridCol = [];
    const gridCube = [];
  
    // Collect all values from the column, row, and cube for validation
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const currentCell = grid[i][j];
        if (currentCell.col === colIndex) gridCol.push(currentCell.value);
        if (currentCell.row === rowIndex) gridRow.push(currentCell.value);
        if (currentCell.cube === cubeIndex) gridCube.push(currentCell.value);
      }
    }
  
    // Check for duplicates in the row, column, or cube
    if (gridRow.includes(value) || gridCol.includes(value) || gridCube.includes(value)) {
      gridSetters.setCellIsIncorrect(colIndex, rowIndex, true);
      return false;
    }
  
    // Value is valid
    return true;
  }
  
  // Helper function to validate the input
  function validateSudoku(e, cell, grid, state, stateSetters, gridSetters) {
    // If the previous input caused an error, undo that action
    if (!state.canValidateInputs) {
      const lastAction = state.cellActionsList[state.cellActionsList.length - 1];
  
      // Reset the incorrect cell
      gridSetters.setCellValue(lastAction.col, lastAction.row, 0);
      gridSetters.setCellIsIncorrect(lastAction.col, lastAction.row, false);
  
      // Allow validation again and update state
      stateSetters.setCanValidateInputs(true);
      stateSetters.popCellActionsList();
      return;
    }
  
    // Check if the input is a valid single digit
    if (!/^\d$/.test(e)) {
      stateSetters.setCanValidateInputs(false);
      return;
    }
  
    // Validate the input using Sudoku rules
    if (!checkSudoku(e, cell, grid, gridSetters)) {
      stateSetters.setCanValidateInputs(false);
  
      // Log the invalid action with a zero value for undo purposes
      stateSetters.appendCellActionsList(cell.col, cell.row, 0);
      return;
    }
  
    // Add an undo entry if the cell was initially empty
    if (cell.value === 0) {
      stateSetters.appendCellActionsList(cell.col, cell.row, 0);
    }
  
    // Update state and grid for the valid input
    stateSetters.appendCellActionsList(cell.col, cell.row, parseInt(e));
    stateSetters.setCanValidateInputs(true);
    gridSetters.setCellIsIncorrect(cell.col, cell.row, false);
    gridSetters.setCellValue(cell.col, cell.row, parseInt(e));
  }
  
  export { validateSudoku };
  