// Cube index is used to group cells into 3x3 sub-grids
function getCubeIndex(col: number, row: number): number {
  return Math.floor(col / 3) * 3 + Math.floor(row / 3);
}

// Define the Cell interface
// Represents the structure of a single cell in the grid
export interface Cell {
  id: string;                  // Unique identifier for the cell (e.g., "0-0")
  col: number;                 // Column index of the cell
  row: number;                 // Row index of the cell
  cube: number;                // Cube (3x3 sub-grid) index for the cell
  value: number;               // Value of the cell (0 represents empty)
  isSelected: boolean;         // Indicates if the cell is currently selected
  isIncorrect: boolean;        // Indicates if the cell violates a constraint
  isBeingAddedToBox: boolean;  // Tracks if the cell is being added to a box
  box: string;                 // Name of the box the cell belongs to (or 'noBox')
  boxSum: number;              // Calculated sum of the box the cell belongs to
  boxDeclaredSum: number;      // Declared sum of the box the cell belongs to
  boxColor: string;            // Colour associated with the box
  boxSize: number;             // Number of cells in the box
  isDisplayingBoxSum: boolean; // Determines if the box sum should be displayed
  isFixed: boolean;            // Indicates if the cell is fixed (cannot be modified) (backend use only)
  unfilledBoxCells: number;    // Number of cells in the box that are not filled (backend use only)
  boxCells: { col: number; row: number, cube: number, value: number }[]; // Array of cells in the box (backend use only)
}

// Helper function to initialise a single cell
// Creates a new cell with default values based on its column and row
function initializeCell(col: number, row: number): Cell {
  return {
    id: `${col}-${row}`,             
    col: col,                        
    row: row,                        
    cube: getCubeIndex(col, row),    
    value: 0,                        
    isSelected: false,               
    isIncorrect: false,              
    isBeingAddedToBox: false,        
    box: 'noBox',                    
    boxSum: 0,                       
    boxDeclaredSum: 0,               
    boxColor: '',
    boxSize: 0,                    
    isDisplayingBoxSum: false,      
    isFixed: false,       
    unfilledBoxCells: 0,         
    boxCells: []   
  };
}

// Helper function to initialise a 9x9 grid of cells
// Returns a 2D array of cells, accessible as grid[col][row]
function initializeGrid(): Cell[][] {
  const grid: Cell[][] = []; // Initialise the grid as an empty 2D array

  // Iterate over each column (0-8)
  for (let col = 0; col < 9; col++) {

    // Initialise a new row array for each column
    const rowArray: Cell[] = []; 
    for (let row = 0; row < 9; row++) {

      // Add a new cell to the row array
      rowArray.push(initializeCell(col, row)); 
    }
    // Add the completed row to the grid
    grid.push(rowArray); 
  }

  return grid; // Return the fully initialised 9x9 grid
}

export { initializeGrid };
