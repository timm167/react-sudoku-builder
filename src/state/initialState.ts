import transparentcolors from "../utils/colors";

interface CellAction {
    col: number; // The column index of the cell
    row: number; // The row index of the cell
    from: number; // The value before the action 
    to: number; // The value after the action 
    isIncorrect: boolean; // A flag indicating whether the cell is incorrect
    box: string; // The box the cell belongs to
  }

interface BoxAction {
    boxName: string; // The name of the box
    cells: { col: number; row: number }[]; // Array of cells with their column and row
    type: 'create' | 'delete'; // Action type: create or delete
    color: string; // The color associated with the box
    displayCell: { col: number; row: number }; // The cell that will display the sum or details of the box
    declaredSum: number; // The declared sum of the box
}

type SelectedCell = { col: number; row: number } | null;

// The structure of the entire initial state
type InitialState = {
  canValidateInputs: boolean; // Indicates if inputs can currently be validated
  deletingBox: boolean; // Tracks if a box is being deleted
  settingBoxTotal: boolean; // Tracks if a box's total is being set
  creatingBox: boolean; // Tracks if a box is being created
  boxBeingDeclared: string; // Name of the box being declared
  boxBeingCreated: string[]; // List of cells in the box being created
  boxActionsList: BoxAction[]; // List of actions performed on boxes
  boxActionsRedoList: BoxAction[]; // List of redoable actions for boxes
  isRequestingSum: boolean; // Tracks if the user is requesting a sum display
  selectedCell: SelectedCell; // Currently selected cell in the grid
  killerMode: boolean; // Indicates if killer Sudoku mode is active
  cellActionsList: CellAction[]; // List of actions performed on cells
  cellActionsRedoList: CellAction[]; // List of redoable actions for cells
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

export type { SelectedCell, BoxAction, CellAction, InitialState };