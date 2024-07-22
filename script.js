console.log('Tic tac toe!');

const gameBoard= ( () => {

    let board = Array(9).fill(null);



    const getBoard = () => board;

    const displayBoard = () => {
        console.log(`
            ${board[0]} | ${board[1]} | ${board[2]}
            --+---+--
            ${board[3]} | ${board[4]} | ${board[5]}
            --+---+--
            ${board[6]} | ${board[7]} | ${board[8]}
            `)
    };

    function setCell(index, marker){  
        if (board[index] == null){
            board[index] = marker;
            validCell = true;
            return true;
        }
        return false;
    };


    const clearBoard = () => {
        board.fill(null);
    };

    return {getBoard, displayBoard, setCell, clearBoard}
})();

function createPlayer(name, marker){
    return {name, marker};
};

const game = (function() {
    let playerOne;
    let playerTwo;
    let currentPlayer;
    let isGameOver;

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



    function startGame(playerOneName, playerTwoName) {
        playerOne = createPlayer(playerOneName, 'X');
        playerTwo = createPlayer(playerTwoName, 'O');
        currentPlayer = playerOne;
        gameBoard.clearBoard();
        displayController.renderBoard();
        isGameOver = false;
        
    };

    

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
        displayController.playerTurnMessage();
    };

    const checkForWin = (board, marker) =>{
        return winningCombos.some(combo =>
            combo.every(index => board[index] == marker)
        );
    };

    const checkForTie = (board) => {
        return board.every(cell => cell !== null);
    };

    

    function playGame(index) {
        if (isGameOver) return;

        
        
        if (gameBoard.setCell(index, currentPlayer.marker)){
            
            console.log(`${currentPlayer.name}'s turn!`); 
            gameBoard.setCell(currentPlayer.marker);
            gameBoard.displayBoard();
            if (checkForWin(gameBoard.getBoard(), currentPlayer.marker)) {
                displayController.winnerMessage();
                setTimeout( () => {
                    isGameOver = true;
                    return;
                }, 1000);                
            };

            if (checkForTie(gameBoard.getBoard())) {
                displayController.tieMessage();
                isGameOver = true;
                return;
            }
            changeCurrentPlayer();
            displayController.renderBoard();
        };

    };

    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const getCurrentPlayer = () => currentPlayer;

    return {startGame, playGame, getPlayerOne, getPlayerTwo, getCurrentPlayer, checkForWin}


})();

const displayController = ( function () {
    const gameGrid = document.getElementById("game-grid");
    const displayMessage = document.getElementById("display-message");

    function renderBoard () {
        gameGrid.innerHTML = "";
        gameBoard.getBoard().forEach((cell, index) => {
            const cellEl = document.createElement('div');
            cellEl.classList.add('grid-cell');
            cellEl.setAttribute("id", `cell-${index+1}`)
            cellEl.innerHTML = '';

            if (cell === "X" || cell === "O"){
                cellEl.innerHTML = `${cell}`;
            }

            gameGrid.appendChild(cellEl);
            cellEl.addEventListener("click", () => {
                game.playGame(index);
            });

            
        });

    };


    function playerTurnMessage () {
        currentPlayer = game.getCurrentPlayer();
        displayMessage.innerHTML = `${currentPlayer.name}'s turn!`;
    }

    function winnerMessage() {
        currentPlayer = game.getCurrentPlayer();
        displayMessage.innerHTML = `${currentPlayer.name} wins!`;
        console.log(`${currentPlayer.name} wins!`);
    }

    function tieMessage() {
        displayMessage.innerHTML = "Its a tie!";
        console.log("Tie");
    }

    

    return {renderBoard, playerTurnMessage, winnerMessage, tieMessage}
})();



document.addEventListener("DOMContentLoaded", (event) => {
    game.startGame("Player 1", "Player 2");

    // const musicEl = document.getElementById("game-music");
    // const playMusic = () => {
    //     musicEl.play();
    //     document.removeEventListener('click', playMusic);
    // };
    // document.addEventListener('click', playMusic);

});