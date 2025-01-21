
// Deletes a box from the grid and updates the state

function deleteBox(cell, state, stateSetters, gridSetters) {

    let box = cell.box;

    // Iterate through the boxActionsList to find relevant box (more efficient than using grid)
    for (let i in state.boxActionsList) {
        if (state.boxActionsList[i].boxName === box) {

            // Record a 'delete' action for undo/redo functionality
            stateSetters.appendBoxActionsList({
                boxName: box,
                cells: state.boxActionsList[i].cells,
                type: 'delete',
                color: state.boxActionsList[i].color,
                displayCell: state.boxActionsList[i].displayCell,
                declaredSum: cell['boxDeclaredSum'],
            });

            // Remove the colour from the box
            gridSetters.emptyBoxColor(box);

            // Reset the declared box sum to 0 and clear box sum
            gridSetters.clearBoxDeclaredSum(box);
            gridSetters.clearBoxSum(box);

            // Clear all cells associated with this box
            for (let cell of state.boxActionsList[i].cells) {
                clearBox(cell, gridSetters);
            }

            // Exit once the box has been processed
            return;
        }
    }
}

// Clears all properties of a single cell related to its box
function clearBox(cell, gridSetters) {

    // Reset the box name to keep data consistent
    gridSetters.setCellBox(cell.col, cell.row, 'noBox');

    // Stop displaying the box sum
    gridSetters.setIsDisplayingBoxSum(cell.col, cell.row, false);


}

export { deleteBox, clearBox };
