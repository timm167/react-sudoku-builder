import transparentcolors from "../utils/colors";

type SelectedCell = { col: number; row: number } | null;

// The structure of the entire initial state
type InitialState = {
  canValidateInputs: boolean; // Indicates if inputs can currently be validated
  deletingBox: boolean; // Tracks if a box is being deleted
  settingBoxTotal: boolean; // Tracks if a box's total is being set
  creatingBox: boolean; // Tracks if a box is being created
  boxBeingDeclared: string; // Name of the box being declared
  boxBeingCreated: string[]; // List of cells in the box being created
  boxActionsList: any[]; // List of actions performed on boxes
  boxActionsRedoList: any[]; // List of redoable actions for boxes
  isRequestingSum: boolean; // Tracks if the user is requesting a sum display
  selectedCell: SelectedCell; // Currently selected cell in the grid
  killerMode: boolean; // Indicates if killer Sudoku mode is active
  cellActionsList: any[]; // List of actions performed on cells
  cellActionsRedoList: any[]; // List of redoable actions for cells
  currentColorsArray: string[]; // Array of available colours for boxes
};

// Initial state definition with concise comments explaining default values
const initialState: InitialState = {
  canValidateInputs: true, // Inputs are initially valid
  deletingBox: false, // No box is being deleted
  settingBoxTotal: false, // Not setting a box's total
  creatingBox: false, // Not creating a box
  boxBeingDeclared: 'someBox', // Default placeholder for the box name
  boxBeingCreated: [], // No cells assigned to a box yet
  boxActionsList: [], // No box actions performed initially
  boxActionsRedoList: [], // No redoable box actions initially
  isRequestingSum: false, // Not requesting a sum display
  selectedCell: null, // No cell selected at the start
  killerMode: false, // Killer Sudoku mode is inactive
  cellActionsList: [], // No cell actions performed initially
  cellActionsRedoList: [], // No redoable cell actions initially
  currentColorsArray: transparentcolors, // Initialised with default colour set
};

export default initialState;
