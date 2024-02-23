document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the "Add New Workout" button
    const addWorkoutBtn = document.getElementById('add-workout-btn');
    // Get reference to the workout form and initially hide it
    const workoutForm = document.getElementById('workout-form');
    const nameInput = document.getElementById('name-input');
    const typeInput = document.getElementById('type-input');
    const durationInput = document.getElementById('duration-input');
    const caloriesInput = document.getElementById('calories-input');

    // Function to toggle the workout form visibility
    function toggleWorkoutForm() {
        const workoutForm = document.getElementById('workout-form');
        if (workoutForm.style.display === 'none' || !workoutForm.style.display) {
            workoutForm.style.display = 'block';
        } else {
            workoutForm.style.display = 'none';
        }
    }

    // Add click event listener to the "Add New Workout" button
    if (addWorkoutBtn) {
        addWorkoutBtn.addEventListener('click', toggleWorkoutForm);
    } else {
        console.error('"Add New Workout" button not found.');
    }

    // Function to handle form submission
    async function handleAddWorkout(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the values from the form inputs
        const name = nameInput.value.trim();
        const type = typeInput.value.trim();
        const duration = parseInt(durationInput.value.trim(), 10);
        const calories = parseInt(caloriesInput.value.trim(), 10);

        // Validate input values, if necessary
        if (!name || !type || isNaN(duration) || isNaN(calories)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        // Send a POST request to the server with the form data
        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify({ name, type, duration, calories }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // If the workout was added successfully, refresh or redirect the user
                window.location.href = '/dashboard'; // Adjust as needed
            } else {
                // If there was an error, display an error message
                const data = await response.json();
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }

    // Ensure the form exists before adding event listener
    if (workoutForm) {
        workoutForm.addEventListener('submit', handleAddWorkout);
        workoutForm.style.display = 'none'; // Initially hide the form
    } else {
        console.error('Workout form not found.');
    }
});
