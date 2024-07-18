console.log('Tic tac toe!');

const gameBoard= ( () => {

    let board = [];//Array(9).fill(null);

    for (let i = 1; i <= 9; i++){
        board.push(i);
    }

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

    function setCell( marker){
        validCell = false;
        while (validCell === false){
            let index = prompt("Enter a number between 0 and 8: ");
            if (board[index] == null){
                board[index] = marker;
                validCell = true;
                return true;
            } else {
                console.log("Cell is already taken, use another one!");
            }
        }
        
        
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
        isGameOver = false;
        gameBoard.clearBoard();
    };

    function changeCurrentPlayer() {
        currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
    };

    const checkForWin = (board, marker) =>{
        return winningCombos.some(combo =>
            combo.every(index => board[index] == marker)
        );
    };

    const checkForTie = (board) => {
        return board.every(cell => cell !== null);
    };

    

    function playGame() {
        if (isGameOver) console.log("Thank's for playing!");
        console.log("Let's play!");
        gameBoard.displayBoard();

        while (isGameOver === false){
            console.log(`${currentPlayer.name}'s turn!`);
            gameBoard.setCell(currentPlayer.marker);
            gameBoard.displayBoard();
            if (checkForWin(gameBoard.getBoard(), currentPlayer.marker)) {
                console.log(`${currentPlayer.name} wins!`);
                isGameOver = true;
            };

            if (checkForTie(gameBoard.getBoard())) {
                console.log("It's a tie!");
                isGameOver = true;
            };
            changeCurrentPlayer();
        };

    };

    const getPlayerOne = () => playerOne;
    const getPlayerTwo = () => playerTwo;
    const getCurrentPlayer = () => currentPlayer;

    return {startGame, playGame, getPlayerOne, getPlayerTwo, getCurrentPlayer, checkForWin}


})();

game.startGame("Mij", "Bah");
console.log(game.getPlayerOne());
console.log(game.getPlayerTwo());
console.log(game.getCurrentPlayer());
game.playGame();
//gameBoard.displayBoard();
//console.log(gameBoard.getBoard());