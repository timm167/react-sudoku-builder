from flask import Flask, request, jsonify
from flask_cors import CORS  
import sys 
import traceback
import logging
from backend.sudoku import solve_sudoku



logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.info("Starting Sudoku Solver API")

sys.setrecursionlimit(60000) 

app = Flask(__name__)
CORS(app)

# This function just tests the API is working
def handle_sudoku(fetched_grid):

    print(fetched_grid)

    solvable, ways, solvedGrid = solve_sudoku(fetched_grid)
    return

@app.route('/solve', methods=['POST']) # This endpoint receives a POST request
def solve():
    try:
        # Extract the grid from the incoming JSON data
        data = request.get_json()
        fetched_grid = data.get('grid')  # grid is expected to be an array of arrays
        
        if not fetched_grid:
            return jsonify({'error': 'Grid not provided'}), 400
        
        # Call the handle_sudoku function
        solvable, ways, solvedGrid = handle_sudoku(fetched_grid)
        
        # Send back a JSON response with solvability and number of ways
        return jsonify({
            'solvable': solvable,
            'ways': ways,
            'solvedGrid': solvedGrid,
        })
    
    except Exception as e:
        print("Error occurred:", traceback.format_exc())
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)