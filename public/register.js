document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                // Registration successful
                window.location.href = '/login.html'; // Redirect to login page
            } else {
                // Registration failed
                messageDiv.textContent = data.message;
            }
        } catch (error) {
            console.error('Error registering:', error);
            messageDiv.textContent = 'An error occurred. Please try again later.';
        }
    });
});
