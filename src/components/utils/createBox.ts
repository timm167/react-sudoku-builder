
// Adds a cell to the box being created if conditions are met
// Used in the Grid component when creatingBox is true

function addCellToBox(cell, state, stateSetters, gridSetters) {
    // Skip if the cell is already part of a box
    if (cell.box !== 'noBox') {return}

    // Check if the boxBeingCreated is empty or if the cell is adjacent to it
    if (state.boxBeingCreated.length === 0 || checkIsAdjacent(cell, state)) {
        
        // Clear any currently selected cells
        gridSetters.clearCellIsSelected();

        // Mark the cell as being added to the box
        gridSetters.setIsBeingAddedToBox(cell.col, cell.row, true);

        // Append the cell to the current box being created
        stateSetters.appendBoxBeingCreated({ col: cell.col, row: cell.row });
    }
}

// Finalises the creation of a box and updates the state accordingly
function createBox(state, stateSetters, gridSetters, boxCounter, setBoxCounter) {

    // Generate a unique name for the new box using the boxCounter from Killer.tsx
    const boxName = `box${boxCounter}`;
    
    // Initialise the cell to display the box sum
    let cellToDisplay = state.boxBeingCreated[0];

    // Iterate through all cells in the boxBeingCreated for two purposes:
    for (const cell of state.boxBeingCreated) {

        // 1. Find the top left cell to display the box sum
        if (
            cell.col < cellToDisplay.col || 
            (cell.col === cellToDisplay.col && cell.row < cellToDisplay.row)
        ) {
            cellToDisplay = cell;
        }

        // 2. Assign the box name and reset the isBeingAddedToBox state
        gridSetters.setCellBox(cell.col, cell.row, boxName);
        gridSetters.setIsBeingAddedToBox(cell.col, cell.row, false);
    }

    // Display the box sum at the top-left cell (will only show if non-zero)
    gridSetters.setIsDisplayingBoxSum(cellToDisplay.col, cellToDisplay.row, true);

    // Assign a colour to the box and update the grid
    gridSetters.setBoxColor(boxName);

    // Move to the next color for future actions
    stateSetters.cycleCurrentColorsArray();

    // Record a 'create' action for undo/redo functionality
    stateSetters.appendBoxActionsList({
        boxName: boxName,
        cells: state.boxBeingCreated,
        type: 'create',
        color: state.currentColorsArray[state.currentColorsArray.length - 1],
        displayCell: cellToDisplay,
    });

    // Clear the current boxBeingCreated state
    stateSetters.clearBoxBeingCreated();

    // Increment the box counter for the next box creation
    setBoxCounter(boxCounter + 1);
}

// Checks if a cell is adjacent to the cells in the boxBeingCreated
function checkIsAdjacent(cell, state) {
    for (const stateCell of state.boxBeingCreated) {
        // If the cell already exists in the boxBeingCreated, return false
        if (stateCell.col === cell.col && stateCell.row === cell.row) {
            return false;
        }

        // Check adjacency in 9x9 grid, including edge cases
        if (
            (stateCell.col === cell.col && Math.abs(stateCell.row - cell.row) === 1) || 
            (stateCell.row === cell.row && Math.abs(stateCell.col - cell.col) === 1) || 
            (stateCell.col === cell.col && Math.abs(stateCell.row - cell.row) === 8) || 
            (stateCell.row === cell.row && Math.abs(stateCell.col - cell.col) === 8)
        ) {
            return true;
        }
    }

    // No adjacent cells found
    return false;
}

export { addCellToBox, createBox };
