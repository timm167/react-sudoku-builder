// Utility function to handle grid navigation
function navigateGrid(direction, grid, state, stateSetters, gridSetters, inputRefs) {
    const { col, row } = state.selectedCell;

    let newCol = col;
    let newRow = row;

    // Determine new position based on direction
    switch (direction) {
        case "ArrowUp":
            newRow = row === 0 ? 8 : row - 1; // Wrap to last row if at the top
            break;
        case "ArrowDown":
            newRow = row === 8 ? 0 : row + 1; // Wrap to first row if at the bottom
            break;
        case "ArrowLeft":
            newCol = col === 0 ? 8 : col - 1; // Wrap to last column if at the leftmost
            break;
        case "ArrowRight":
            newCol = col === 8 ? 0 : col + 1; // Wrap to first column if at the rightmost
            break;
        default:
            return;
    }

    // Update selected cell in state and grid
    gridSetters.setCellIsSelected(col, row, false);
    gridSetters.setCellIsSelected(newCol, newRow, true);
    stateSetters.setSelectedCell(grid[newCol][newRow]);

    // Focus on the newly selected cell
    inputRefs.current[newCol][newRow].current.focus();
}

// Main function to create the keyboard manager
export const createKeyboardManager = (grid, state, stateSetters, gridSetters, inputRefs, buttonInputRefs) => {
    return (e) => {
        // Only trigger navigation if there's a selected cell and a relevant arrow key is pressed
        if (state.selectedCell && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            navigateGrid(e.key, grid, state, stateSetters, gridSetters, inputRefs);
        } else if (e.key === "Backspace" && (e.ctrlKey || e.shiftKey)) {
            buttonInputRefs.redoButton.current.click();
        } else if (e.key === "Backspace") {
            buttonInputRefs.undoButton.current.click();
        }
        //cmd s to save
        // add everything else tomorrow and tonight just go and eat a bagel


    };
};
