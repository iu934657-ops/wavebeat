const AUTH_STORAGE_KEY = "wavebeat_user";

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    } catch (error) {
        return null;
    }
}

function setLoginButtonState() {
    const loginBtn = document.querySelector(".login-btn");
    const mobileLoginLink = document.querySelector(".mobile-login-btn");
    const user = getCurrentUser();

    if (loginBtn) {
        if (user && user.name) {
            loginBtn.textContent = `Logout (${user.name})`;
            loginBtn.classList.add("logged-in");
        } else {
            loginBtn.textContent = "Login";
            loginBtn.classList.remove("logged-in");
        }
    }

    if (mobileLoginLink) {
        if (user && user.name) {
            mobileLoginLink.textContent = `Logout (${user.name})`;
            mobileLoginLink.setAttribute("href", "#");
            mobileLoginLink.classList.add("logged-in");
            mobileLoginLink.dataset.logged = "true";
        } else {
            mobileLoginLink.textContent = "Login";
            mobileLoginLink.setAttribute("href", "login.html");
            mobileLoginLink.classList.remove("logged-in");
            delete mobileLoginLink.dataset.logged;
        }
    }
}

function handleLoginButtonClick() {
    const user = getCurrentUser();
    if (user) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        window.location.reload();
    } else {
        window.location.href = "login.html";
    }
}

function handleMobileLoginClick(e) {
    const mobileLoginLink = document.querySelector(".mobile-login-btn");
    if (!mobileLoginLink) return;

    const user = getCurrentUser();
    if (user) {
        e.preventDefault();
        localStorage.removeItem(AUTH_STORAGE_KEY);
        // close mobile nav if open
        const navLinks = document.querySelector(".nav-links");
        if (navLinks && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
        // reload to update UI
        window.location.reload();
    }
    // if not logged in, allow navigation to login.html
}

function initializeAuth() {
    const loginBtn = document.querySelector(".login-btn");
    if (!loginBtn) return;

    setLoginButtonState();
    loginBtn.addEventListener("click", handleLoginButtonClick);

    const mobileLoginLink = document.querySelector(".mobile-login-btn");
    if (mobileLoginLink) {
        mobileLoginLink.addEventListener("click", handleMobileLoginClick);
    }
}

function ensureLoggedOutOnLoginPage() {
    const message = document.getElementById("msg");
    const user = getCurrentUser();
    if (user && message) {
        message.style.color = "lightgreen";
        message.textContent = `Already logged in as ${user.name}. Redirecting to home...`;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initializeAuth();
        ensureLoggedOutOnLoginPage();
    });
} else {
    initializeAuth();
    ensureLoggedOutOnLoginPage();
}
