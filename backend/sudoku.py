from backend.impossible_placements import check_is_impossible

def solve_sudoku(grid, empty_cell=None, filled_cells=[], disallowed_placements=[], impossible_placements=[], recursive_calls=0):
    recursive_calls += 1
    
    # Stop if we have exceeded the maximum recursion depth
    if recursive_calls > 50000:
        print("Recursion depth exceeded")
        return False, 0, grid

    empty_cell = find_empty_cell(grid, filled_cells)

    # Base case: if there are no empty cells, the puzzle is solved
    if not empty_cell:
        print("No empty cell found. Sudoku is solved.")
        return False, 1, grid
    
    for i in range(1, 10):

        # Check if already ruled this out completely
        if (empty_cell, i) in impossible_placements:
            continue

        
        # Check if we've already tried this placement this recursion
        if (empty_cell, i) in disallowed_placements:
            continue

        # Check if this should be ruled out as impossible
        if check_is_impossible(grid, empty_cell, i):
            impossible_placements.append((empty_cell, i))
            continue







# Find the next empty cell in the grid
def find_empty_cell(grid, filled_cells):
    for row in grid:
        for cell in row:
            if cell['actualValue'] == 0 and cell not in filled_cells:
                return cell
    return None