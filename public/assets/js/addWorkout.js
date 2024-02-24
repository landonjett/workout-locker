document.addEventListener('DOMContentLoaded', function() {
    const addWorkoutBtn = document.getElementById('add-workout-btn');
    const workoutForm = document.getElementById('workout-form');
    const typeInput = document.getElementById('type-input');

    function toggleWorkoutForm() {
        workoutForm.style.display = workoutForm.style.display === 'none' || !workoutForm.style.display ? 'block' : 'none';
    }

    if (addWorkoutBtn) {
        addWorkoutBtn.addEventListener('click', toggleWorkoutForm);
    }

    async function handleAddWorkout(event) {
        event.preventDefault();
        
        const name = document.getElementById('name-input').value.trim();
        const type = typeInput.value.trim();
        let workoutData = { name, type };

        // Check the type of workout and adjust the payload accordingly
        if (type === 'Cardio') {
            const duration = parseInt(document.getElementById('duration-input').value.trim(), 10);
            const calories = parseInt(document.getElementById('calories-input').value.trim(), 10);
            if (isNaN(duration) || isNaN(calories)) {
                alert('Please fill out all fields correctly.');
                return;
            }
            workoutData.duration = duration;
            workoutData.calories = calories;
        } else if (type === 'Strength Training') {
            const sets = parseInt(document.getElementById('sets-input').value.trim(), 10);
            const reps = parseInt(document.getElementById('reps-input').value.trim(), 10);
            if (isNaN(sets) || isNaN(reps)) {
                alert('Please fill out all fields correctly.');
                return;
            }
            workoutData.sets = sets;
            workoutData.reps = reps;
        }

        try {
            const response = await fetch('/api/workouts/add', { // Ensure this endpoint matches your server's route
                method: 'POST',
                body: JSON.stringify(workoutData),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                const data = await response.json();
                alert(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error adding workout:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }

    if (workoutForm) {
        workoutForm.addEventListener('submit', handleAddWorkout);
    }
});
