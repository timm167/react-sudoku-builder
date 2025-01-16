import transparentcolors from "./colors"

const initialState = {
    isValid: true,
    deletingBox: false,
    settingBoxTotal: false,
    creatingBox: false,
    boxBeingDeclared: 'someBox',
    boxBeingCreated: [], 
    boxActionsList: [], // Used for undoing box creation
    isRequestingSum: false,
    selectedCell: null,
    killerMode: false,
    cellActionsList: [],
    cellActionsRedoList: [],
    currentColorsArray: transparentcolors, // fix capitalization
}

export default initialState

 