export const createGridSetters = (setGrid, state, stateSetters) => ({

    setCellValue: (row: number, col: number, value: number) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].value = value;
        return newGrid;
      }),

    setCellIsSelected: (row: number, col: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].isSelected = value;
        stateSetters.setSelectedCell(newGrid[row][col]);
        return newGrid;
      }),

    setCellIsIncorrect: (row: number, col: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].isIncorrect = value;
        return newGrid;
      }),

    setCellBox: (row: number, col: number, value: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[row][col].box = value;
        return newGrid;
      }),
    
    setBoxSum: (box: string) => 
      setGrid((prevState) => {
        const newGrid = [...prevState];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxSum = newGrid[i][j].value;
            }
          }
        }
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
    
    setBoxColor: (box: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        const color = state.currentColorsArray[state.currentColorsArray.length - 1];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxColor = color;
            }
          }
        }
        stateSetters.setCurrentColorsArray();
        return newGrid;
      })
  });