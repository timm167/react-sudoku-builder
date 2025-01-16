// Helper function to check if the input follows Sudoku rules
function checkSudoku(e, cell, grid, gridSetters) { 
    // Get the col, rowumn, cube, and value of the cell
    let r = cell.col;
    let c = cell.row;
    let cubeIndex = cell.cube;
    let value = parseInt(e);
    let grid_row = [];
    let grid_col = [];
    let grid_cube = [];

    // Get the values of the col, rowumn, and cube to check for duplicates
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].col === r) {
                grid_col.push(grid[i][j].value);
            }
            if (grid[i][j].row === c) {
                grid_row.push(grid[i][j].value);
            }
            if (grid[i][j].cube === cubeIndex) {
                grid_cube.push(grid[i][j].value);
            }
        }
    }

    // Check if the value already exists in the col, rowumn, or cube
    if (grid_row.includes(value) || grid_col.includes(value) || grid_cube.includes(value)){
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
        gridSetters.setCellValue(undoItem['col'],undoItem['row'], 0);
        gridSetters.setCellIsIncorrect(undoItem['col'], undoItem['row'], false);
        stateSetters.setIsValid(true);
        stateSetters.removeCellActionsList();
        return;
    }
    if (!/^\d$/.test(e)) {
        stateSetters.setIsValid(false);
    } else if (checkSudoku(e, cell, grid, gridSetters) === false) {
        stateSetters.setIsValid(false);
        stateSetters.setCellActionsList(cell.col, cell.row, 0)
    } else {
        // Adds an empty cell to the cellActionsList if the value is 0 for undo purposes
        if (cell.value === 0) {
            stateSetters.setCellActionsList(cell.col, cell.row, 0);
        }
        stateSetters.setCellActionsList(cell.col, cell.row, parseInt(e));
        stateSetters.setIsValid(true);
        gridSetters.setCellIsIncorrect(cell.col, cell.row, false);
        gridSetters.setCellValue(cell.col, cell.row, parseInt(e));
    }
}
export { validateSudoku };