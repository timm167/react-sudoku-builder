def temp_place_value(cell, value, grid):
    cell['value'] = value
    for box_cell in cell['boxCells']:
        grid[box_cell['col']][box_cell['row']]['boxSum'] += value
        grid[box_cell['col']][box_cell['row']]['unfilledBoxCells'] -= 1
    return grid

def remove_value(cell, grid):
    value = cell['value']
    cell['value'] = 0
    grid[cell['col']][cell['row']] = cell
    for box_cell in cell['boxCells']:
        grid[box_cell['col']][box_cell['row']]['boxSum'] -= value
        grid[box_cell['col']][box_cell['row']]['unfilledBoxCells'] += 1
    return grid