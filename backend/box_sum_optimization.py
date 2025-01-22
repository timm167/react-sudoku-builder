from .display import display_impossibilities

def optimize_box_sums(box_cell, box_min, box_max, restrictions, grid, impossibilities):
    grid_cell = grid[box_cell['col']][box_cell['row']]
    # if grid_cell['id'] == '0-0':
    #     display_impossibilities(impossibilities)
    #     breakpoint()
    
    if (grid_cell, 9) in impossibilities:
        box_min += 1
        if (grid_cell, 8) in impossibilities:
            box_min += 1
            if (grid_cell, 7) in impossibilities:
                box_min += 1
                if (grid_cell, 6) in impossibilities:
                    box_min += 1
    
    elif restrictions > 2:
        if (grid_cell, 7) in impossibilities:
            box_min += 1

    elif restrictions > 1:
        if (grid_cell, 8) in impossibilities:
            box_min += 1
            if (grid_cell, 7) in impossibilities:
                box_min += 1
        elif restrictions > 2:
            if (grid_cell, 7) in impossibilities:
                box_min += 1
        
    if (grid_cell, 1) in impossibilities:
        box_max -= 1
        if (grid_cell, 2) in impossibilities:
            box_max -= 1
            if (grid_cell, 3) in impossibilities:
                box_max -= 1
                if (grid_cell, 4) in impossibilities:
                    box_max -= 1
        
        elif restrictions > 2:
            if (grid_cell, 2) in impossibilities:
                box_max -= 1
                if (grid_cell, 3) in impossibilities:
                    box_max -= 1
            elif restrictions > 1:
                if (grid_cell, 3) in impossibilities:
                    box_max -= 1

    elif restrictions > 1:
        if (grid_cell, 2) in impossibilities:
            box_max -= 1
            if (grid_cell, 3) in impossibilities:
                box_max -= 1
        elif restrictions > 2:
            if (grid_cell, 3) in impossibilities:
                box_max -= 1

    return box_min, box_max