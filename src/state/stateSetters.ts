import initialState from './initialState';

export const createStateSetters = (setState) => ({
  
  // ---------------------------------------------------
  // State Modifiers for Validity and Box Creation
  // ---------------------------------------------------

  setCanValidateInputs: (value: boolean) =>
    setState((prevState) => ({ ...prevState, canValidateInputs: value })),

  setCreatingBox: (value: boolean) =>
    setState((prevState) => ({ ...prevState, creatingBox: value })),

  setDeletingBox: (value: boolean) =>
    setState((prevState) => ({ ...prevState, deletingBox: value })),

  setSettingBoxTotal: (value: boolean) =>
    setState((prevState) => ({ ...prevState, settingBoxTotal: value })),


  // ---------------------------------------------------
  // State Modifiers for creating and deleting boxes
  // ---------------------------------------------------

  appendBoxBeingCreated: (value: any) =>
    setState((prevState) => ({ ...prevState, boxBeingCreated: [...prevState.boxBeingCreated, value] })),

  removeFromBoxBeingCreated: () =>
    setState((prevState) => {
      let newBoxBeingCreated = prevState.boxBeingCreated.slice(0, -1);
      return { ...prevState, boxBeingCreated: newBoxBeingCreated };
    }),

  clearBoxBeingCreated: () =>
    setState((prevState) => ({ ...prevState, boxBeingCreated: [] })),


  // ---------------------------------------------------
  // State Modifiers for Killer Mode, Cell, and Box Status
  // ---------------------------------------------------

  setKillerMode: (value: boolean) =>
    setState((prevState) => ({ ...prevState, killerMode: value })),

  setSelectedCell: (value: any) =>
    setState((prevState) => ({ ...prevState, selectedCell: value })),

  setBoxBeingDeclared: (value: string) =>
    setState((prevState) => ({ ...prevState, boxBeingDeclared: value })),

  setIsRequestingSum: (value: boolean) =>
    setState((prevState) => ({ ...prevState, isRequestingSum: value })),


  // ---------------------------------------------------
  // State Modifiers for undo/redo Cell Actions (i.e. during normal sudoku mode)  
  // ---------------------------------------------------

  setCellActionsList: (col: number, row: number, value: any) =>
    setState((prevState) => ({
      ...prevState,
      cellActionsList: [...prevState.cellActionsList, { col, row, value }],
    })),

  removeCellActionsList: () =>
    setState((prevState) => {
      const updatedList = prevState.cellActionsList.slice(0, -1);
      return { ...prevState, cellActionsList: updatedList };
    }),

  setCellActionsRedoList: (col: number, row: number, value: any) =>
    setState((prevState) => ({
      ...prevState,
      cellActionsRedoList: [...prevState.cellActionsRedoList, { col, row, value }],
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


  // ---------------------------------------------------
  // State Modifiers for Undo/Redo Box Actions (i.e. during killer mode)
  // ---------------------------------------------------

  appendBoxActionsList: (value: any) =>
    setState((prevState) => ({ ...prevState, boxActionsList: [...prevState.boxActionsList, value] })),

  popBoxActionsList: () =>
    setState((prevState) => {
      let newBoxActionsList = prevState.boxActionsList.slice(0, -1);
      return { ...prevState, boxActionsList: newBoxActionsList };
    }),

  removeFromBoxActionsList: (value: string) =>
    setState((prevState) => {
      let newBoxActionsList = prevState.boxActionsList.filter((box) => box[0] !== value);
      return { ...prevState, boxActionsList: newBoxActionsList };
    }),

  appendBoxActionsRedoList: (value: any) =>
    setState((prevState) => ({ ...prevState, boxActionsRedoList: [...prevState.boxActionsRedoList, value] })),

  popBoxActionsRedoList: () =>
    setState((prevState) => {
      let newBoxActionsRedoList = prevState.boxActionsRedoList.slice(0, -1);
      return { ...prevState, boxActionsRedoList: newBoxActionsRedoList };
    }),


  // ---------------------------------------------------
  // Special Actions for Colors Array Management
  // ---------------------------------------------------

  cycleCurrentColorsArray: () =>
    setState((prevState) => {
      const newArray = [...prevState.currentColorsArray];
      newArray.length === 0
        ? newArray.push(...initialState.currentColorsArray)
        : newArray.pop();
      return { ...prevState, currentColorsArray: newArray };
    }),
});
