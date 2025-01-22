from .constraints import check_box_pair, check_placement, check_legal_pair
from .utils import extend_if_unique, get_fixed_box_sum
from .certain_placements import place_value
from .display import display_impossibilities

def analyse_pairs(cell, sudo_pairs, grid, impossibilities, type):
    if type == 'sudoku':
        fixed_cells, abandon, impossible = check_sudoku_pair_logic(sudo_pairs, grid, impossibilities)
    else:
        fixed_cells, abandon, impossible = check_box_pair_logic(sudo_pairs, cell, grid, impossibilities)

    if abandon:
        return grid, True, impossibilities, False

    impossibilities = extend_if_unique(impossible, impossibilities)
    for fixed_cell in fixed_cells:
        place_value(fixed_cell[0], fixed_cell[1], grid)

    if len(fixed_cells) > 0:
        return grid, False, impossibilities, True
    
    return grid, False, impossibilities, False

def check_sudoku_pair_logic(sudo_pairs, grid, impossibilities):
    for pair in sudo_pairs:
        cell1 = pair['cells'][0]
        cell2 = pair['cells'][1]
        cell1_solutions = []
        cell2_solutions = []
        fixed_cells = []

    for i in range(1, 10):
        for j in range(1, 10):
            if i == j:
                continue
            if ((cell1, i) in impossibilities ) or ((cell2, j) in impossibilities):
                continue
            if not check_box_pair(cell1, cell2, i, j):
                continue
            if (not check_placement(cell1, i, grid, impossibilities)) or (not check_placement(cell2, j, grid, impossibilities)):
                
                continue
            cell1_solutions.append((cell1, i))
            cell2_solutions.append((cell2, j))

    if len(cell1_solutions) == 0 or len(cell2_solutions) == 0:
        print("no possible solutions")
        return fixed_cells, True, impossibilities

    if len(cell1_solutions) == 1 or len(cell2_solutions) == 1:
        fixed_cells.append(cell1_solutions[0])
        fixed_cells.append(cell2_solutions[0])
    else:
        impossibilities = extend_if_unique(get_impossible_vals(cell1, cell1_solutions), impossibilities)
        impossibilities = extend_if_unique(get_impossible_vals(cell2, cell2_solutions), impossibilities)

    return fixed_cells, False, impossibilities


def check_box_pair_logic(box_pairs, cell, grid, impossibilities):
    fixed_box_sum = get_fixed_box_sum(cell, grid)
    diff = cell['boxDeclaredSum'] - fixed_box_sum

    cell1 = box_pairs[0]['cells'][0]
    cell2 = box_pairs[0]['cells'][1]
    cell1_solutions = []
    cell2_solutions = []
    fixed_cells = []

    for i in range(1, 10):
        for j in range(1, 10):
            if i + j != diff:
                continue

            if check_legal_pair(i, j, cell1, cell2, grid, impossibilities):
                cell1_solutions.append((cell1, i))
                cell2_solutions.append((cell2, j))

    if len(cell1_solutions) == 0 or len(cell2_solutions) == 0:
        grid[cell1['col']][cell1['row']]['isIncorrect'] = True
        return fixed_cells, True, impossibilities

    if len(cell1_solutions) == 1 or len(cell2_solutions) == 1:
        fixed_cells.append(cell1_solutions[0])
        fixed_cells.append(cell2_solutions[0])
    else:
        impossibilities = extend_if_unique(get_impossible_vals(cell1, cell1_solutions), impossibilities)
        impossibilities = extend_if_unique(get_impossible_vals(cell2, cell2_solutions), impossibilities)

    return fixed_cells, False, impossibilities


def get_impossible_vals(cell, cell_solutions):
    possible_vals = [solution[1] for solution in cell_solutions]
    not_possible = []

    for i in range(1, 10):
        if i not in possible_vals:
            not_possible.append((cell, i))
    return not_possible