from .utils import find_fixed
import logging


# Initialize logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def check_placement(cell, i, grid, impossibilities):
    fixed_cells = find_fixed(grid)
    if not check_box_placement(cell, i):
        print("failed box placement")
        return False
    if not check_sudoku_placement(cell, i, fixed_cells, impossibilities):
        print("failed sudoku placement")
        return False
    return True



def check_sudoku_placement(cell, i, fixed_cells, impossibilities):
    if (cell, i) in impossibilities:
        return False
    for fixed_cell in fixed_cells:
        if (i == fixed_cell['value']) and (cell['col'] == fixed_cell['col'] or cell['row'] == fixed_cell['row'] or cell['cube'] == fixed_cell['cube']):
            return False
    return True

def check_box_placement(cell, i):
    diff = cell['boxDeclaredSum'] - cell['boxSum']
    if i > diff:
        return False
    
    if cell['unfilledBoxCells'] == 1:
        if i != diff:
            return False
    return True



def check_box_pair(cell1, cell2, i, j):
    logger.debug(f"Checking box pair placement for values {i} and {j} in cells ({cell1['col']}, {cell1['row']}) and ({cell2['col']}, {cell2['row']})")
    if cell1['box'] == cell2['box']:
        diff = cell1['boxDeclaredSum'] - cell1['boxSum']
        if i + j > diff:
            return False
        if cell1['unfilledBoxCells'] == 2 and i + j != diff:
            return False
        return True
        

                
def check_legal_pair(i, j, cell, other_cell, grid, impossibilities):
    logger.debug(f"Checking legal pair for values {i} and {j} in cells ({cell['col']}, {cell['row']}) and ({other_cell['col']}, {other_cell['row']})")
    
    # Check if the pair is in the list of impossibilities
    if (cell, i) in impossibilities:
        logger.debug(f"Failed: Value {i} in cell ({cell['col']}, {cell['row']}) is marked as impossible.")
        return False
    if (other_cell, j) in impossibilities:
        logger.debug(f"Failed: Value {j} in cell ({other_cell['col']}, {other_cell['row']}) is marked as impossible.")
        return False
    
    # Check if the cells are in the same column, row, or cube and if values are identical
    if other_cell['col'] == cell['col'] or other_cell['row'] == cell['row'] or other_cell['cube'] == cell['cube']:
        if i == j:
            logger.debug(f"Failed: Values {i} and {j} cannot be identical in the same row, column, or cube.")
            return False
    
    # Check against fixed cells
    fixed_cells = find_fixed(grid)
    for fixed_cell in fixed_cells:
        if i == fixed_cell['value'] and (cell['col'] == fixed_cell['col'] or cell['row'] == fixed_cell['row'] or cell['cube'] == fixed_cell['cube']):
            logger.debug(f"Failed: Value {i} conflicts with fixed cell ({fixed_cell['col']}, {fixed_cell['row']}) in column, row, or cube.")
            return False
        if j == fixed_cell['value'] and (other_cell['col'] == fixed_cell['col'] or other_cell['row'] == fixed_cell['row'] or other_cell['cube'] == fixed_cell['cube']):
            logger.debug(f"Failed: Value {j} conflicts with fixed cell ({fixed_cell['col']}, {fixed_cell['row']}) in column, row, or cube.")
            return False
    
    logger.debug(f"Success: Pair ({i}, {j}) is legal for cells ({cell['col']}, {cell['row']}) and ({other_cell['col']}, {other_cell['row']}).")
    return True

