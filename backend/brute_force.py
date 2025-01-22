from .impossible_placements import can_permanently_disallow
from .certain_placements import last_in_box_check, last_in_type_check, analyse_pairs
from .temp_constraints import check_temp_placement
from .temp_placements import temp_place_value, remove_value
from .display import display_impossibilities, display_grid
from .check_hiddens import hidden_single, check_hiddens
from .utils import place_value
import sys

import logging

sys.setrecursionlimit(1000000)

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set the level to DEBUG to see all messages
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Format of log messages
    handlers=[logging.StreamHandler()]  # Output logs to the console
)

logger = logging.getLogger(__name__)  # Create a logger for your module

def brute_force(grid, impossibilities, recursions, disallowed_placements=None, temp_filled_cells=None, prev_impossibilities=None):
    # display_impossibilities(impossibilities)
    # breakpoint()
    if disallowed_placements is None:
        disallowed_placements = []
    if temp_filled_cells is None:
        temp_filled_cells = []
    if prev_impossibilities is None:
        prev_impossibilities = []
    recursions += 1

    new_inferences = len(impossibilities) > len(prev_impossibilities)
    prev_impossibilities = impossibilities

    empty_cell = find_empty_cell(grid, temp_filled_cells)

    if not empty_cell:
        print("No empty cell found")
        return grid, impossibilities, 0, True, recursions
    
    if new_inferences:
        print("New Inferences")
        breakpoint()

        grid, hidden_placed = check_hiddens(grid, impossibilities)
        if hidden_placed:
            return grid, impossibilities, 0, False, recursions
        
        last, i, abandon, sudo_pairs = last_in_type_check(empty_cell, grid, impossibilities)

        if abandon:
            breakpoint()
            return False, 0, grid
        
        if last:
            place_value(empty_cell, i, grid)
            return grid, impossibilities, 0, False, recursions
        
        if len(sudo_pairs) > 0:
            grid, abandon, impossibilities, new_solve = analyse_pairs(empty_cell, sudo_pairs, grid, impossibilities, 'sudoku')
            if abandon:
                return False, 0, grid
            
            if new_solve:
                return grid, impossibilities, 0, False, recursions

        last, i, abandon, box_pairs = last_in_box_check(empty_cell, grid, impossibilities)

        if abandon:
            return False, 0, grid
        
        if last:
            grid = place_value(empty_cell, i, grid)
            return grid, impossibilities, 0, False, recursions

        if len(box_pairs) > 0:
            grid, abandon, impossibilities, new_solve = analyse_pairs(empty_cell, box_pairs, grid, impossibilities, 'box')
            if abandon:
                return False, 0, grid
            
            if new_solve:
                return grid, impossibilities, 0, False, recursions
        
        grid, new_solve = hidden_single(empty_cell, grid, impossibilities)    

        if new_solve:
            breakpoint()
            return grid, impossibilities, 0, False,


    # logger.debug(f"Recursing from cell {empty_cell['id']}")

    impossible_count = 0
    
    for i in range(1, 10):

        if impossible_count == 9:
            breakpoint()
            return False, 0, grid
        
        # Check if already ruled this out completely
        if (empty_cell, i) in impossibilities:
            # print("impossible placement")
            impossible_count += 1
            continue
        
        impossibilities = can_permanently_disallow(empty_cell, i, grid, impossibilities)

        # Check if we've already tried this placement this recursion
        if (empty_cell, i) in disallowed_placements:
            continue
        
        # print("trying placement", empty_cell['id'], i)
        if check_temp_placement(empty_cell, i, grid, impossibilities):
            # logger.debug(f"Temporary placing value {i} in cell {empty_cell['id']}")
            grid = temp_place_value(empty_cell, i, grid)
            temp_filled_cells.append(empty_cell)
            
            if recursions > 600000:
                print("TOO MANY RECURSIONS")
                breakpoint()
                return False, 0, grid
            if recursions % 100 == 0:
                print(recursions)
                print("////////////////////")
                display_grid(grid)
                print("////////////////////")
            return brute_force(grid, impossibilities, recursions, disallowed_placements, temp_filled_cells, prev_impossibilities)

        disallowed_placements.append((empty_cell, i))

    # logger.debug(f"Backtracking from cell {empty_cell['id']}")
    # print({temp['id']: temp['value'] for temp in temp_filled_cells})
    if len(temp_filled_cells) == 0:
        print("THIS IS AN ERROR")
        breakpoint()
    
    disallowed_placements = [pair for pair in disallowed_placements if pair[0]['id'] != empty_cell['id']]
    remove_cell = temp_filled_cells.pop()
    disallowed_placements.append((remove_cell, remove_cell['value']))
    grid = remove_value(remove_cell, grid)
    return brute_force(grid, impossibilities, recursions, disallowed_placements, temp_filled_cells, prev_impossibilities)


# Find the next empty cell in the grid
def find_empty_cell(grid, temp_filled_cells):
    for col in range(9):
        for cell in grid[col]:
            if cell not in temp_filled_cells:
                return cell
    return None