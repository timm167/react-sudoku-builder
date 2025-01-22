from .utils import place_value

def hidden_single(cell, grid, impossibilities):
    cell_possibilties = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for item in impossibilities:
        if item[0] == cell:
            cell_possibilties.remove(item[1])
    if len(cell_possibilties) == 1:
        place_value(cell, cell_possibilties[0], grid)
        return grid, True
    return grid, False
    

def check_hiddens(grid, impossibilities):
    grid, hidden_placed = check_last_option(grid, impossibilities)
    for col in range(9):
        for cell in grid[col]:
            grid, hidden_single_placed = hidden_single(cell, grid, impossibilities)
    if hidden_placed or hidden_single_placed:
        return grid, True
    return grid, False


def check_last_option(grid, impossibilities):
    hidden_placed = False
    # A list to store the results for fixed placements
    fixed_placements = []

    # Iterate through each column (0 to 8)
    for col in range(9):
        # For each value from 1 to 9, check if it can only be placed in one cell
        for value in range(1, 10):
            possible_cells = []

            # Check each cell in the column
            for row in range(9):
                cell = grid[col][row]

                # Skip cells that are already fixed (they have a value assigned)
                if cell['isFixed']:
                    continue
                
                # If the value is not in the list of impossibilities for this cell, it's a possible candidate
                if (cell, value) not in impossibilities:
                    possible_cells.append(cell)

            # If exactly one cell can take this value, place it there
            if len(possible_cells) == 1:
                cell_to_place = possible_cells[0]
                fixed_placements.append((cell_to_place, value))
                place_value(cell_to_place, value, grid)
                hidden_placed = True
                break  # Exit value loop as we have fixed the value for this column

    return grid, hidden_placed
