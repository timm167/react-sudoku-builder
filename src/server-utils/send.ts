function getEmptyBoxCells(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellBox = grid[i][j].boxCells;
            let emptyCells = 0
            for (let cell of cellBox){
                if (cell.value === 0){
                    emptyCells += 1
                }
            }
            for (let cell of cellBox){
                grid[cell.col][cell.row].unfilledBoxCells = emptyCells
            }
        }
    }
    return grid
}

function applyBoxSizes(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            grid[i][j].boxSize = grid[i][j].boxCells.length
        }
    }
}

function applyBoxCellValues(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < grid[i][j].boxCells.length; k++) {
                let cell = grid[i][j].boxCells[k]
                grid[i][j].boxCells[k].value = grid[cell.col][cell.row].value
                grid[i][j].boxCells[k].cube = grid[cell.col][cell.row].cube
            }
        }
    }
}



export { getEmptyBoxCells, applyBoxSizes, applyBoxCellValues };