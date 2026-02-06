// LLB Buddy - Authentication JavaScript

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('llb_user') !== null;
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('llb_user');
    return user ? JSON.parse(user) : null;
}

// Get user initials
function getUserInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // Show loading state
    document.getElementById('loginBtnText').classList.add('hidden');
    document.getElementById('loginBtnLoader').classList.remove('hidden');
    document.getElementById('loginBtn').disabled = true;

    // Simulate API call
    setTimeout(() => {
        // In demo mode, accept any credentials
        const user = {
            id: Date.now(),
            email: email,
            name: extractNameFromEmail(email),
            phone: '',
            createdAt: new Date().toISOString(),
            plan: 'Free'
        };

        // Save to localStorage
        localStorage.setItem('llb_user', JSON.stringify(user));

        if (remember) {
            localStorage.setItem('llb_remember', 'true');
        }

        // Show success and redirect
        showToast('Login successful! Redirecting...', 'success');

        setTimeout(() => {
            // Check if there's a redirect URL
            const redirect = sessionStorage.getItem('llb_redirect') || 'dashboard.html';
            sessionStorage.removeItem('llb_redirect');
            window.location.href = redirect;
        }, 1000);

    }, 1500);
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }

    // Validate password strength
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    // Show loading state
    document.getElementById('signupBtnText').classList.add('hidden');
    document.getElementById('signupBtnLoader').classList.remove('hidden');
    document.getElementById('signupBtn').disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Create user object
        const user = {
            id: Date.now(),
            email: email,
            name: fullName,
            phone: phone,
            createdAt: new Date().toISOString(),
            plan: 'Free'
        };

        // Save to localStorage
        localStorage.setItem('llb_user', JSON.stringify(user));

        // Show success and redirect
        showToast('Account created successfully! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    }, 1500);
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('llb_user');
    localStorage.removeItem('llb_remember');
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Social Login (Demo)
function socialLogin(provider) {
    // Show loading
    showToast(`Connecting to ${provider}...`, 'info');

    setTimeout(() => {
        const user = {
            id: Date.now(),
            email: `user@${provider}.com`,
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            phone: '',
            createdAt: new Date().toISOString(),
            plan: 'Free',
            provider: provider
        };

        localStorage.setItem('llb_user', JSON.stringify(user));
        showToast('Login successful! Redirecting...', 'success');

        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 1500);
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(inputId + 'Eye') || document.getElementById('passwordEye');

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        `;
    } else {
        input.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        `;
    }
}

// Check Password Strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strength1 = document.getElementById('strength1');
    const strength2 = document.getElementById('strength2');
    const strength3 = document.getElementById('strength3');
    const strength4 = document.getElementById('strength4');
    const strengthText = document.getElementById('strengthText');

    // Reset
    [strength1, strength2, strength3, strength4].forEach(el => {
        el.className = 'h-1 flex-1 rounded bg-gray-200';
    });

    if (password.length === 0) {
        strengthText.textContent = '';
        return;
    }

    let score = 0;

    // Length
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;

    // Complexity
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Cap at 4
    score = Math.min(score, 4);

    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const texts = ['Weak', 'Fair', 'Good', 'Strong'];

    const elements = [strength1, strength2, strength3, strength4];
    for (let i = 0; i < score; i++) {
        elements[i].className = `h-1 flex-1 rounded ${colors[score - 1]}`;
    }

    strengthText.textContent = texts[score - 1] || '';
    strengthText.className = `text-xs mt-1 ${score <= 1 ? 'text-red-600' : score === 2 ? 'text-orange-600' : score === 3 ? 'text-yellow-600' : 'text-green-600'}`;
}

// Check Password Match
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const matchText = document.getElementById('passwordMatchText');

    if (confirmPassword.length === 0) {
        matchText.classList.add('hidden');
        return;
    }

    matchText.classList.remove('hidden');

    if (password === confirmPassword) {
        matchText.textContent = 'Passwords match';
        matchText.className = 'text-xs mt-1 text-green-600';
    } else {
        matchText.textContent = 'Passwords do not match';
        matchText.className = 'text-xs mt-1 text-red-600';
    }
}

// Show Error Message
function showError(message) {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
        setTimeout(() => {
            errorEl.classList.add('hidden');
        }, 5000);
    }
}

// Extract name from email
function extractNameFromEmail(email) {
    const localPart = email.split('@')[0];
    // Convert "john.doe" or "john_doe" to "John Doe"
    return localPart
        .replace(/[._]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Toast notification
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add styles if not in stylesheet
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    if (type === 'success') toast.style.backgroundColor = '#059669';
    else if (type === 'error') toast.style.backgroundColor = '#dc2626';
    else toast.style.backgroundColor = '#1e3a5f';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Protect page - redirect to login if not authenticated
function requireAuth() {
    if (!isLoggedIn()) {
        // Save current page for redirect after login
        sessionStorage.setItem('llb_redirect', window.location.pathname.split('/').pop());
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Update navigation based on auth state
function updateNavigation() {
    const user = getCurrentUser();
    const navAuthSection = document.getElementById('navAuthSection');

    if (!navAuthSection) return;

    if (user) {
        const initials = getUserInitials(user.name);
        navAuthSection.innerHTML = `
            <div class="relative" id="userDropdown">
                <button onclick="toggleUserMenu()" class="flex items-center space-x-2 hover:text-accent transition">
                    <div class="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold">
                        ${initials}
                    </div>
                    <span class="hidden md:inline">${user.name}</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div class="px-4 py-3 border-b">
                        <p class="text-sm font-medium text-gray-900">${user.name}</p>
                        <p class="text-xs text-gray-500">${user.email}</p>
                    </div>
                    <a href="dashboard.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        Dashboard
                    </a>
                    <a href="profile.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        Profile
                    </a>
                    <a href="settings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Settings
                    </a>
                    <hr class="my-1">
                    <button onclick="handleLogout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        `;
    } else {
        navAuthSection.innerHTML = `
            <a href="login.html" class="hover:text-accent transition">Login</a>
            <a href="signup.html" class="bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Sign Up
            </a>
        `;
    }
}

// Toggle User Menu
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('userDropdown');
    const menu = document.getElementById('userMenu');

    if (dropdown && menu && !dropdown.contains(event.target)) {
        menu.classList.add('hidden');
    }
});

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
});
