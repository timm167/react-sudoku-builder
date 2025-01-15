import transparentcolors from "./colors"

const initialState = {
    isValid: true,
    deletingBox: false,
    settingBoxTotal: false,
    creatingBox: false,
    selectedCell: null,
    killerMode: false,
    cellActionsList: [],
    cellActionsRedoList: [],
    currentcolorsArray: transparentcolors,
}

export default initialState

 