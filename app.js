// Datos de la aplicación
const users = [
    { username: 'admin', password: 'admin', role: 'admin' }
];
let currentUser = null;
let players = [];
let teams = [];
let matches = [];

// Funciones de navegación
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
    document.getElementById("user-view").classList.remove("hidden");
    updateUserMatchesList();
}

function showAdminView() {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-view").classList.remove("hidden");
    updatePlayersSelects();
    updateTeamsSelects();
    updatePlayersList();
    updateTeamsList();
    updateMatchesList();
    updateStandings();
}

// Gestión de usuarios
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = user;
        if (user.role === 'admin') {
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

function logout() {
    currentUser = null;
    showLogin();
}

// Gestión de jugadores
document.getElementById("player-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("player-name").value;
    const level = document.getElementById("player-level").value;

    if (isNaN(level) || level < 1 || level > 5) {
        alert("El nivel debe ser un número entre 1 y 5");
        return;
    }

    const player = {
        id: Date.now(),
        name,
        level: parseInt(level)
    };

    players.push(player);
    updatePlayersSelects();
    updatePlayersList();
    e.target.reset();
});

function deletePlayer(playerId) {
    const playerInTeam = teams.some(team => 
        team.player1Id === playerId || team.player2Id === playerId
    );

    if (playerInTeam) {
        alert("No se puede eliminar un jugador que pertenece a un equipo");
        return;
    }

    players = players.filter(p => p.id !== playerId);
    updatePlayersSelects();
    updatePlayersList();
}

function updatePlayersList() {
    const list = document.getElementById("players-list");
    list.innerHTML = players.map(player => `
        <div class="list-item">
            <span>${player.name} (Nivel: ${player.level})</span>
            <button onclick="deletePlayer(${player.id})" class="btn-delete">Eliminar</button>
        </div>
    `).join('');
}

function updatePlayersSelects() {
    const player1Select = document.getElementById("player1-select");
    const player2Select = document.getElementById("player2-select");
    
    const options = players.map(player => 
        `<option value="${player.id}">${player.name} (Nivel: ${player.level})</option>`
    );

    player1Select.innerHTML = '<option value="">Selecciona Jugador 1</option>' + options.join('');
    player2Select.innerHTML = '<option value="">Selecciona Jugador 2</option>' + options.join('');
}

// Gestión de equipos
document.getElementById("team-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("team-name").value;
    const player1Id = parseInt(document.getElementById("player1-select").value);
    const player2Id = parseInt(document.getElementById("player2-select").value);

    if (player1Id === player2Id) {
        alert("Los jugadores deben ser diferentes");
        return;
    }

    const team = {
        id: Date.now(),
        name,
        player1Id,
        player2Id
    };

    teams.push(team);
    updateTeamsSelects();
    updateTeamsList();
    e.target.reset();
});

function deleteTeam(teamId) {
    const teamInMatch = matches.some(match => 
        match.team1Id === teamId || match.team2Id === teamId
    );

    if (teamInMatch) {
        alert("No se puede eliminar un equipo que tiene partidos programados");
        return;
    }

    teams = teams.filter(t => t.id !== teamId);
    updateTeamsSelects();
    updateTeamsList();
    updateStandings();
}

function updateTeamsList() {
    const list = document.getElementById("teams-list");
    list.innerHTML = teams.map(team => {
        const player1 = players.find(p => p.id === team.player1Id);
        const player2 = players.find(p => p.id === team.player2Id);
        return `
            <div class="list-item">
                
