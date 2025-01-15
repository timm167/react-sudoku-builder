// // Just navigates the grid based on the direction
// function navigateGrid(direction) {
//     let cell = state.selectedCell;
//     let col = cell.col;
//     let row = cell.row;
//     let newcol = col;
//     let newrow = row;

//     switch (direction) {
//         case "up":
//             newcol = col === 0 ? 8 : col - 1;
//             break;
//         case "down":
//             newcol = col === 8 ? 0 : col + 1;
//             break;
//         case "left":
//             newrow = row === 0 ? 8 : row - 1;
//             break;
//         case "right":
//             newrow = row === 8 ? 0 : row + 1;
//             break;
//     }

//     setSelectedCell(state.grid[newcol][newrow]);
//     state.selectedCell.focus();
// }

function navigateGrid(direction, grid, state, gridSetters, stateSetters) {
    switch (direction) {
        case "ArrowUp":
            if (state.selectedCell.col === 0) {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(8, state.selectedCell.row, true);
                stateSetters.setSelectedCell(grid[8][state.selectedCell.row]);
            } else {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(state.selectedCell.col - 1, state.selectedCell.row, true);
                stateSetters.setSelectedCell(grid[state.selectedCell.col - 1][state.selectedCell.row]);
            }
            break;
        case "ArrowDown":
            if (state.selectedCell.col === 8) {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(0, state.selectedCell.row, true);
                stateSetters.setSelectedCell(grid[0][state.selectedCell.row]);
            } else {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(state.selectedCell.col + 1, state.selectedCell.row, true);
                stateSetters.setSelectedCell(grid[state.selectedCell.col + 1][state.selectedCell.row]);
            }
            break;
        case "ArrowLeft":
            if (state.selectedCell.row === 0) {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(state.selectedCell.col, 8, true);
                stateSetters.setSelectedCell(grid[state.selectedCell.col][8]);
            } else {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row - 1, true);
                stateSetters.setSelectedCell(grid[state.selectedCell.col][state.selectedCell.row - 1]);
            }
            break;
        case "ArrowRight":
            if (state.selectedCell.row === 8) {
                gridSetters.setCellIsSelected(state.selectedCell.col, state.selectedCell.row, false);
                gridSetters.setCellIsSelected(state.selectedCell.col, 0, true);
                stateSetters.setSelectedCell(grid[state.selectedCell.col][0]);
            } else {
    }
}};

export const createKeyboardManager = (grid, state, stateSetters, gridSetters) => {
    return (e) => {
        // Check if there's a selected cell
        if (state.selectedCell) {
            // Handle the Arrow key navigation (use the correct key names)
            if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
                navigateGrid(e.key, grid, state, gridSetters, stateSetters);
            }
        }
    }
}





// if (state.isValid === false && state. === false) {
//     document.getElementById("undoButton").click();
// }
// else if (e.key === "Backspace" && (e.ctrlKey || e.shiftKey)) {
//     document.getElementById("clearButton").click();
// }
// else if (e.key === "Backspace") {
//     document.getElementById("undoButton").click();
// }
// else if (e.key === "ArrowUp") {
//     navigateGrid("up");
// }
// else if (e.key === "ArrowDown") {
//     navigateGrid("down");
// }
// else if (e.key === "ArrowLeft") {
//     navigateGrid("left");
// }
// else if (e.key === "ArrowRight") {
//     navigateGrid("right");
// }
// else if (e.key === "Enter") {
//     e.preventDefault();
//     if (state.togglingSums) {
//         document.getElementById("newBoxButton").click();
//     }
// }
// else if (e.key === "Shift"){
//     document.getElementById("numberButton").click();
// }