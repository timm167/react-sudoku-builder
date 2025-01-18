function checkBoxSumIsValid(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].boxSum !== 0 && grid[i][j].boxSum > grid[i][j].boxDeclaredSum) {
                return false;
            }
            if (checkIfBoxFull(grid[i][j], grid) && grid[i][j].boxSum !== grid[i][j].boxDeclaredSum) {
                return false;
            }
        }
    }
    return true;
}

function checkIsValidAddition(cell, value) {
    if (cell.boxDeclaredSum === 0) {
        return true;
    }

    if (checkIfBoxFull(cell, cell.grid)) {
        if (cell.boxSum + value !== cell.boxDeclaredSum) {
            return false;
        }
    }
    const newSum = cell.boxSum + value;
    if (newSum > cell.boxDeclaredSum) {
        return false;
    }
    return true;
}


function checkIfBoxFull(cell, grid) {
    const box = cell.box;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].box === box && grid[i][j].value === 0) {
                return false;
            }
        }
    }
    return true;
}


// This function triggers on input submission and sets the declared sum for a box
function declareBoxSum(sum, state, stateSetters, gridSetters){
    if (sum === 0) {return} /////
    gridSetters.setBoxDeclaredSum(state.boxBeingDeclared, sum)
    stateSetters.setBoxBeingDeclared('someBox')
    stateSetters.setIsRequestingSum(false)
}


export { checkBoxSumIsValid, declareBoxSum, checkIsValidAddition };