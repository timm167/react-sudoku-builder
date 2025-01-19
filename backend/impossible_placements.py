def check_is_impossible(grid, empty_cell, val):
    for cell in grid[empty_cell['row']]:
        if cell['actualValue'] == val:
            return True