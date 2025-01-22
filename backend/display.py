def display_impossibilities(impossibilities):
    for cell, value in impossibilities:
        print(f"Cell ({cell['col']}, {cell['row']}) cannot be {value}")

def display_grid(grid):
    for i in range(9):
        for j in range(9):
            print(grid[j][i]['value'], end=" ")
        print()

def display_cell_impossibilities(impossibilities, cell):
    for item in impossibilities:
        if item[0] == cell:
            print(f"Cell ({cell['col']}, {cell['row']}) cannot be {item[1]}")

def display_cell_possibilities(impossibilities, cell):
    impossible = []
    for item in impossibilities:
        if item[0] == cell:
            impossible.append(item[1])
    for i in range(1, 10):
        if i not in impossible:
            print(f"Cell ({cell['col']}, {cell['row']}) can be {i}")
