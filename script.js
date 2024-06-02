document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    const gameModeSelect = document.getElementById('gameMode');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let gameMode = 'twoPlayer';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        checkResult();

        if (gameActive) {
            if (gameMode === 'vsAI' && currentPlayer === 'X') {
                currentPlayer = 'O';
                aiMove();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    };

    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            messageElement.innerText = 'Draw!';
            gameActive = false;
        }
    };

    const aiMove = () => {
        let availableIndices = board.map((value, index) => value === '' ? index : null).filter(val => val !== null);
        if (availableIndices.length > 0) {
            let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
            board[randomIndex] = 'O';
            cells[randomIndex].innerText = 'O';
            checkResult();
            if (gameActive) {
                currentPlayer = 'X';
            }
        }
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.innerText = '');
        currentPlayer = 'X';
        gameActive = true;
        messageElement.innerText = '';
    };

    const handleGameModeChange = () => {
        gameMode = gameModeSelect.value;
        resetGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    gameModeSelect.addEventListener('change', handleGameModeChange);
});
