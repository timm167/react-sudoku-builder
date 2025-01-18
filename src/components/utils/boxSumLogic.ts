function checkBoxSumIsValid(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].boxSum !== 0 && grid[i][j].boxSum > grid[i][j].boxDeclaredSum) {
                return false;
            }
        }
    }
    return true;
}

// This function triggers on input submission and sets the declared sum for a box
function declareBoxSum(sum, state, stateSetters, gridSetters){
    gridSetters.setBoxDeclaredSum(state.boxBeingDeclared, sum)
    stateSetters.setBoxBeingDeclared('someBox')
    stateSetters.setIsRequestingSum(false)
}


export { checkBoxSumIsValid, declareBoxSum };