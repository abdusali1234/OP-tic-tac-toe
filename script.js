console.log('Tic tac toe!');

const gameBoard= (function () {

    let board = Array(9).fill(null);

    const getBoard = () => {
        board;
    }

    function displayBoard() {
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
            return true;
        }
        return false;
    };

    const clearBoard = () => {
        board.fill(null);
    }

    return {getBoard, displayBoard, setCell, clearBoard}
})();

function createPlayer(name, marker){
    return {name, marker};
}

gameBoard.displayBoard();