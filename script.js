const displayController = (() => {
    const renderMessage = (message) => {
        document.getElementById("message").innerHTML = message;
        
    }
    return {renderMessage}
})();

const gameBoard = (() => {
    let board = Array(9).fill("");
    let gameBoard = document.getElementById("gameboard");

    const renderBoard = () => {
        gameBoard.innerHTML = "";
        
        board.forEach((cell, index) => {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            cellEl.setAttribute("id", `cell-${index}`)
            cellEl.innerHTML = `${cell}`;
            gameBoard.appendChild(cellEl);
        });
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", gameController.handleClick);
        });    
    };

    const updateBoard = (index, value) => {
        board[index] = value;
        renderBoard();
    }

    const getGameBoard = () => board;
    return { renderBoard, updateBoard, getGameBoard}
})();

const createPlayer = (name, marker) => {
    return {name, marker}
};

const gameController = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.getElementById("player1").value, "X"),
            createPlayer(document.getElementById("player2").value, "O")
        ];
        currentPlayerIndex = 0;
        let gameOver = false;
        gameBoard.renderBoard();
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", handleClick);
        });
    };

    const switchPlayers = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    

    const handleClick = (event) => {
        if (gameOver){
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);

        if (gameBoard.getGameBoard()[index] !== ""){
            return;
        } 
        gameBoard.updateBoard(index, players[currentPlayerIndex].marker);

        if (checkForWin(gameBoard.getGameBoard(), players[currentPlayerIndex].marker)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`)
        } else if (checkForTie(gameBoard.getGameBoard())) {
            gameOver = true;
            displayController.renderMessage("It's a tie!");

        }

        switchPlayers();
    }

    const restart = () => {
        for (let i = 0; i < 9; i++){
            gameBoard.updateBoard(i, "");
        }
        gameBoard.renderBoard();
        displayController.renderMessage("");
        gameOver = false;
        currentPlayerIndex = 0;
    }

    return {start, handleClick, restart}

})();

function checkForWin(board) {
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < winningCombos.length; i++){
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] == board[b] && board[a] == board[c]){
            return true;
        }
    }
    return false;
}

function checkForTie (board) {
    return board.every(cell => cell !== "");
};

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", () => {
    gameController.start();
    const audioElement = document.getElementById('game-music');
    const playAudio = () => {
        audioElement.play();
        startBtn.removeEventListener('click', playAudio);
    };
    playAudio();
})

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
    gameController.restart();
})

