
const users = [];
let currentUser = null;

const players = [];
const teams = [];
const matches = [];
const standings = {};

function showLogin() {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("user-view").classList.add("hidden");
    document.getElementById("admin-view").classList.add("hidden");
}

function showRegister() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        if (user.role === "admin") showAdminView();
        else showUserView();
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value;

    if (users.find((u) => u.username === username)) {
        alert("Usuario ya registrado");
        return;
    }

    users.push({ username, password, role });
    alert("Usuario registrado con éxito");
    showLogin();
});

function showUserView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("user-view").classList.remove("hidden");
}

function showAdminView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-view").classList.remove("hidden");
}

function logout() {
    currentUser = null;
    showLogin();
}
