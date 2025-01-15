export const createGridSetters = (setGrid, state, stateSetters) => ({

    setCellValue: (col: number, row: number, value: number) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[col][row].value = value;
        return newGrid;
      }),

    setCellIsSelected: (col: number, row: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[col][row].isSelected = value;
        stateSetters.setSelectedCell(newGrid[col][row]);
        return newGrid;
      }),

    setCellIsIncorrect: (col: number, row: number, value: boolean) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[col][row].isIncorrect = value;
        return newGrid;
      }),

    setCellBox: (col: number, row: number, value: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        newGrid[col][row].box = value;
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
    
    setBoxcolor: (box: string) =>
      setGrid((prevState) => {
        const newGrid = [...prevState];
        const color = state.currentcolorsArray[state.currentcolorsArray.length - 1];
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (newGrid[i][j].box === box) {
              newGrid[i][j].boxcolor = color;
            }
          }
        }
        stateSetters.setCurrentcolorsArray();
        return newGrid;
      })
  });