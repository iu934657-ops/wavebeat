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
    if (!loginBtn) return;

    const user = getCurrentUser();
    if (user && user.name) {
        loginBtn.textContent = `Logout (${user.name})`;
        loginBtn.classList.add("logged-in");
    } else {
        loginBtn.textContent = "Login";
        loginBtn.classList.remove("logged-in");
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

function initializeAuth() {
    const loginBtn = document.querySelector(".login-btn");
    if (!loginBtn) return;

    setLoginButtonState();
    loginBtn.addEventListener("click", handleLoginButtonClick);
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
