// ---------------------------------------------------
// This will be used to fetch the data from the backend
// ---------------------------------------------------

const fetchSolution = async (grid, gridSetters, stateSetters) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/solve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grid }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Solvable: ${result.solvable}, Ways: ${result.ways}`);
            // Update state or UI with the result
            const newGrid = result.grid;
            console.log(newGrid);
            // populateGrid();

        } else {
            alert('Failed to connect to server.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { fetchSolution};