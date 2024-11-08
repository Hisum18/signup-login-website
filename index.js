document.addEventListener('DOMContentLoaded', function() {
    console.log("index.js loaded");

    function toggleForm() {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');

        if (loginForm.classList.contains('active')) {
            loginForm.classList.remove('active');
            loginForm.classList.add('exit');
            
            setTimeout(() => {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
                signupForm.classList.remove('exit');
                signupForm.classList.add('active');
            }, 500); // Match CSS transition duration
        } else {
            signupForm.classList.remove('active');
            signupForm.classList.add('exit');
            
            setTimeout(() => {
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
                loginForm.classList.remove('exit');
                loginForm.classList.add('active');
            }, 500); // Match CSS transition duration
        }
    }

    window.toggleForm = toggleForm;

    function togglePasswordVisibility() {
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirm-password');
        const toggleIcons = document.querySelectorAll('.toggle-password');
        
        toggleIcons.forEach(icon => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                if (confirmPasswordField) confirmPasswordField.type = 'text';
                icon.textContent = '🙈'; // Hide icon
            } else {
                passwordField.type = 'password';
                if (confirmPasswordField) confirmPasswordField.type = 'password';
                icon.textContent = '👁️'; // Show icon
            }
        });
    }

    window.togglePasswordVisibility = togglePasswordVisibility;

    document.querySelector('#signup-form-inner').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Sign-up form submitted");

        const email = this.querySelector('input[type="email"]').value;
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        const retypePassword = this.querySelectorAll('input[type="password"]')[1].value;

        if (password !== retypePassword) {
            alert('Passwords do not match!');
            return;
        }

        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data => {
            console.log("Server response:", data);
            alert(data);
            if (data === 'User registered successfully') {
                window.location.href = 'welcome.html';
            }
        })
        .catch(error => console.error("Fetch error:", error));
    });
});
