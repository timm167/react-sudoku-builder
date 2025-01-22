from backend.sudoku import solve_sudoku
test_grid = [[{'box': 'box0', 'boxCells': [{'col': 0, 'row': 0, 'value': 0, 'cube': 0}, {'col': 0, 'row': 1, 'value': 0, 'cube': 0}], 'boxColor': 'aqua', 'boxDeclaredSum': 5, 'boxSize': 2, 'boxSum': 0, 'col': 0, 'cube': 0, 'id': '0-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box0', 'boxCells': [{'col': 0, 'row': 0, 'value': 0, 'cube': 0}, {'col': 0, 'row': 1, 'value': 0, 'cube': 0}], 'boxColor': 'aqua', 'boxDeclaredSum': 5, 'boxSize': 2, 'boxSum': 0, 'col': 0, 'cube': 0, 'id': '0-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box15', 'boxCells': [{'col': 1, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 3, 'value': 0, 'cube': 1}], 'boxColor': 'sand', 'boxDeclaredSum': 20, 'boxSize': 3, 'boxSum': 0, 'col': 0, 'cube': 0, 'id': '0-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box15', 'boxCells': [{'col': 1, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 3, 'value': 0, 'cube': 1}], 'boxColor': 'sand', 'boxDeclaredSum': 20, 'boxSize': 3, 'boxSum': 0, 'col': 0, 'cube': 1, 'id': '0-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box19', 'boxCells': [{'col': 0, 'row': 4, 'value': 0, 'cube': 1}, {'col': 0, 'row': 5, 'value': 0, 'cube': 1}], 'boxColor': 'silver', 'boxDeclaredSum': 11, 'boxSize': 2, 'boxSum': 0, 'col': 0, 'cube': 1, 'id': '0-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box19', 'boxCells': [{'col': 0, 'row': 4, 'value': 0, 'cube': 1}, {'col': 0, 'row': 5, 'value': 0, 'cube': 1}], 'boxColor': 'silver', 'boxDeclaredSum': 11, 'boxSize': 2, 'boxSum': 0, 'col': 0, 'cube': 1, 'id': '0-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box20', 'boxCells': [{'col': 0, 'row': 6, 'value': 0, 'cube': 2}, {'col': 0, 'row': 7, 'value': 0, 'cube': 2}, {'col': 1, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'sunset', 'boxDeclaredSum': 22, 'boxSize': 3, 'boxSum': 0, 'col': 0, 'cube': 2, 'id': '0-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box20', 'boxCells': [{'col': 0, 'row': 6, 'value': 0, 'cube': 2}, {'col': 0, 'row': 7, 'value': 0, 'cube': 2}, {'col': 1, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'sunset', 'boxDeclaredSum': 22, 'boxSize': 3, 'boxSum': 0, 'col': 0, 'cube': 2, 'id': '0-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box21', 'boxCells': [{'col': 0, 'row': 8, 'value': 0, 'cube': 2}, {'col': 1, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'amethyst', 'boxDeclaredSum': 19, 'boxSize': 4, 'boxSum': 0, 'col': 0, 'cube': 2, 'id': '0-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 4, 'value': 0}], [{'box': 'box1', 'boxCells': [{'col': 1, 'row': 0, 'value': 0, 'cube': 0}, {'col': 1, 'row': 1, 'value': 0, 'cube': 0}], 'boxColor': 'canary-yellow', 'boxDeclaredSum': 11, 'boxSize': 2, 'boxSum': 0, 'col': 1, 'cube': 0, 'id': '1-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box1', 'boxCells': [{'col': 1, 'row': 0, 'value': 0, 'cube': 0}, {'col': 1, 'row': 1, 'value': 0, 'cube': 0}], 'boxColor': 'canary-yellow', 'boxDeclaredSum': 11, 'boxSize': 2, 'boxSum': 0, 'col': 1, 'cube': 0, 'id': '1-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box15', 'boxCells': [{'col': 1, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 2, 'value': 0, 'cube': 0}, {'col': 0, 'row': 3, 'value': 0, 'cube': 1}], 'boxColor': 'sand', 'boxDeclaredSum': 20, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 0, 'id': '1-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box16', 'boxCells': [{'col': 1, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 4, 'value': 0, 'cube': 1}], 'boxColor': 'light-teal', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 1, 'id': '1-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box17', 'boxCells': [{'col': 1, 'row': 4, 'value': 0, 'cube': 1}, {'col': 1, 'row': 5, 'value': 0, 'cube': 1}, {'col': 1, 'row': 6, 'value': 0, 'cube': 2}], 'boxColor': 'ivory', 'boxDeclaredSum': 9, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 1, 'id': '1-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box17', 'boxCells': [{'col': 1, 'row': 4, 'value': 0, 'cube': 1}, {'col': 1, 'row': 5, 'value': 0, 'cube': 1}, {'col': 1, 'row': 6, 'value': 0, 'cube': 2}], 'boxColor': 'ivory', 'boxDeclaredSum': 9, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 1, 'id': '1-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box17', 'boxCells': [{'col': 1, 'row': 4, 'value': 0, 'cube': 1}, {'col': 1, 'row': 5, 'value': 0, 'cube': 1}, {'col': 1, 'row': 6, 'value': 0, 'cube': 2}], 'boxColor': 'ivory', 'boxDeclaredSum': 9, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 2, 'id': '1-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box20', 'boxCells': [{'col': 0, 'row': 6, 'value': 0, 'cube': 2}, {'col': 0, 'row': 7, 'value': 0, 'cube': 2}, {'col': 1, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'sunset', 'boxDeclaredSum': 22, 'boxSize': 3, 'boxSum': 0, 'col': 1, 'cube': 2, 'id': '1-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box21', 'boxCells': [{'col': 0, 'row': 8, 'value': 0, 'cube': 2}, {'col': 1, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'amethyst', 'boxDeclaredSum': 19, 'boxSize': 4, 'boxSum': 0, 'col': 1, 'cube': 2, 'id': '1-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 4, 'value': 0}], [{'box': 'box2', 'boxCells': [{'col': 2, 'row': 0, 'value': 0, 'cube': 0}, {'col': 3, 'row': 0, 'value': 0, 'cube': 3}], 'boxColor': 'peach', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 2, 'cube': 0, 'id': '2-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box14', 'boxCells': [{'col': 3, 'row': 1, 'value': 0, 'cube': 3}, {'col': 2, 'row': 1, 'value': 0, 'cube': 0}, {'col': 2, 'row': 2, 'value': 0, 'cube': 0}], 'boxColor': 'pale-gold', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 0, 'id': '2-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box14', 'boxCells': [{'col': 3, 'row': 1, 'value': 0, 'cube': 3}, {'col': 2, 'row': 1, 'value': 0, 'cube': 0}, {'col': 2, 'row': 2, 'value': 0, 'cube': 0}], 'boxColor': 'pale-gold', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 0, 'id': '2-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box16', 'boxCells': [{'col': 1, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 4, 'value': 0, 'cube': 1}], 'boxColor': 'light-teal', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 1, 'id': '2-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box16', 'boxCells': [{'col': 1, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 3, 'value': 0, 'cube': 1}, {'col': 2, 'row': 4, 'value': 0, 'cube': 1}], 'boxColor': 'light-teal', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 1, 'id': '2-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box18', 'boxCells': [{'col': 2, 'row': 5, 'value': 0, 'cube': 1}, {'col': 2, 'row': 6, 'value': 0, 'cube': 2}, {'col': 3, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'peacock-blue', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 1, 'id': '2-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box18', 'boxCells': [{'col': 2, 'row': 5, 'value': 0, 'cube': 1}, {'col': 2, 'row': 6, 'value': 0, 'cube': 2}, {'col': 3, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'peacock-blue', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 2, 'cube': 2, 'id': '2-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box21', 'boxCells': [{'col': 0, 'row': 8, 'value': 0, 'cube': 2}, {'col': 1, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'amethyst', 'boxDeclaredSum': 19, 'boxSize': 4, 'boxSum': 0, 'col': 2, 'cube': 2, 'id': '2-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 4, 'value': 0}, {'box': 'box21', 'boxCells': [{'col': 0, 'row': 8, 'value': 0, 'cube': 2}, {'col': 1, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 8, 'value': 0, 'cube': 2}, {'col': 2, 'row': 7, 'value': 0, 'cube': 2}], 'boxColor': 'amethyst', 'boxDeclaredSum': 19, 'boxSize': 4, 'boxSum': 0, 'col': 2, 'cube': 2, 'id': '2-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 4, 'value': 0}], [{'box': 'box2', 'boxCells': [{'col': 2, 'row': 0, 'value': 0, 'cube': 0}, {'col': 3, 'row': 0, 'value': 0, 'cube': 3}], 'boxColor': 'peach', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 3, 'id': '3-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box14', 'boxCells': [{'col': 3, 'row': 1, 'value': 0, 'cube': 3}, {'col': 2, 'row': 1, 'value': 0, 'cube': 0}, {'col': 2, 'row': 2, 'value': 0, 'cube': 0}], 'boxColor': 'pale-gold', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 3, 'cube': 3, 'id': '3-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box13', 'boxCells': [{'col': 3, 'row': 3, 'value': 0, 'cube': 4}, {'col': 3, 'row': 2, 'value': 0, 'cube': 3}], 'boxColor': 'sage', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 3, 'id': '3-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box13', 'boxCells': [{'col': 3, 'row': 3, 'value': 0, 'cube': 4}, {'col': 3, 'row': 2, 'value': 0, 'cube': 3}], 'boxColor': 'sage', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 4, 'id': '3-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box12', 'boxCells': [{'col': 3, 'row': 5, 'value': 0, 'cube': 4}, {'col': 3, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'salmon', 'boxDeclaredSum': 12, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 4, 'id': '3-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box12', 'boxCells': [{'col': 3, 'row': 5, 'value': 0, 'cube': 4}, {'col': 3, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'salmon', 'boxDeclaredSum': 12, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 4, 'id': '3-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box18', 'boxCells': [{'col': 2, 'row': 5, 'value': 0, 'cube': 1}, {'col': 2, 'row': 6, 'value': 0, 'cube': 2}, {'col': 3, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'peacock-blue', 'boxDeclaredSum': 12, 'boxSize': 3, 'boxSum': 0, 'col': 3, 'cube': 5, 'id': '3-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box22', 'boxCells': [{'col': 3, 'row': 8, 'value': 0, 'cube': 5}, {'col': 3, 'row': 7, 'value': 0, 'cube': 5}], 'boxColor': 'cloud', 'boxDeclaredSum': 9, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 5, 'id': '3-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box22', 'boxCells': [{'col': 3, 'row': 8, 'value': 0, 'cube': 5}, {'col': 3, 'row': 7, 'value': 0, 'cube': 5}], 'boxColor': 'cloud', 'boxDeclaredSum': 9, 'boxSize': 2, 'boxSum': 0, 'col': 3, 'cube': 5, 'id': '3-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 2, 'value': 0}], [{'box': 'box3', 'boxCells': [{'col': 5, 'row': 0, 'value': 0, 'cube': 3}, {'col': 4, 'row': 0, 'value': 0, 'cube': 3}], 'boxColor': 'gold', 'boxDeclaredSum': 3, 'boxSize': 2, 'boxSum': 0, 'col': 4, 'cube': 3, 'id': '4-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box10', 'boxCells': [{'col': 4, 'row': 1, 'value': 0, 'cube': 3}, {'col': 4, 'row': 2, 'value': 0, 'cube': 3}, {'col': 4, 'row': 3, 'value': 0, 'cube': 4}, {'col': 4, 'row': 4, 'value': 0, 'cube': 4}, {'col': 5, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'purple', 'boxDeclaredSum': 24, 'boxSize': 5, 'boxSum': 0, 'col': 4, 'cube': 3, 'id': '4-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 5, 'value': 0}, {'box': 'box10', 'boxCells': [{'col': 4, 'row': 1, 'value': 0, 'cube': 3}, {'col': 4, 'row': 2, 'value': 0, 'cube': 3}, {'col': 4, 'row': 3, 'value': 0, 'cube': 4}, {'col': 4, 'row': 4, 'value': 0, 'cube': 4}, {'col': 5, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'purple', 'boxDeclaredSum': 24, 'boxSize': 5, 'boxSum': 0, 'col': 4, 'cube': 3, 'id': '4-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 5, 'value': 0}, {'box': 'box10', 'boxCells': [{'col': 4, 'row': 1, 'value': 0, 'cube': 3}, {'col': 4, 'row': 2, 'value': 0, 'cube': 3}, {'col': 4, 'row': 3, 'value': 0, 'cube': 4}, {'col': 4, 'row': 4, 'value': 0, 'cube': 4}, {'col': 5, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'purple', 'boxDeclaredSum': 24, 'boxSize': 5, 'boxSum': 0, 'col': 4, 'cube': 4, 'id': '4-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 5, 'value': 0}, {'box': 'box10', 'boxCells': [{'col': 4, 'row': 1, 'value': 0, 'cube': 3}, {'col': 4, 'row': 2, 'value': 0, 'cube': 3}, {'col': 4, 'row': 3, 'value': 0, 'cube': 4}, {'col': 4, 'row': 4, 'value': 0, 'cube': 4}, {'col': 5, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'purple', 'boxDeclaredSum': 24, 'boxSize': 5, 'boxSum': 0, 'col': 4, 'cube': 4, 'id': '4-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 5, 'value': 0}, {'box': 'box11', 'boxCells': [{'col': 5, 'row': 5, 'value': 0, 'cube': 4}, {'col': 4, 'row': 5, 'value': 0, 'cube': 4}], 'boxColor': 'indigo', 'boxDeclaredSum': 8, 'boxSize': 2, 'boxSum': 0, 'col': 4, 'cube': 4, 'id': '4-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box26', 'boxCells': [{'col': 4, 'row': 6, 'value': 0, 'cube': 5}, {'col': 4, 'row': 7, 'value': 0, 'cube': 5}], 'boxColor': 'honeydew', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 4, 'cube': 5, 'id': '4-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box26', 'boxCells': [{'col': 4, 'row': 6, 'value': 0, 'cube': 5}, {'col': 4, 'row': 7, 'value': 0, 'cube': 5}], 'boxColor': 'honeydew', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 4, 'cube': 5, 'id': '4-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box23', 'boxCells': [{'col': 4, 'row': 8, 'value': 0, 'cube': 5}, {'col': 5, 'row': 8, 'value': 0, 'cube': 5}, {'col': 6, 'row': 8, 'value': 0, 'cube': 8}], 'boxColor': 'moonstone', 'boxDeclaredSum': 10, 'boxSize': 3, 'boxSum': 0, 'col': 4, 'cube': 5, 'id': '4-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 3, 'value': 0}], [{'box': 'box3', 'boxCells': [{'col': 5, 'row': 0, 'value': 0, 'cube': 3}, {'col': 4, 'row': 0, 'value': 0, 'cube': 3}], 'boxColor': 'gold', 'boxDeclaredSum': 3, 'boxSize': 2, 'boxSum': 0, 'col': 5, 'cube': 3, 'id': '5-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box9', 'boxCells': [{'col': 5, 'row': 1, 'value': 0, 'cube': 3}], 'boxColor': 'dark-green', 'boxDeclaredSum': 8, 'boxSize': 1, 'boxSum': 0, 'col': 5, 'cube': 3, 'id': '5-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 1, 'value': 0}, {'box': 'box8', 'boxCells': [{'col': 6, 'row': 2, 'value': 0, 'cube': 6}, {'col': 5, 'row': 2, 'value': 0, 'cube': 3}, {'col': 5, 'row': 3, 'value': 0, 'cube': 4}], 'boxColor': 'cyan', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 5, 'cube': 3, 'id': '5-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box8', 'boxCells': [{'col': 6, 'row': 2, 'value': 0, 'cube': 6}, {'col': 5, 'row': 2, 'value': 0, 'cube': 3}, {'col': 5, 'row': 3, 'value': 0, 'cube': 4}], 'boxColor': 'cyan', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 5, 'cube': 4, 'id': '5-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box10', 'boxCells': [{'col': 4, 'row': 1, 'value': 0, 'cube': 3}, {'col': 4, 'row': 2, 'value': 0, 'cube': 3}, {'col': 4, 'row': 3, 'value': 0, 'cube': 4}, {'col': 4, 'row': 4, 'value': 0, 'cube': 4}, {'col': 5, 'row': 4, 'value': 0, 'cube': 4}], 'boxColor': 'purple', 'boxDeclaredSum': 24, 'boxSize': 5, 'boxSum': 0, 'col': 5, 'cube': 4, 'id': '5-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 5, 'value': 0}, {'box': 'box11', 'boxCells': [{'col': 5, 'row': 5, 'value': 0, 'cube': 4}, {'col': 4, 'row': 5, 'value': 0, 'cube': 4}], 'boxColor': 'indigo', 'boxDeclaredSum': 8, 'boxSize': 2, 'boxSum': 0, 'col': 5, 'cube': 4, 'id': '5-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box24', 'boxCells': [{'col': 6, 'row': 7, 'value': 0, 'cube': 8}, {'col': 5, 'row': 7, 'value': 0, 'cube': 5}, {'col': 5, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'opal', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 5, 'cube': 5, 'id': '5-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box24', 'boxCells': [{'col': 6, 'row': 7, 'value': 0, 'cube': 8}, {'col': 5, 'row': 7, 'value': 0, 'cube': 5}, {'col': 5, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'opal', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 5, 'cube': 5, 'id': '5-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box23', 'boxCells': [{'col': 4, 'row': 8, 'value': 0, 'cube': 5}, {'col': 5, 'row': 8, 'value': 0, 'cube': 5}, {'col': 6, 'row': 8, 'value': 0, 'cube': 8}], 'boxColor': 'moonstone', 'boxDeclaredSum': 10, 'boxSize': 3, 'boxSum': 0, 'col': 5, 'cube': 5, 'id': '5-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 3, 'value': 0}], [{'box': 'box4', 'boxCells': [{'col': 6, 'row': 0, 'value': 0, 'cube': 6}], 'boxColor': 'mint', 'boxDeclaredSum': 6, 'boxSize': 1, 'boxSum': 0, 'col': 6, 'cube': 6, 'id': '6-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 1, 'value': 0}, {'box': 'box5', 'boxCells': [{'col': 7, 'row': 0, 'value': 0, 'cube': 6}, {'col': 7, 'row': 1, 'value': 0, 'cube': 6}, {'col': 6, 'row': 1, 'value': 0, 'cube': 6}], 'boxColor': 'pastel-purple', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 6, 'cube': 6, 'id': '6-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box8', 'boxCells': [{'col': 6, 'row': 2, 'value': 0, 'cube': 6}, {'col': 5, 'row': 2, 'value': 0, 'cube': 3}, {'col': 5, 'row': 3, 'value': 0, 'cube': 4}], 'boxColor': 'cyan', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 6, 'cube': 6, 'id': '6-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box31', 'boxCells': [{'col': 7, 'row': 3, 'value': 0, 'cube': 7}, {'col': 6, 'row': 3, 'value': 0, 'cube': 7}], 'boxColor': 'soft-yellow', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 6, 'cube': 7, 'id': '6-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 6, 'cube': 7, 'id': '6-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 6, 'cube': 7, 'id': '6-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box25', 'boxCells': [{'col': 6, 'row': 6, 'value': 0, 'cube': 8}], 'boxDeclaredSum': 5, 'boxSize': 1, 'boxSum': 0, 'col': 6, 'cube': 8, 'id': '6-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 1, 'value': 0}, {'box': 'box24', 'boxCells': [{'col': 6, 'row': 7, 'value': 0, 'cube': 8}, {'col': 5, 'row': 7, 'value': 0, 'cube': 5}, {'col': 5, 'row': 6, 'value': 0, 'cube': 5}], 'boxColor': 'opal', 'boxDeclaredSum': 15, 'boxSize': 3, 'boxSum': 0, 'col': 6, 'cube': 8, 'id': '6-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box23', 'boxCells': [{'col': 4, 'row': 8, 'value': 0, 'cube': 5}, {'col': 5, 'row': 8, 'value': 0, 'cube': 5}, {'col': 6, 'row': 8, 'value': 0, 'cube': 8}], 'boxColor': 'moonstone', 'boxDeclaredSum': 10, 'boxSize': 3, 'boxSum': 0, 'col': 6, 'cube': 8, 'id': '6-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 3, 'value': 0}], [{'box': 'box5', 'boxCells': [{'col': 7, 'row': 0, 'value': 0, 'cube': 6}, {'col': 7, 'row': 1, 'value': 0, 'cube': 6}, {'col': 6, 'row': 1, 'value': 0, 'cube': 6}], 'boxColor': 'pastel-purple', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 7, 'cube': 6, 'id': '7-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box5', 'boxCells': [{'col': 7, 'row': 0, 'value': 0, 'cube': 6}, {'col': 7, 'row': 1, 'value': 0, 'cube': 6}, {'col': 6, 'row': 1, 'value': 0, 'cube': 6}], 'boxColor': 'pastel-purple', 'boxDeclaredSum': 18, 'boxSize': 3, 'boxSum': 0, 'col': 7, 'cube': 6, 'id': '7-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box7', 'boxCells': [{'col': 8, 'row': 2, 'value': 0, 'cube': 6}, {'col': 7, 'row': 2, 'value': 0, 'cube': 6}], 'boxColor': 'green', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 7, 'cube': 6, 'id': '7-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box31', 'boxCells': [{'col': 7, 'row': 3, 'value': 0, 'cube': 7}, {'col': 6, 'row': 3, 'value': 0, 'cube': 7}], 'boxColor': 'soft-yellow', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 7, 'cube': 7, 'id': '7-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': True, 'row': 3, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 7, 'cube': 7, 'id': '7-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 7, 'cube': 7, 'id': '7-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 7, 'cube': 8, 'id': '7-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box29', 'boxCells': [{'col': 7, 'row': 7, 'value': 0, 'cube': 8}, {'col': 7, 'row': 8, 'value': 0, 'cube': 8}], 'boxColor': 'coral', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 7, 'cube': 8, 'id': '7-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box29', 'boxCells': [{'col': 7, 'row': 7, 'value': 0, 'cube': 8}, {'col': 7, 'row': 8, 'value': 0, 'cube': 8}], 'boxColor': 'coral', 'boxDeclaredSum': 13, 'boxSize': 2, 'boxSum': 0, 'col': 7, 'cube': 8, 'id': '7-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 2, 'value': 0}], [{'box': 'box6', 'boxCells': [{'col': 8, 'row': 1, 'value': 0, 'cube': 6}, {'col': 8, 'row': 0, 'value': 0, 'cube': 6}], 'boxColor': 'baby-blue', 'boxDeclaredSum': 9, 'boxSize': 2, 'boxSum': 0, 'col': 8, 'cube': 6, 'id': '8-0', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 0, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box6', 'boxCells': [{'col': 8, 'row': 1, 'value': 0, 'cube': 6}, {'col': 8, 'row': 0, 'value': 0, 'cube': 6}], 'boxColor': 'baby-blue', 'boxDeclaredSum': 9, 'boxSize': 2, 'boxSum': 0, 'col': 8, 'cube': 6, 'id': '8-1', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 1, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box7', 'boxCells': [{'col': 8, 'row': 2, 'value': 0, 'cube': 6}, {'col': 7, 'row': 2, 'value': 0, 'cube': 6}], 'boxColor': 'green', 'boxDeclaredSum': 10, 'boxSize': 2, 'boxSum': 0, 'col': 8, 'cube': 6, 'id': '8-2', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 2, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box30', 'boxCells': [{'col': 8, 'row': 4, 'value': 0, 'cube': 7}, {'col': 8, 'row': 3, 'value': 0, 'cube': 7}], 'boxColor': 'rose', 'boxDeclaredSum': 7, 'boxSize': 2, 'boxSum': 0, 'col': 8, 'cube': 7, 'id': '8-3', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 3, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box30', 'boxCells': [{'col': 8, 'row': 4, 'value': 0, 'cube': 7}, {'col': 8, 'row': 3, 'value': 0, 'cube': 7}], 'boxColor': 'rose', 'boxDeclaredSum': 7, 'boxSize': 2, 'boxSum': 0, 'col': 8, 'cube': 7, 'id': '8-4', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 4, 'unfilledBoxCells': 2, 'value': 0}, {'box': 'box28', 'boxCells': [{'col': 7, 'row': 6, 'value': 0, 'cube': 8}, {'col': 7, 'row': 5, 'value': 0, 'cube': 7}, {'col': 6, 'row': 5, 'value': 0, 'cube': 7}, {'col': 8, 'row': 5, 'value': 0, 'cube': 7}, {'col': 7, 'row': 4, 'value': 0, 'cube': 7}, {'col': 6, 'row': 4, 'value': 0, 'cube': 7}], 'boxColor': 'light-green', 'boxDeclaredSum': 31, 'boxSize': 6, 'boxSum': 0, 'col': 8, 'cube': 7, 'id': '8-5', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 5, 'unfilledBoxCells': 6, 'value': 0}, {'box': 'box27', 'boxCells': [{'col': 8, 'row': 8, 'value': 0, 'cube': 8}, {'col': 8, 'row': 7, 'value': 0, 'cube': 8}, {'col': 8, 'row': 6, 'value': 0, 'cube': 8}], 'boxColor': 'lavender', 'boxDeclaredSum': 17, 'boxSize': 3, 'boxSum': 0, 'col': 8, 'cube': 8, 'id': '8-6', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': True, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 6, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box27', 'boxCells': [{'col': 8, 'row': 8, 'value': 0, 'cube': 8}, {'col': 8, 'row': 7, 'value': 0, 'cube': 8}, {'col': 8, 'row': 6, 'value': 0, 'cube': 8}], 'boxColor': 'lavender', 'boxDeclaredSum': 17, 'boxSize': 3, 'boxSum': 0, 'col': 8, 'cube': 8, 'id': '8-7', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 7, 'unfilledBoxCells': 3, 'value': 0}, {'box': 'box27', 'boxCells': [{'col': 8, 'row': 8, 'value': 0, 'cube': 8}, {'col': 8, 'row': 7, 'value': 0, 'cube': 8}, {'col': 8, 'row': 6, 'value': 0, 'cube': 8}], 'boxColor': 'lavender', 'boxDeclaredSum': 17, 'boxSize': 3, 'boxSum': 0, 'col': 8, 'cube': 8, 'id': '8-8', 'isBeingAddedToBox': False, 'isDisplayingBoxSum': False, 'isFixed': False, 'isIncorrect': False, 'isSelected': False, 'row': 8, 'unfilledBoxCells': 3, 'value': 0}]]

solve_sudoku(test_grid)