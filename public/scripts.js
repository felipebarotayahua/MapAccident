document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');

    // Check for TOKEN
    const token = localStorage.getItem('token');

    if (token) {
        // If token exists hide loginButton  show logoutButton
        loginButton.style.display = 'none';
        
    } else {
        logoutButton.style.display = 'none';
    }

    // Clear token/ LOG OUT FEATURE
    logoutButton.addEventListener('click', function () {
        // Remove token 
        localStorage.removeItem('token');
        // Redirect 
        window.location.href = '/login.html'; 
    });
});




