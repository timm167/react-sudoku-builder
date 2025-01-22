from .utils import get_single_col, get_single_row, get_single_cube, place_value
from .constraints import check_placement
from .certain_pairs import analyse_pairs
from .display import display_impossibilities

def make_certain_placements(grid, impossibilities):
    new_solves = False
    for col in range(9):
        for cell in grid[col]:
            if cell['boxSize'] == 0 or cell['isFixed']:
                continue

            last_in_type, value, abandon, sudo_pairs = last_in_type_check(cell, grid, impossibilities)
            if abandon:
                print("abandon1")
                return grid, True, impossibilities, False

            if last_in_type:
                place_value(cell, value, grid)
                new_solves = True
                continue

            if len(sudo_pairs) > 0:
                grid, abandon, impossibilities, new_solves = analyse_pairs(cell, sudo_pairs, grid, impossibilities, 'box')
                if abandon:
                    print("abandon2")
                    return grid, True, impossibilities, False

            last_in_box, value, abandon, box_pairs = last_in_box_check(cell, grid, impossibilities)
            if abandon:
                print("abandon3")
                return grid, True, impossibilities, False

            if last_in_box:
                place_value(cell, value, grid)
                new_solves = True
                continue

            if len(box_pairs) > 0:
                grid, abandon, impossibilities, new_solves = analyse_pairs(cell, box_pairs, grid, impossibilities, 'sudoku')
                
                if abandon:
                    print("abandon4")
                    return grid, True, impossibilities, False

    return grid, False, impossibilities, new_solves


def last_in_type_check(cell, grid, impossibilities):
    col = get_single_col(grid, cell['col'])
    row = get_single_row(grid, cell['row'])
    cube = get_single_cube(grid, cell['cube'])

    pairs = []
    for type in [col, row, cube]:
        empty_cells = [cell_inst for cell_inst in type if not cell_inst['isFixed']]
        if len(empty_cells) == 1:
            for i in range(1, 10):
                if check_placement(cell, i, grid, impossibilities):
                    return True, i, False, pairs
            return False, 0, True, pairs
        if len(empty_cells) == 2:
            pairs.append({'type': type, 'cells': empty_cells})
    return False, 0, False, pairs


def last_in_box_check(cell, grid, impossibilities):
    empty_cells = [grid[box_cell['col']][box_cell['row']] for box_cell in cell['boxCells'] if not grid[box_cell['col']][box_cell['row']]['isFixed']]
    pairs = []

    if len(empty_cells) == 1:
        for i in range(1, 10):
            if check_placement(cell, i, grid, impossibilities):
                return True, i, False, pairs
        return False, 0, True, pairs

    if len(empty_cells) == 2:
        pairs.append({'type': cell['box'], 'cells': empty_cells})

    return False, 0, False, pairs
