import transparentColors from "./colors"

const initialState = {
    isValid: true,
    deletingBox: false,
    settingBoxTotal: false,
    creatingBox: false,
    selectedCell: null,
    killerMode: false,
    cellActionsList: [],
    cellActionsRedoList: [],
    currentColorsArray: transparentColors,
}

export default initialState

 