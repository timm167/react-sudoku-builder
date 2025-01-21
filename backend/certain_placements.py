from .impossible_placements import find_fixed
from .utils import get_single_col, get_single_row, get_single_cube   
from .constraints import check_placement, check_box_pair, check_legal_pair
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.info("Starting Sudoku Solver API")

def place_value(cell, value, grid):
    logger.debug(f"Placing value {value} in cell ({cell['col']}, {cell['row']})")
    cell['value'] = value
    cell['isFixed'] = True
    grid[cell['col']][cell['row']] = cell

    for box_cell in cell['boxCells']:
        grid[box_cell['col']][box_cell['row']]['unfilledBoxCells'] -= 1
        grid[box_cell['col']][box_cell['row']]['boxSum'] += value
        logger.debug(f"Updated box cell ({box_cell['col']}, {box_cell['row']}): "
                     f"unfilledBoxCells={grid[box_cell['col']][box_cell['row']]['unfilledBoxCells']}, "
                     f"boxSum={grid[box_cell['col']][box_cell['row']]['boxSum']}")
    return grid


def make_certain_placements(grid, impossibilities=[], solves=0):
    for col in range(9):
        for cell in grid[col]:
            if solves > 100:
                logger.debug(f"Terminating early as solves={solves}")
                return grid, True, impossibilities, solves

            logger.debug(f"Checking cell ({cell['col']}, {cell['row']})")
            
            if cell['boxSize'] == 0 or cell['isFixed']:
                logger.debug(f"Skipping cell ({cell['col']}, {cell['row']}): "
                             f"boxSize={cell['boxSize']}, isFixed={cell['isFixed']}")
                continue

            last_in_type, value, abandon, sudo_pairs = last_in_type_check(cell, grid, impossibilities)
            if abandon:
                logger.debug("Abandoning: No solutions in last_in_type_check.")
                return grid, True, impossibilities, solves

            if last_in_type:
                logger.debug(f"Cell ({cell['col']}, {cell['row']}) is last in type with value={value}.")
                place_value(cell, value, grid)
                solves += 1
                continue

            if len(sudo_pairs) > 0:
                logger.debug(f"Sudo pairs exist for cell ({cell['col']}, {cell['row']}).")
                fixed_cells, abandon, impossible = check_sudoku_pair_logic(sudo_pairs, grid, impossibilities)
                if abandon:
                    logger.debug("Abandoning: No solutions in check_sudoku_pair_logic.")
                    return grid, True, impossibilities, solves
                impossibilities.extend(impossible)
                for fixed_cell in fixed_cells:
                    logger.debug(f"Fixing cell ({fixed_cell[0]['col']}, {fixed_cell[0]['row']}) with value={fixed_cell[1]}.")
                    place_value(fixed_cell[0], fixed_cell[1], grid)
                    solves += 1

            last_in_box, value, abandon, box_pairs = last_in_box_check(cell, grid, impossibilities)
            if abandon:
                logger.debug("Abandoning: No solutions in last_in_box_check.")
                return grid, True, impossibilities, solves

            if last_in_box:
                logger.debug(f"Cell ({cell['col']}, {cell['row']}) is last in box with value={value}.")
                place_value(cell, value, grid)
                solves += 1
                continue

            if len(box_pairs) > 0:
                logger.debug(f"Box pairs exist at cell ({cell['col']}, {cell['row']}).")
                fixed_cells, abandon, impossible = check_box_pair_logic(box_pairs, cell, grid, impossibilities)
                if abandon:
                    logger.debug("Abandoning: No solutions in check_box_pair_logic.")
                    return grid, True, impossibilities, solves
                for fixed_cell in fixed_cells:
                    logger.debug(f"Placing value {fixed_cell[1]} in fixed cell ({fixed_cell[0]['col']}, {fixed_cell[0]['row']}) as it is the only solution.")
                    place_value(fixed_cell[0], fixed_cell[1], grid)
                    solves += 1
                impossibilities.extend(impossible)

    logger.debug("Completed placement loop without abandoning.")
    return grid, False, impossibilities, solves


def check_box_pair_logic(box_pairs, cell, grid, impossibilities):
    diff = cell['boxDeclaredSum'] - cell['boxSum']
    logger.debug(f"Checking box pair logic for cell ({cell['col']}, {cell['row']}), "
                 f"boxDeclaredSum={cell['boxDeclaredSum']}, boxSum={cell['boxSum']}, diff={diff}")
    
    cell1 = box_pairs[0]['cells'][0]
    cell2 = box_pairs[0]['cells'][1]
    cell1_solutions = []
    cell2_solutions = []
    new_impossibilities = []
    fixed_cells = []

    for i in range(1, 10):
        for j in range(1, 10):
            if i + j != diff:
                continue
            logger.debug(f"Checking box pair ({i}, {j}) for cells "
                         f"({cell1['col']}, {cell1['row']}) and ({cell2['col']}, {cell2['row']})")
            
            if check_legal_pair(i, j, cell1, cell2, grid, impossibilities):
                cell1_solutions.append((cell1, i))
                cell2_solutions.append((cell2, j))
                logger.debug(f"Legal pair found: ({i}, {j}) for cells "
                             f"({cell1['col']}, {cell1['row']}) and ({cell2['col']}, {cell2['row']})")

    if len(cell1_solutions) == 0 or len(cell2_solutions) == 0:
        logger.debug(f"No solutions found for box pair. Marking cell ({cell1['col']}, {cell1['row']}) as incorrect.")
        grid[cell1['col']][cell1['row']]['isIncorrect'] = True
        return fixed_cells, True, impossibilities

    if len(cell1_solutions) == 1 or len(cell2_solutions) == 1:
        logger.debug(f"Only one solution available. Fixing cells: "
                     f"({cell1_solutions[0][0]['col']}, {cell1_solutions[0][0]['row']}) with value={cell1_solutions[0][1]} "
                     f"and ({cell2_solutions[0][0]['col']}, {cell2_solutions[0][0]['row']}) with value={cell2_solutions[0][1]}")
        fixed_cells.append(cell1_solutions[0])
        fixed_cells.append(cell2_solutions[0])

    else:
        logger.debug(f"Multiple solutions found. Determining new impossibilities for cells "
                     f"({cell1['col']}, {cell1['row']}) and ({cell2['col']}, {cell2['row']}).")
        new_impossibilities.extend(get_impossible_vals(cell1, cell1_solutions))
        new_impossibilities.extend(get_impossible_vals(cell2, cell2_solutions))
        logger.debug(f"New impossibilities for cell ({cell1['col']}, {cell1['row']}): {new_impossibilities}")

    return fixed_cells, False, new_impossibilities

def get_impossible_vals(cell, cell_solutions):
    possible_vals = []
    not_possible = []
    for solution in cell_solutions:
        possible_vals.append(solution[1])
        print("possible_vals", possible_vals)   
        
    for i in range(1, 10):
        if i not in possible_vals:
            logger.debug(f"Candidate value {i} is impossible in cell {cell['id']} as {i} is not in {possible_vals}.")
            not_possible.append((cell, i))
            print("not_possible", not_possible)

    for i in range(len(not_possible)):
        print("not_possible", not_possible[i][0]['id'], not_possible[i][1])
    return not_possible








# ####
def check_sudoku_pair_logic(sudo_pairs, grid, impossibilities):
    for pair in sudo_pairs:
        cell1 = pair['cells'][0]
        cell2 = pair['cells'][1]
        cell1_solutions = []
        cell2_solutions = []
        fixed_cells = []
        new_impossibilities = []
    for i in range(1, 10):
        for j in range(1, 10):
            if i == j:
                continue
            if not check_box_pair(cell1, cell2, i, j, grid):
                continue
            if (cell1, i) in impossibilities or (cell2, j) in impossibilities:
                continue
            if (not check_placement(cell1, i, grid)) or (not check_placement(cell2, j, grid)):
                continue
            cell1_solutions.append((cell1, i))
            cell2_solutions.append((cell2, j))

    if len(cell1_solutions) == 0 or len(cell2_solutions) == 0:
        print("No solutions5")
        return fixed_cells, True, new_impossibilities
    
    if len(cell1_solutions) == 1 or len(cell2_solutions) == 1:
        fixed_cells.append(cell1_solutions[0])
        fixed_cells.append(cell2_solutions[0])
    else:
        new_impossibilities.extend(get_impossible_vals(cell1, cell1_solutions))
        new_impossibilities.extend(get_impossible_vals(cell2, cell2_solutions))
    return fixed_cells, False, new_impossibilities
    
        
def last_in_type_check(cell, grid, impossibilities):
    col = get_single_col(grid, cell['col'])
    row = get_single_row(grid, cell['row'])
    cube = get_single_cube(grid, cell['cube'])

    pairs = []
    for type in [col, row, cube]:
        empty_cells = []
        for cell_inst in type:
            if not cell_inst['isFixed']:
                empty_cells.append(cell_inst)
        if len(empty_cells) == 1:
            for i in range(1, 10):
                if check_placement(cell, i, grid, impossibilities):
                    return True, i, False, pairs
            return False, 0, True, pairs
        if empty_cells == 2:
            pairs.append({'type': type, 'cells': empty_cells})
    return False, 0, False, pairs


            
            
def last_in_box_check(cell, grid, impossibilities):
    empty_cells = []
    pairs = []
    for box_cell in cell['boxCells']:
        grid_cell = grid[box_cell['col']][box_cell['row']]
        if not grid_cell['isFixed']:
            empty_cells.append(grid_cell)
    if len(empty_cells) == 1:
        for i in range(1, 10):
            if check_placement(cell, i, grid, impossibilities):
                return True, i, False, pairs
        return False, 0, True, pairs
    if len(empty_cells) == 2:
        pairs.append({'type': cell['box'], 'cells': empty_cells})

    return False, 0, False, pairs


