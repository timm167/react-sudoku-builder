from .impossible_placements import get_impossibilities
from .certain_placements import make_certain_placements
from .utils import get_num_incomplete
from .end import win_sudoku, lose_sudoku
from .brute_force import brute_force
from .display import display_grid, display_impossibilities
import logging

## Add limits to cell values based on above 17 etc

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set the level to DEBUG to see all messages
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Format of log messages
    handlers=[logging.StreamHandler()]  # Output logs to the console
)

logger = logging.getLogger(__name__)  # Create a logger for your module


def solve_sudoku(grid):
    # Initialize variables
    display = False
    impossibilities = get_impossibilities(grid)
    display = True
    recursions = 0
    new_solves = True
    while new_solves:
        num_incomplete = get_num_incomplete(grid)
        if num_incomplete == 0:
            return win_sudoku(grid, recursions)
        impossibilities = get_impossibilities(grid, impossibilities)
        grid, abandon, impossibilities, new_solves = make_certain_placements(grid, impossibilities)
        if abandon:
            return lose_sudoku(grid, recursions)

    new_solves = True
    while new_solves:
        grid, impossibilities, new_solves, abandon, recursions = brute_force(grid, impossibilities, recursions)
        breakpoint()
        if abandon:
            return lose_sudoku(grid, recursions)
        if new_solves:
            breakpoint()
            return sudoku_recursor(grid, impossibilities, recursions)
    
    return win_sudoku(grid, recursions)
   

def sudoku_recursor(grid, impossibilities, recursions):
    breakpoint()
    new_solves = True
    while new_solves:
        num_incomplete = get_num_incomplete(grid)
        if num_incomplete == 0:
            return win_sudoku(grid, recursions)
        impossibilities = get_impossibilities(grid, impossibilities)
        grid, abandon, impossibilities, new_solves = make_certain_placements(grid, impossibilities)  
        if abandon:
            return lose_sudoku(grid, recursions)
        display_impossibilities(impossibilities)

    new_solves = True
    while new_solves:
        grid, impossibilities, new_solves, abandon, recursions = brute_force(grid, impossibilities, recursions)
        if abandon:
            return lose_sudoku(grid, recursions)
        num_incomplete = get_num_incomplete(grid)
        if num_incomplete == 0:
            return win_sudoku(grid, recursions) # BASE CASE
        if new_solves:
            return sudoku_recursor(grid, impossibilities, recursions)