// Helper function to check if the input follows Sudoku rules
function checkSudoku(e, cell, grid, gridSetters) { 
    // Get the row, column, cube, and value of the cell
    let r = cell.row;
    let c = cell.col;
    let cubeIndex = cell.cube;
    let value = parseInt(e);
    let grid_col = []
    let grid_row = []
    let grid_cube = []

    // Get the values of the row, column, and cube to check for duplicates
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].row === r) {
                grid_row.push(grid[i][j].value);
            }
            if (grid[i][j].col === c) {
                grid_col.push(grid[i][j].value);
            }
            if (grid[i][j].cube === cubeIndex) {
                grid_cube.push(grid[i][j].value);
            }
        }
    }

    // Check if the value already exists in the row, column, or cube
    if (grid_col.includes(value) || grid_row.includes(value) || grid_cube.includes(value)){
        gridSetters.setCellIsIncorrect(r, c, true);
        return false;
    } 
    // else if (cell.inBox && (state.boxes[cell.inBox]['declaredTotal'] !== 0) && ((parseInt(state.boxes[cell.inBox]['sum']) + value) > state.boxes[cell.inBox]['declaredTotal'])) {
    //     return false;
    // }
    else {
        return true;
    }
}



// Helper function to validate the input
function validateSudoku(e, cell, grid, state, stateSetters, gridSetters ) {
    // Check if the input is a number
    if (state.isValid === false) {
        const undoItem = state.cellActionsList[state.cellActionsList.length - 1];
        gridSetters.setCellValue(undoItem['row'],undoItem['col'], 0);
        gridSetters.setCellIsIncorrect(undoItem['row'], undoItem['col'], false);
        stateSetters.setIsValid(true);
        return;
    }
    if (!/^\d$/.test(e)) {
        stateSetters.setIsValid(false);
    } else if (checkSudoku(e, cell, grid, gridSetters) === false) {
        stateSetters.setIsValid(false);
        stateSetters.setCellActionsList(cell.row, cell.col, 0)
    } else {
        // Adds an empty cell to the cellActionsList if the value is 0 for undo purposes
        if (cell.value === 0) {
            stateSetters.setCellActionsList(cell.row, cell.col, 0);
        }
        stateSetters.setCellActionsList(cell.row, cell.col, parseInt(e));
        stateSetters.setIsValid(true);
        gridSetters.setCellIsIncorrect(cell.row, cell.col, false);
        gridSetters.setCellValue(cell.row, cell.col, parseInt(e));
    }
}
export { validateSudoku };