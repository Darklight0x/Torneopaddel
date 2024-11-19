const users = [];
let currentUser = null;

const players = [];
const teams = [];
const matches = [];
const standings = {};

// Mostrar pantalla de inicio de sesión
function showLogin() {
    document.getElementById("login-section").classList.remove("hidden");
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("user-view").classList.add("hidden");
    document.getElementById("admin-view").classList.add("hidden");
}

// Mostrar pantalla de registro
function showRegister() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.remove("hidden");
}

// Manejar inicio de sesión
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

// Manejar registro
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

// Mostrar vista de usuario
function showUserView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("user-view").classList.remove("hidden");
}

// Mostrar vista de administrador
function showAdminView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-view").classList.remove("hidden");
}

// Cerrar sesión
function logout() {
    currentUser = null;
    showLogin();
}

// Funciones de administrador
function addPlayer() {
    const playerName = prompt("Introduce el nombre del jugador:");
    if (playerName) {
        players.push(playerName);
        alert(Jugador "${playerName}" añadido con éxito.);
        renderPlayers();
    }
}

function renderPlayers() {
    const playersList = document.getElementById("players-list");
    playersList.innerHTML = ""; // Limpia la lista antes de renderizar
    players.forEach((player) => {
        const li = document.createElement("li");
        li.textContent = player;
        playersList.appendChild(li);
    });
}

function addTeam() {
    const teamName = prompt("Introduce el nombre del equipo:");
    if (teamName) {
        teams.push(teamName);
        alert(Equipo "${teamName}" añadido con éxito.);
        renderTeams();
    }
}

function renderTeams() {
    const teamsList = document.getElementById("teams-list");
    teamsList.innerHTML = "";
    teams.forEach((team) => {
        const li = document.createElement("li");
        li.textContent = team;
        teamsList.appendChild(li);
    });
}

function scheduleMatch() {
    const match = prompt("Introduce los detalles del partido (Equipo A vs Equipo B):");
    if (match) {
        matches.push(match);
        alert(Partido "${match}" programado con éxito.);
        renderMatches();
    }
}

function renderMatches() {
    const matchesList = document.getElementById("matches-list");
    matchesList.innerHTML = "";
    matches.forEach((match) => {
        const li = document.createElement("li");
        li.textContent = match;
        matchesList.appendChild(li);
    });
}
