document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display workouts when the page is fully loaded
    fetchWorkouts();
});

function fetchWorkouts() {
    fetch('/api/workouts/user', { // Ensure this endpoint is correct and returns workout data including the 'name' attribute
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(workouts => {
        const workoutsContainer = document.querySelector('#workouts-container');
        workoutsContainer.innerHTML = ''; // Clear existing workouts

        workouts.forEach(workout => {
            const workoutElement = document.createElement('div');
            workoutElement.classList.add('workout-card');
            workoutElement.innerHTML = `
                <h3>${workout.name}</h3> <!-- Display the workout name here -->
                <p>Workout Type: ${workout.type}</p>
                <p>Duration: ${workout.duration} minutes</p>
                <p>Calories Burned: ${workout.caloriesBurned}</p>
            `;
            workoutsContainer.appendChild(workoutElement);
        });
    })
    .catch(error => console.error('Error fetching workouts:', error));
}


// Example form submission for adding a workout
document.querySelector('#add-workout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const workoutData = {
        type: document.querySelector('#workout-type').value,
        duration: document.querySelector('#workout-duration').value,
        caloriesBurned: document.querySelector('#workout-calories').value,
    };

    fetch('/api/workouts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchWorkouts(); // Refresh the list of workouts
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
