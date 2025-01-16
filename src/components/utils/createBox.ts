function addCellToBox(cell, state, stateSetters, gridSetters) {
    if (cell.box !== 'noBox') {return}
    if (state.boxBeingCreated.length === 0 || checkIsAdjacent(cell, state)) {
        gridSetters.clearCellIsSelected();
        gridSetters.setIsBeingAddedToBox(cell.col, cell.row, true);
        stateSetters.addToBoxBeingCreated({col: cell.col, row: cell.row}); 
    }
}

function createBox(state, stateSetters, gridSetters, boxCounter, setBoxCounter) {
    const boxName = `box${boxCounter}`;
    for (const cell of state.boxBeingCreated){
        gridSetters.setCellBox(cell.col, cell.row, boxName);
        gridSetters.setIsBeingAddedToBox(cell.col, cell.row, false);
    }
    gridSetters.setBoxColor(boxName)
    stateSetters.setCurrentColorsArray();
    stateSetters.appendBoxActionsList(state.boxBeingCreated);
    stateSetters.clearBoxBeingCreated();
    stateSetters.setCreatingBox(false);
    setBoxCounter(boxCounter + 1);
}

function checkIsAdjacent(cell, state) {
    for (let stateCell of state.boxBeingCreated) {
        if (stateCell.col === cell.col && stateCell.row === cell.row) {
            return false;
        }
        // Checks absolute values to see if the cells are next to each other
        if (stateCell.col === cell.col && Math.abs(stateCell.row - cell.row) === 1) {
            return true;
        }
        if (stateCell.row === cell.row && Math.abs(stateCell.col - cell.col) === 1) {
            return true;
        }
        if (stateCell.col === cell.col && Math.abs(stateCell.row - cell.row) === 8) {
            return true;
        }
        if (stateCell.row === cell.row && Math.abs(stateCell.col - cell.col) === 8) {
            return true;
        }
    }
    return false;
}

export { addCellToBox, createBox }