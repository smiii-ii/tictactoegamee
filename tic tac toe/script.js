document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    const winnerCard = document.getElementById('winnerCard');
    const winnerText = document.getElementById('winnerText');
    const winnerIcon = document.getElementById('winnerIcon');
    const closeCard = document.getElementById('closeCard');

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const WINNING_COMBINATIONS = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    function handleCellClick(e) {
        const index = e.target.dataset.index;
        if (board[index] !== "" || !isGameActive) return;

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        checkWinner();
    }

    function checkWinner() {
        let roundWon = false;
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a,b,c] = WINNING_COMBINATIONS[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            showWinnerCard(`Player ${currentPlayer} Wins!`, currentPlayer);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a Draw!";
            showWinnerCard("It's a Draw!", null);
            isGameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }

    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        winnerCard.classList.add("hidden");
    }

    function showWinnerCard(message, player) {
        winnerText.textContent = message;
        if (player === "X") winnerIcon.className = "fas fa-times";
        else if (player === "O") winnerIcon.className = "far fa-circle";
        else winnerIcon.className = "fas fa-handshake"; // for draw
        winnerCard.classList.remove("hidden");
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
    closeCard.addEventListener('click', () => winnerCard.classList.add('hidden'));
});
