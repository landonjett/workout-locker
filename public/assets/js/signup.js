// Get references to the form elements
const signupForm = document.querySelector('#signup-form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// Function to handle form submission
const handleSignup = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the values from the form inputs
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Send a POST request to the server with the form data
  try {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If the signup was successful, redirect the user to the login page
      window.location.href = '/login';
      console.log('User signed up successfully!');
    } else {
      // If there was an error with the signup, display an error message
      const data = await response.json();
      alert(data.error || 'Something went wrong. Please try again.');
      console.log('Error signing up:', data);
    }
  } catch (error) {
    console.error('Error signing up:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};

// Add an event listener to the form for the form submission event
signupForm.addEventListener('submit', handleSignup);
