from .utils import find_fixed, get_single_col, get_single_row, get_single_cube
from .constraints import check_box_pair, check_placement

## Iterates through the grid and finds all the impossible placements for each cell
def initialize_impossibilites(grid, impossibilities):
    fixed_cells = find_fixed(grid)
    for col in range(9):
        for cell in grid[col]: # check if cell is in the same col, row, or cube as fixed_cell
            for i in range(1, 10):
                for fixed_cell in fixed_cells:
                    if ((i == fixed_cell['value']) and (cell['col'] == fixed_cell['col'] or cell['row'] == fixed_cell['row'] or cell['cube'] == fixed_cell['cube'])):
                        impossibilities.append((cell, i))

    impossibilities = get_box_impossibilities(grid, impossibilities)

    return impossibilities



# Iterates through the grid and finds all the impossible placements from box logic
def get_box_impossibilities(grid, impossibilities):
    for col in range(9):
        for cell in grid[col]:
            if cell['boxSize'] == 0:
                continue
            diff = cell['boxDeclaredSum'] - cell['boxSum']
            for i in range(1, 10):
                if i > diff:
                    impossibilities.append((cell, i))
        
    return impossibilities

def can_permanently_disallow(cell, grid, impossibilities):
    unfixed = []
    fixed_cells = find_fixed(grid)  

    # Collect all non-fixed cells in the same box
    for box_cell in cell['boxCells']:
        grid_cell = grid[box_cell['col']][box_cell['row']]
        if not grid_cell['isFixed']:
            unfixed.append(grid[box_cell['col']][box_cell['row']])

    fixed_sum = 0
    for fixed_cell in fixed_cells:
        if fixed_cell['box'] == cell['box']:
            fixed_sum += fixed_cell['value']
    
    diff = cell['boxDeclaredSum'] - cell['boxSum']  
    for cell in unfixed:
        for i in range(1, 10):
            if i > diff:
                impossibilities.append((cell, i))
                
    if len(unfixed) == 2:
        cell1 = unfixed[0]
        cell2 = unfixed[1]
        cell1_solutions = []
        cell2_solutions = []
        for i in range(1, 10):
            for j in range(1, 10):
                if i == j:
                    continue
                if not check_box_pair(cell1, cell2, i, j):
                    continue
                if (cell1, i) in impossibilities or (cell2, j) in impossibilities:
                    continue
                if (not check_placement(cell1, i, grid, impossibilities)) or (not check_placement(cell2, j, grid, impossibilities)):
                    continue
                cell1_solutions.append((cell1, i))
                cell2_solutions.append((cell2, j))
        possible_vals = []
                        
        for solution in cell1_solutions:
            possible_vals.append(solution[1])
        
        for i in range(1, 10):
            if i not in possible_vals:
                impossibilities.append((cell, i))
        
        possible_vals = []
        for solution in cell2_solutions:
            possible_vals.append(solution[1])
        
        for i in range(1, 10):
            if i not in possible_vals:
                impossibilities.append((cell2, i))
        

    col = get_single_col(grid, cell['col'])
    row = get_single_row(grid, cell['row'])
    cube = get_single_cube(grid, cell['cube'])
    for type in [col, row, cube]:
        for connected_cell in type:
            if connected_cell['isFixed']:
                impossibilities.append((cell, connected_cell['value']))
    return impossibilities



    # Need to show if impossible rules out all values for a cell