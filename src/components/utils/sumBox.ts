function declareBoxSum(sum, state, stateSetters, gridSetters){
    gridSetters.setBoxDeclaredSum(state.boxBeingDeclared, sum)
    stateSetters.setBoxBeingDeclared('someBox')
    stateSetters.setIsRequestingSum(false)
}

export {declareBoxSum}