const users = [
    { email: "admin@wavebeat.com", password: "admin123", name: "Admin" },
    { email: "user1@wavebeat.com", password: "123456", name: "Alex" },
    { email: "user2@wavebeat.com", password: "123456", name: "Emma" },
    { email: "user3@wavebeat.com", password: "123456", name: "Ryan" },
    { email: "user4@wavebeat.com", password: "123456", name: "Sophia" }
];

function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        msg.style.color = "lightgreen";
        msg.innerText = "Login successful! Welcome " + user.name;

        // save session
        localStorage.setItem("wavebeat_user", JSON.stringify(user));

        // redirect after 1 sec
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } else {
        msg.style.color = "red";
        msg.innerText = "Invalid email or password";
    }
}