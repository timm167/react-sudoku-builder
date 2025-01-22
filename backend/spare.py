# debug_list = [impossibility for impossibility in impossibilities if impossibility[0]['id'] == '1-0']
# for impossibility in impossibilities:
#     if impossibility[0]['id'] == '1-0' or impossibility[0]['id'] == '1-1':
#         if len(debug_list) > 5:
#             print(impossibility[0]['id'], impossibility[1])
#             breakpoint()


    # for col in range(9):
    #     for cell in grid[col]:
    #         if cell['isFixed'] == False and cell['value'] == 0 and cell not in temp_filled_cells:
    #             return brute_force(grid, impossibilities, recursions, disallowed_placements, temp_filled_cells)