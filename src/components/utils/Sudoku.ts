import { checkBoxSumIsValid } from "./boxSumLogic";

// Main file for handling logic related to Sudoku rules and validation

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
        // Prevents error with self-comparison
        if (cell.row === j && cell.col === i) continue;
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

      // Reset the box state
      stateSetters.setBoxSumIsIncorrect(false);

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
      
      // Log the incorrect input for potential undo
      stateSetters.appendCellActionsList({
        col: cell.col,
        row: cell.row,
        from: grid[cell.col][cell.row].value,
        to: 0,
        isIncorrect: true
      });

      // Temporarily set the cell value to the incorrect input (Any other action undoes this)
      gridSetters.setCellValue(cell.col, cell.row, parseInt(e));
      return;
    }

    // Check if the box sum is invalid
    if (!checkBoxSumIsValid(grid)) {
      stateSetters.setCanValidateInputs(false);
      gridSetters.setCellIsIncorrect(cell.col, cell.row, true);
      stateSetters.setBoxSumIsIncorrect(true);

    // Log the incorrect input for potential undo
    stateSetters.appendCellActionsList({
        col: cell.col,
        row: cell.row,
        from: grid[cell.col][cell.row].value,
        to: 0,
        isIncorrect: true
    });

    // Temporarily set the cell value to the incorrect input (Any other action undoes this)
    gridSetters.setCellValue(cell.col, cell.row, parseInt(e));
    return;
    }

    // Update state and grid for the valid input
    stateSetters.appendCellActionsList({ 
        col: cell.col,
        row: cell.row,
        from: grid[cell.col][cell.row].value,
        to: parseInt(e),
        isIncorrect: false,
        box: cell.box
    });

    stateSetters.setCanValidateInputs(true);
    gridSetters.setCellIsIncorrect(cell.col, cell.row, false);

    // Update the box sum and cell value
    gridSetters.subFromBoxSum(cell.box, cell.value);
    gridSetters.addToBoxSum(cell.box, parseInt(e));
    gridSetters.setCellValue(cell.col, cell.row, parseInt(e));
    
  }
  
  export { validateSudoku };
  