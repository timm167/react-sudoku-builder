import transparentcolors from "../utils/colors"

const initialState = {
    canValidateInputs: true,
    deletingBox: false,
    settingBoxTotal: false,
    creatingBox: false,
    boxBeingDeclared: 'someBox',
    boxBeingCreated: [], 
    boxActionsList: [], // Used for undoing box creation
    boxActionsRedoList: [], // Used for redoing box creation
    isRequestingSum: false,
    selectedCell: null,
    killerMode: false,
    cellActionsList: [],
    cellActionsRedoList: [],
    currentColorsArray: transparentcolors, // fix capitalization
}

export default initialState

 