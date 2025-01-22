from .utils import find_fixed, get_single_col, get_single_row, get_single_cube, append_if_unique, extend_if_unique
from .constraints import check_box_pair, check_placement
from .box_sum_optimization import optimize_box_sums

## Iterates through the grid and finds all the impossible placements for each cell. Only called with clear temp cells
def get_impossibilities(grid, impossibilities=None):
    if impossibilities is None:
        impossibilities = []

    fixed_cells = find_fixed(grid)
    for col in range(9):
        for cell in grid[col]: # check if cell is in the same col, row, or cube as fixed_cell
            for i in range(1, 10):
                for fixed_cell in fixed_cells:
                    if ((i == fixed_cell['value']) and (cell['col'] == fixed_cell['col'] or cell['row'] == fixed_cell['row'] or cell['cube'] == fixed_cell['cube'])):
                        impossibilities = append_if_unique(cell, i, impossibilities)

    impossibilities = get_box_impossibilities(grid, impossibilities)

    return impossibilities

# Iterates through the grid and finds all the impossible placements from box logic. Only called with clear temp cells
def get_box_impossibilities(grid, impossibilities):
    for col in range(9):
        for cell in grid[col]:
            if cell['boxSize'] == 0:
                continue
            diff = cell['boxDeclaredSum'] - cell['boxSum']
            box_min, box_max = get_min_max(cell, diff, grid, impossibilities)
            for i in range(1, 10):
                if i < box_min or i > box_max:
                    impossibilities = append_if_unique(cell, i, impossibilities)
    return impossibilities


def can_permanently_disallow(cell, i, grid, impossibilities):
    col = get_single_col(grid, cell['col'])
    row = get_single_row(grid, cell['row'])
    cube = get_single_cube(grid, cell['cube'])
    for type in [col, row, cube]:
        for connected_cell in type:
            if connected_cell['isFixed'] and connected_cell['value'] == i:
                impossibilities = append_if_unique(cell, i, impossibilities)
    return impossibilities


## Only called with clear temp cells (NEVER WITHIN RECURSIVE CALLS)
def get_min_max(cell, diff, grid, impossibilities):
    res_list = [0, 0, 1, 3, 6, 10, 15, 21, 28, 36]
    num_empty = cell['unfilledBoxCells']
    empty_box_cells = [box_cell for box_cell in cell['boxCells'] if box_cell['value'] == 0]

    if num_empty == 1:
        return diff, diff

    restrictions = get_restrictions(cell, num_empty, empty_box_cells)
    restriction_value = res_list[restrictions - 1]

    box_min = (diff - 9*(num_empty - 1)) + restriction_value
    box_max = ((diff + 1) - num_empty) - restriction_value 

    box_min, box_max = optimize_box_sums(cell, box_min, box_max, restrictions, grid, impossibilities)

    return box_min, box_max

def get_restrictions(cell, num_empty, empty_box_cells):
    res_box = []
    free_cells = 0

    for box_cell in empty_box_cells:
        # Check if all cells share the same col, row, or cube
        if all(cell['col'] == box_cell['col'] for cell in empty_box_cells) or \
        all(cell['row'] == box_cell['row'] for cell in empty_box_cells) or \
        all(cell['cube'] == box_cell['cube'] for cell in empty_box_cells):
            restrictions = num_empty
            return restrictions
        
        if not any(box_cell['col'] == res['col'] for res in res_box) and \
        not any(box_cell['row'] == res['row'] for res in res_box) and \
        not any(box_cell['cube'] == res['cube'] for res in res_box):
            free_cells += 1
        
        res_box.append(box_cell)

    # Calculate restrictions
    restrictions = num_empty - free_cells
    return restrictions
    