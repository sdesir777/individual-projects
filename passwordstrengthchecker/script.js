// Selecting DOM elements
const password = document.getElementById('password');
const strengthMeter = document.getElementById('strength-meter');
const feedback = document.getElementById('feedback');
const togglePassword = document.getElementById('togglePassword');
const copyPassword = document.getElementById('copyPassword');

// Event Listeners
password.addEventListener('input', updateStrengthMeter);
togglePassword.addEventListener('click', togglePasswordVisibility);
copyPassword.addEventListener('click', copyToClipboard);

// Update Password Strength Meter
function updateStrengthMeter() {
    const value = password.value.trim();
    let strength = 0;
    let feedbackMsg = [];

    // Clear everything if the field is empty
    if (value === '') {
        strengthMeter.style.backgroundColor = '#ddd';
        feedback.textContent = '';
        return;
    }

    if (value.length >= 10) {
        strength++;
    } else {
        feedbackMsg.push('Password must be at least 10 characters long.');
    }

    if (/[A-Z]/.test(value)) {
        strength++;
    } else {
        feedbackMsg.push('Add an uppercase letter.');
    }

    if (/[0-9]/.test(value)) {
        strength++;
    } else {
        feedbackMsg.push('Add a number.');
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        strength++;
    } else {
        feedbackMsg.push('Add a special character.');
    }

    if (!/(.)\1{2,}/.test(value)) {
        strength++;
    } else {
        feedbackMsg.push('Avoid repeated characters.');
    }

    // Update Strength Meter and Feedback
    switch (strength) {
        case 0:
        case 1:
            strengthMeter.style.backgroundColor = 'red';
            feedback.textContent = 'Very Weak ;(';
            feedback.className = 'very-weak';
            break;
        case 2:
            strengthMeter.style.backgroundColor = 'orange';
            feedback.textContent = 'Weak';
            feedback.className = 'weak';
            break;
        case 3:
            strengthMeter.style.backgroundColor = 'yellow';
            feedback.textContent = 'Medium';
            feedback.className = 'medium';
            break;
        case 4:
            strengthMeter.style.backgroundColor = 'green';
            feedback.textContent = 'Strong';
            feedback.className = 'strong';
            break;
        case 5:
            strengthMeter.style.backgroundColor = 'blue';
            feedback.textContent = 'Very Strong ;)';
            feedback.className = 'very-strong';
            break;
    }

    // Display Suggestions
    if (feedbackMsg.length > 0) {
        feedback.innerHTML += '<br><small>${feedbackMsg.join('<br>')}</small>';
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    if (password.type === 'password') {
        password.type = 'text';
        togglePassword.textContent = '🙈';
    } else {
        password.type = 'password';
        togglePassword.textContent = '👁️';
    }
}

// Copy Password to Clipboard
function copyToClipBoard() {
    if (password.value.trim() === '') {
        alert('No password to copy!');
        return;
    }
    navigator.clipboard.writeText(password.value)
        .then(() => {
            showNotification('Password copied to clipboard!');
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy password.', 'error');
        });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('copyNotification');
    notification.textContent = message;
    notification.className = 'notification';
    if (type === 'error') {
        notification.classList.add('error');
    }
    notification.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}