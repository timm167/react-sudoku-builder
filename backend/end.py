def win_sudoku(grid, recursions):
    print("Sudoku solved")
    print("Recursions:", recursions)
    return True, 1, grid


def lose_sudoku(grid, recursions):
    print("No solution found")
    print("Recursions:", recursions)
    return False, 0, grid

