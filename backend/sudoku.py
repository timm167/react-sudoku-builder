from .impossible_placements import initialize_impossibilites, can_permanently_disallow
from .certain_placements import make_certain_placements, last_in_box_check, last_in_type_check, place_value
from .constraints import check_placement
from .utils import get_num_incomplete

def win_sudoku(grid, recursions):
    print("Sudoku solved")
    print("Recursions:", recursions)
    return True, 1, grid


def lose_sudoku(grid, recursions):
    print("No solution found")
    print("Recursions:", recursions)
    return False, 0, grid


def solve_sudoku(grid):
    num_incomplete = get_num_incomplete(grid)
    grid, abandon, impossibilities, solves = make_certain_placements(grid)
    if abandon:
        return lose_sudoku(grid, 0)
    recursions = 0
    num_incomplete -= solves
    while solves > 0:
        if num_incomplete == 0:
            return win_sudoku(grid, recursions)
        grid, abandon, impossibilities, solves = make_certain_placements(grid, impossibilities, 0)
        if abandon:
            return lose_sudoku(grid, recursions)
        recursions += 1
        num_incomplete -= solves

    print("Ruling out extras")
    impossibilites = initialize_impossibilites(grid, impossibilities)

    print("Trying basic placements again")
    
    grid, abandon, impossibilities, solves = make_certain_placements(grid)
    if abandon:
        return lose_sudoku(grid, 0)
    recursions = 0
    num_incomplete -= solves
    while solves > 0:
        if num_incomplete == 0:
            return win_sudoku(grid, recursions)
        grid, abandon, impossibilities, solves = make_certain_placements(grid, impossibilities, 0)
        if abandon:
            return lose_sudoku(grid, recursions)
        recursions += 1
        num_incomplete -= solves
    
    print("Now we recurse")
    solved, ways, solved_grid = recurse_sudoku(grid, impossibilities)

    return solved, ways, solved_grid
   






def recurse_sudoku(grid, impossibilities, disallowed_placements=[], temp_filled_cells=[], recursive_calls=0):
    
    recursive_calls += 1
    
    # Stop if we have exceeded the maximum recursion depth
    if recursive_calls > 50000:
        print("Recursion depth exceeded")
        return False, 0, grid

    empty_cell = find_empty_cell(grid, temp_filled_cells)

    # Base case: if there are no empty cells, the puzzle is solved
    if not empty_cell:
        print("No empty cell found. Sudoku is solved.")
        print("Recursive calls:", recursive_calls)
        print("Grid:", grid)
        return True, 1, grid ## I can re-recurse here to find other solutions
    

    last, i, abandon = last_in_type_check(empty_cell, grid, impossibilities)
    if not last:
        last, i, abandon = last_in_box_check(empty_cell, grid, impossibilities)

    if abandon:
        return False, 0, grid
    
    if last:
        grid[empty_cell['col']][empty_cell['row']]['value'] = i
        grid[empty_cell['col']][empty_cell['row']]['isFixed'] = True
        grid[empty_cell['col']][empty_cell['row']]['boxSum'] += i
        grid[empty_cell['col']][empty_cell['row']]['unfilledBoxCells'] -= 1
        recurse_sudoku(grid, impossibilities, disallowed_placements, temp_filled_cells, recursive_calls)

    impossibilities = can_permanently_disallow(empty_cell, grid, impossibilities)
    
    impossible_count = 0

    for i in range(1, 10):
        print("temp_filled_cells",temp_filled_cells)
        print(impossible_count)

        if impossible_count == 8:
            return False, 0, grid
        
        # Check if already ruled this out completely
        if (empty_cell, i) in impossibilities:
            print("impossible placement")
            impossible_count += 1
            continue

        # Check if we've already tried this placement this recursion
        if (empty_cell, i) in disallowed_placements:
            print("disallowed placement")
            continue

        if check_placement(empty_cell, i, grid, impossibilities):
            grid[empty_cell['col']][empty_cell['row']]['value'] = i
            grid[empty_cell['col']][empty_cell['row']]['boxSum'] += i
            grid[empty_cell['col']][empty_cell['row']]['unfilledBoxCells'] -= 1
            temp_filled_cells.append(empty_cell)
            recurse_sudoku(grid, impossibilities, disallowed_placements, temp_filled_cells, recursive_calls)

        disallowed_placements.append((empty_cell, i))
    
    temp_filled_cells.pop()
    recurse_sudoku(grid, impossibilities, disallowed_placements, temp_filled_cells, recursive_calls)



    return False, 0, grid
# Find the next empty cell in the grid
def find_empty_cell(grid, temp_filled_cells):
    for row in grid:
        for cell in row:
            if cell['value'] == 0 and cell not in temp_filled_cells:
                return cell
    return None