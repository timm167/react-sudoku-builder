// This function triggers on input submission and sets the declared sum for a box

function declareBoxSum(sum, state, stateSetters, gridSetters){
    gridSetters.setBoxDeclaredSum(state.boxBeingDeclared, sum)
    stateSetters.setBoxBeingDeclared('someBox')
    stateSetters.setIsRequestingSum(false)
}

export {declareBoxSum}