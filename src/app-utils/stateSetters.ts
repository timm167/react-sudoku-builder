import initialState from './initialState';

export const createStateSetters = (setState) => ({
  setIsValid: (value: boolean) =>
    setState((prevState) => ({ ...prevState, isValid: value })),

  setDeletingBox: (value: boolean) =>
    setState((prevState) => ({ ...prevState, deletingBox: value })),

  setSettingBoxTotal: (value: boolean) =>
    setState((prevState) => ({ ...prevState, settingBoxTotal: value })),

  setCreatingBox: (value: boolean) =>
    setState((prevState) => ({ ...prevState, creatingBox: value })),

  setKillerMode: (value: boolean) =>
    setState((prevState) => ({ ...prevState, killerMode: value })),

  setSelectedCell: (value: any) =>
    setState((prevState) => ({ ...prevState, selectedCell: value })),

  addToBoxBeingCreated: (value: any) =>
    setState((prevState) => ({ ...prevState, boxBeingCreated: [...prevState.boxBeingCreated, value] })),

  removeFromBoxBeingCreated: () =>
    setState((prevState) => {
        let newBoxBeingCreated = prevState.boxBeingCreated.slice(0, -1)
        return { ...prevState, boxBeingCreated: newBoxBeingCreated }
    }),

  clearBoxBeingCreated: () =>
    setState((prevState) => ({ ...prevState, boxBeingCreated: [] })),

  appendBoxActionsList: (value: any) =>
    setState((prevState) => ({ ...prevState, boxActionsList: [...prevState.boxActionsList, value] })),

  removeBoxActionsList: () =>
    setState((prevState) => {
        let newBoxActionsList = prevState.boxActionsList.slice(0, -1)
        return { ...prevState, boxActionsList: newBoxActionsList }
    }),

  setIsRequestingSum: (value: boolean) =>
    setState((prevState) => ({ ...prevState, isRequestingSum: value })),

  setBoxBeingDeclared: (value: string) =>
    setState((prevState) => ({ ...prevState, boxBeingDeclared: value })),

  setCellActionsList: (col: number, row: number, value: any) => 
    setState((prevState) => ({
      ...prevState,
      cellActionsList: [...prevState.cellActionsList, { col, row, value }]
    })),

  removeCellActionsList: () =>
    setState((prevState) => { 
      const updatedList = prevState.cellActionsList.slice(0, -1);
      return {
        ...prevState,
        cellActionsList: updatedList,
      };
    }),

  setCellActionsRedoList: (col: number, row: number, value: any) => 
    setState((prevState) => ({
      ...prevState,
      cellActionsRedoList: [...prevState.cellActionsRedoList, { col, row, value }]
    })),

  removeCellActionsRedoList: () => 
    setState((prevState) => {
      const newArray = [...prevState.cellActionsRedoList];
      newArray.pop();
      return { ...prevState, cellActionsRedoList: newArray };
    }),

  clearCellActionsRedoList: () => {
    setState((prevState) => ({ ...prevState, cellActionsRedoList: [] }));
  },

  // If the array is empty, it will push the initial colors array to the currentcolorsArray
  setCurrentColorsArray: () => 
    setState((prevState) => {
      const newArray = [...prevState.currentColorsArray];
      newArray.length === 0 ? newArray.push(...initialState.currentColorsArray): newArray.pop();
      return { ...prevState, currentColorsArray: newArray };
    }),
});