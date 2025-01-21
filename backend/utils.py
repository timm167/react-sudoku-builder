def get_cols(grid):
    cols = []
    for col in range(9):
        add_col = []
        for i in range(9):
            for j in range(9):
                if grid[i][j]['col'] == col:
                    add_col.append(grid[i][j])
        cols.append(add_col)
    return cols


def get_rows(grid):
    rows = []
    for row in range(9):
        add_row = []
        for i in range(9):
            for j in range(9):
                if grid[i][j]['row'] == row:
                    add_row.append(grid[i][j])
        rows.append(add_row)
    return rows

def get_cubes(grid):
    cubes = []
    for cube in range(9):
        add_cube = []
        for i in range(9):
            for j in range(9):
                if grid[i][j]['cube'] == cube:
                    add_cube.append(grid[i][j])
        cubes.append(add_cube)
    return cubes

def find_fixed(grid):
    fixed = []
    for col in range(9):
        for cell in grid[col]:
            if cell['isFixed']:
                fixed.append(cell)
    return fixed

def get_single_col(grid, col):
    return grid[col]

def get_single_row(grid, row):
    return [grid[i][row] for i in range(9)]

def get_single_cube(grid, cube):
    cube = []
    for i in range(9):
        for j in range(9):
            if grid[i][j]['cube'] == cube:
                cube.append(grid[i][j])
    return cube


def temp_place_value(cell, value, grid):
    cell['value'] = value
    for box_cell in cell['boxCells']:
        grid[box_cell['col']][box_cell['row']]['boxSum'] += value
    return grid

def remove_value(cell, grid):
    value = cell['value']
    cell['value'] = 0
    grid[cell['col']][cell['row']] = cell
    for box_cell in cell['boxCells']:
        grid[box_cell['col']][box_cell['row']]['boxSum'] -= value
    return grid


def get_num_incomplete(grid):
    unfilled_cells = 0
    for col in range(9):
        for cell in grid[col]:
            if not cell['isFixed']:
                unfilled_cells += 1
    return unfilled_cells