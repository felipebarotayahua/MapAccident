// document.addEventListener('DOMContentLoaded', function () {
//     const loginForm = document.getElementById('loginForm');
//     const messageDiv = document.getElementById('message');

//     loginForm.addEventListener('submit', async function (event) {
//         event.preventDefault();

//         const formData = new FormData(loginForm);
//         const email = formData.get('email');
//         const password = formData.get('password');

//         try {
//             const response = await fetch('/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 window.location.href = '/index.html'; 
//             } else {
//                 messageDiv.textContent = data.message;
//             }
//         } catch (error) {
//             console.error('Error logging in:', error);
//             messageDiv.textContent = 'An error occurred. Please try again later.';
//         }
//     });
// });





document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const logoutButton = document.getElementById('logoutButton');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/index.html'; 
            } else {
                messageDiv.textContent = data.message;
            }
        } catch (error) {
            console.error('Error logging in:', error);
            messageDiv.textContent = 'An error occurred. Please try again later.';
        }
    });

});

