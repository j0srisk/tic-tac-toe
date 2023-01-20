const gridSections = document.querySelectorAll('.grid-section');
gridSections.forEach(element => element.addEventListener('click', () => userTurn(element), true));

const playerFactory = (name, marker) => {
    return { name, marker };
};

const user = playerFactory('User', 'X');
const program = playerFactory('Program', 'O');

let currentPlayer = user;
let winner = null;
const winningCombinations = [[0,3,6], [1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]
    const getBoard = () => board;
    const setBoard = (index, marker) => board[index] = marker;
    return ({ getBoard, setBoard });
})();

const displayController = (() => {
    const render = () => {
        const board = gameBoard.getBoard();
        const gridSection = document.querySelectorAll('.grid-section');
        gridSection.forEach((gridSection, index) => {
            gridSection.textContent = board[index];
        });
    };

    return ({ render });
})();

function userTurn(element) {
    if (currentPlayer === user && element.innerHTML === "") {
        gameBoard.setBoard(element.getAttribute('index'), user.marker);
        displayController.render();
        currentPlayer = program;
        if (checkWinner() === null) {
            programMove();
        }
    }
};

function programMove() {
    let randomNumber = Math.floor(Math.random() * 10);
    while (gameBoard.getBoard()[randomNumber] != ""){
        randomNumber = Math.floor(Math.random() * 10)
    };
    gameBoard.setBoard(randomNumber, program.marker);
    displayController.render();
    if (checkWinner() === null){
        currentPlayer = user;
    }
};

function checkWinner() {
    if (gameBoard.getBoard().includes("") === false) {
        winner = "Tie";
    };

    winningCombinations.forEach(winningCombination => {
        if (gameBoard.getBoard()[winningCombination[0]] != "") {
            if (gameBoard.getBoard()[winningCombination[0]] === gameBoard.getBoard()[winningCombination[1]] && gameBoard.getBoard()[winningCombination[1]] === gameBoard.getBoard()[winningCombination[2]]){
                if (gameBoard.getBoard()[winningCombination[0]] === 'X') {
                    document.querySelector(`[index='${winningCombination[0]}']`).className += " win";
                    document.querySelector(`[index='${winningCombination[1]}']`).className += " win";
                    document.querySelector(`[index='${winningCombination[2]}']`).className += " win";
                    winner = user
                } else {
                    document.querySelector(`[index='${winningCombination[0]}']`).className += " lose";
                    document.querySelector(`[index='${winningCombination[1]}']`).className += " lose";
                    document.querySelector(`[index='${winningCombination[2]}']`).className += " lose";
                    winner = program
                }
            }
        }
    });

    return winner;
};

