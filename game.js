let gameRunning = false;
let playerWins = 0;
let systemWins = 0;
let interval;
let joinTimeout;

const cashOutButton = document.getElementById('cashOut');
const message = document.getElementById('message');

cashOutButton.addEventListener('click', cashOut);

function startGame() {
    gameRunning = true;
    cashOutButton.disabled = false;
    message.textContent = 'Game started! Press "Cash Out" at any time.';
    interval = setInterval(runGame, 1000);
}

function cashOut() {
    if (gameRunning) {
        clearInterval(interval);
        gameRunning = false;
        cashOutButton.disabled = true;
        const win = Math.random() < 0.5;
        if (win) {
            playerWins++;
            message.textContent = 'You cashed out and won!';
        } else {
            systemWins++;
            message.textContent = 'You cashed out and lost!';
        }
        updateStats();
    }
}

function runGame() {
    if (Math.random() < 0.1) { // 10% chance to end the game
        clearInterval(interval);
        gameRunning = false;
        cashOutButton.disabled = true;
        systemWins++;
        message.textContent = 'Game ended automatically. System wins!';
        updateStats();
    }
}

function updateStats() {
    console.log(`Player Wins: ${playerWins}, System Wins: ${systemWins}`);
}

function allowPlayersToJoin() {
    message.textContent = 'Players can join now. Game will start in 1 minute.';
    joinTimeout = setTimeout(startGame, 60000); // 1 minute to join
}

window.onload = allowPlayersToJoin;
