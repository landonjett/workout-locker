document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display workouts when the page is fully loaded
    fetchWorkouts();

    // Add event listener for form submission
    document.querySelector('#add-workout-form').addEventListener('submit', handleAddWorkout);
});

function fetchWorkouts() {
    fetch('/api/workouts/user', {
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
                <h3>${workout.name}</h3>
                <p>Workout Type: ${workout.type}</p>
                ${workout.duration ? `<p>Duration: ${workout.duration} minutes</p>` : ''}
                ${workout.caloriesBurned ? `<p>Calories Burned: ${workout.caloriesBurned}</p>` : ''}
                ${workout.sets ? `<p>Sets: ${workout.sets}</p>` : ''}
                ${workout.reps ? `<p>Reps: ${workout.reps}</p>` : ''}
            `;
            workoutsContainer.appendChild(workoutElement);
        });
    })
    .catch(error => console.error('Error fetching workouts:', error));
}

function handleAddWorkout(event) {
    event.preventDefault(); // Prevent the default form submission

    const type = document.querySelector('#workout-type').value;
    let workoutData = {
        name: document.querySelector('#workout-name').value,
        type: type,
    };

    // Include conditional fields based on workout type
    if (type === 'Cardio') {
        workoutData.duration = document.querySelector('#workout-duration').value;
        workoutData.caloriesBurned = document.querySelector('#workout-calories').value;
    } else if (type === 'Strength Training') {
        workoutData.sets = document.querySelector('#workout-sets').value;
        workoutData.reps = document.querySelector('#workout-reps').value;
    }

    fetch('/api/workouts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add workout');
        }
    })
    .then(data => {
        console.log('Success:', data);
        fetchWorkouts(); // Refresh the list of workouts
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
