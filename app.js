const users = [
    { username: 'admin', password: 'admin', role: 'admin' }
];
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

function showUserView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("user-view").classList.remove("hidden");
    document.getElementById("admin-view").classList.add("hidden");
    updateUserMatches();
}

function showAdminView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("register-section").classList.add("hidden");
    document.getElementById("user-view").classList.add("hidden");
    document.getElementById("admin-view").classList.remove("hidden");
    updateAdminView();
}

// Manejadores de eventos para los formularios
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        if (user.role === "admin") {
            showAdminView();
        } else {
            showUserView();
        }
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value;

    if (users.find(u => u.username === username)) {
        alert("Usuario ya registrado");
        return;
    }

    users.push({ username, password, role });
    alert("Usuario registrado con éxito");
    showLogin();
});

// Funcionalidad para añadir jugadores
function addPlayer() {
    const playerName = document.getElementById("player-name").value;
    if (!playerName) {
        alert("Por favor ingrese el nombre del jugador");
        return;
    }
    
    const player = {
        id: players.length + 1,
        name: playerName
    };
    
    players.push(player);
    alert("Jugador añadido con éxito");
    document.getElementById("player-name").value = "";
    updatePlayersList();
}

// Funcionalidad para añadir equipos
function addTeam() {
    const teamName = document.getElementById("team-name").value;
    if (!teamName) {
        alert("Por favor ingrese el nombre del equipo");
        return;
    }
    
    const team = {
        id: teams.length + 1,
        name: teamName,
        players: []
    };
    
    teams.push(team);
    alert("Equipo añadido con éxito");
    document.getElementById("team-name").value = "";
    updateTeamsList();
}

// Funcionalidad para programar partidos
function scheduleMatch() {
    const team1 = document.getElementById("team1").value;
    const team2 = document.getElementById("team2").value;
    const date = document.getElementById("match-date").value;
    
    if (!team1 || !team2 || !date) {
        alert("Por favor complete todos los campos");
        return;
    }
    
    if (team1 === team2) {
        alert("No se puede programar un partido entre el mismo equipo");
        return;
    }
    
    const match = {
        id: matches.length + 1,
        team1: team1,
        team2: team2,
        date: date,
        status: "Pendiente"
    };
    
    matches.push(match);
    alert("Partido programado con éxito");
    updateMatchesList();
}

// Funciones para actualizar las listas
function updatePlayersList() {
    const playersList = document.getElementById("players-list");
    if (playersList) {
        playersList.innerHTML = players.map(player => 
            `<div>${player.name} <button onclick="deletePlayer(${player.id})">Eliminar</button></div>`
        ).join('');
    }
}

function updateTeamsList() {
    const teamsList = document.getElementById("teams-list");
    if (teamsList) {
        teamsList.innerHTML = teams.map(team => 
            `<div>${team.name} <button onclick="deleteTeam(${team.id})">Eliminar</button></div>`
        ).join('');
    }
}

function updateMatchesList() {
    const matchesList = document.getElementById("matches-list");
    if (matchesList) {
        matchesList.innerHTML = matches.map(match => 
            `<div>
                ${match.team1} vs ${match.team2} - ${match.date}
                <button onclick="deleteMatch(${match.id})">Cancelar</button>
            </div>`
        ).join('');
    }
}

// Funciones para eliminar elementos
function deletePlayer(id) {
    const index = players.findIndex(p => p.id === id);
    if (index !== -1) {
        players.splice(index, 1);
        updatePlayersList();
    }
}

function deleteTeam(id) {
    const index = teams.findIndex(t => t.id === id);
    if (index !== -1) {
        teams.splice(index, 1);
        updateTeamsList();
    }
}

function deleteMatch(id) {
    const index = matches.findIndex(m => m.id === id);
    if (index !== -1) {
        matches.splice(index, 1);
        updateMatchesList();
    }
}

// Función para actualizar la vista de administrador
function updateAdminView() {
    updatePlayersList();
    updateTeamsList();
    updateMatchesList();
}

// Función para actualizar los partidos del usuario
function updateUserMatches() {
    const userMatchesList = document.getElementById("user-matches-list");
    if (userMatchesList) {
        userMatchesList.innerHTML = matches.map(match => 
            `<div>${match.team1} vs ${match.team2} - ${match.date}</div>`
        ).join('');
    }
}

function logout() {
    currentUser = null;
    showLogin();
}

// Agregar event listeners para los botones
document.addEventListener('DOMContentLoaded', function() {
    // Event listener para añadir jugador
    const addPlayerBtn = document.querySelector('button[onclick="addPlayer()"]');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', addPlayer);
    }

    // Event listener para añadir equipo
    const addTeamBtn = document.querySelector('button[onclick="addTeam()"]');
    if (addTeamBtn) {
        addTeamBtn.addEventListener('click', addTeam);
    }

    // Event listener para programar partido
    const scheduleMatchBtn = document.querySelector('button[onclick="scheduleMatch()"]');
    if (scheduleMatchBtn) {
        scheduleMatchBtn.addEventListener('click', scheduleMatch);
    }
});
