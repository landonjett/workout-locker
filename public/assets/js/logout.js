document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('.btn-logout');

  if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default action

          // Send a POST request to the server's logout route
          fetch('/api/users/logout', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then(response => {
              if (response.ok) {
                  // If logout successful, redirect to login page or homepage
                  window.location.href = '/login'; // Redirect to the login page
              } else {
                  // Optionally handle logout failure
                  console.error('Logout failed.');
              }
          })
          .catch(error => console.error('Error:', error));
      });
  }
});
