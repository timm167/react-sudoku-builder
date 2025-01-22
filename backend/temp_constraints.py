def check_temp_placement(cell, i, grid, impossibilities):
    if not check_temp_box_placement(cell, i):
        # print("failed box placement", cell['id'], i)
        return False
    if not check_temp_sudoku_placement(cell, i, grid, impossibilities):
        # print("failed sudoku placement", cell['id'], i)
        return False
    return True



def check_temp_sudoku_placement(cell, i, grid, impossibilities):
    if (cell, i) in impossibilities:
        # print("failed box placement due to impossibility", cell['id'], i)
        return False
    for col in range(9):
        for grid_cell in grid[col]:
            if (i == grid_cell['value']) and (cell['col'] == grid_cell['col'] or cell['row'] == grid_cell['row'] or cell['cube'] == grid_cell['cube']):
                return False
    return True

def check_temp_box_placement(cell, i):
    diff = cell['boxDeclaredSum'] - cell['boxSum']
    if i > diff:
        return False
    
    if cell['unfilledBoxCells'] == 1:
        if i != diff:
            return False
    return True