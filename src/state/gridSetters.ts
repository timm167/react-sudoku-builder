export const createGridSetters = (setGrid, state, stateSetters) => ({

  populateGrid: (newGrid) =>
    setGrid(() => {
      return newGrid; // Set the grid to the new grid passed in
    }),
  
  // ---------------------------------------------------
  // Grid Setters for changing and evaluating cell values 
  // ---------------------------------------------------

  setCellValue: (col: number, row: number, value: number) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].value = value;
      return newGrid;
    }),

  setCellIsIncorrect: (col: number, row: number, value: boolean) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].isIncorrect = value;
      return newGrid;
    }),


  // ---------------------------------------------------
  // Grid Setters for changing which cells are selected
  // ---------------------------------------------------

  setCellIsSelected: (col: number, row: number, value: boolean) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].isSelected = value;
      stateSetters.setSelectedCell(newGrid[col][row]);
      return newGrid;
    }),

  clearCellIsSelected: () =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          newGrid[i][j].isSelected = false;
        }
      }
      return newGrid;
    }),

  clearCellIsSelectedExcept: (col: number, row: number) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (i !== col || j !== row) {
            newGrid[i][j].isSelected = false;
          }
        }
      }
      return newGrid;
    }),


  // ---------------------------------------------------
  // Grid Setters for setting cells box and box related values
  // ---------------------------------------------------

  setCellBox: (col: number, row: number, value: string) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].box = value;
      return newGrid;
    }),

  setIsBeingAddedToBox: (col: number, row: number, value: boolean) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].isBeingAddedToBox = value;
      return newGrid;
    }),

  setIsDisplayingBoxSum: (col: number, row: number, value: boolean) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].isDisplayingBoxSum = value;
      return newGrid;
    }),

  clearGridIsHavingBoxCreated: () =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          newGrid[i][j].isBeingAddedToBox = false;
        }
      }
      stateSetters.clearBoxBeingCreated();
      return newGrid;
    }),

  setBoxCells: (col: number, row: number, value: any) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      newGrid[col][row].boxCells = value;
      return newGrid;
    }),

    
  // ---------------------------------------------------
  // State Modifiers for Box Sum and Declaration
  // ---------------------------------------------------

  applyBoxSum: (box: string) =>
    setGrid((prevState) => {

      // Iterates through totaling the values of the cells in the box
      const newGrid = [...prevState];
      let newSum = 0;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newSum += newGrid[i][j].value;
          }
        }
      }

      // Iterates through again setting the boxSum to the sum of values
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxSum = newSum;
          }
        }
      }
      return newGrid;
    }),

  clearBoxSum: (box: string) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxSum = 0;
          }
        }
      }
      return newGrid;
    }),
  


    addToBoxSum: (box: string, value: number) =>
      setGrid((prevState) => {
        // Create a new grid where only the necessary cells are updated immutably
        const newGrid = prevState.map(row =>
          row.map(cell =>
            cell.box === box
              ? { ...cell, boxSum: cell.boxSum + value } // Create a new object with updated boxSum
              : cell // Return the original cell if no changes are needed
          )
        );
        return newGrid;
      }),
    
    subFromBoxSum: (box: string, value: number) =>
      setGrid((prevState) => {
        // Create a new grid where only the necessary cells are updated immutably
        const newGrid = prevState.map(row =>
          row.map(cell =>
            cell.box === box
              ? { ...cell, boxSum: cell.boxSum - value } // Create a new object with updated boxSum
              : cell // Return the original cell if no changes are needed
          )
        );
        return newGrid;
      }),
    
  setBoxDeclaredSum: (box: string, sum: number) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxDeclaredSum = sum;
          }
        }
      }
      return newGrid;
    }),

  clearBoxDeclaredSum: (box: string) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxDeclaredSum = 0;
          }
        }
      }
      return newGrid;
    }),


  // ---------------------------------------------------
  // State Modifiers for Box Color Management
  // ---------------------------------------------------
  setBoxColor: (box: string) =>
    setGrid((prevState) => {
      const color = state.currentColorsArray[state.currentColorsArray.length - 1];
  
      // Create a new grid with updated cells
      const newGrid = prevState.map(row =>
        row.map(cell => {
          if (cell.box === box) {
            // Return a new object with updated boxColor
            return { ...cell, boxColor: color };
          }
          return cell; // Return the cell unchanged if box doesn't match
        })
      );
  
      // Cycle the current colours array after updating the grid
      stateSetters.cycleCurrentColorsArray();
  
      return newGrid; // Return the updated grid
    }),
  

  setSpecifiedBoxColor: (box: string, color: string) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxColor = color;
          }
        }
      }
      return newGrid;
    }),

  emptyBoxColor: (box: string) =>
    setGrid((prevState) => {
      const newGrid = [...prevState];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (newGrid[i][j].box === box) {
            newGrid[i][j].boxColor = '';
          }
        }
      }
      return newGrid;
    }),
});
