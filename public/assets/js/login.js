document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the email and password from the form
    const email = document.querySelector('#email-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (email && password) {
      // Send a POST request to the server with the email and password
      fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      .then(response => {
        if (response.ok) {
          // Redirect to the dashboard if login is successful
          window.location.replace('/dashboard');
        } else {
          // If there's an error, display it
          response.json().then(data => {
            alert('Failed to log in. ' + data.message);
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert('Please enter both email and password.');
    }
  });
});
