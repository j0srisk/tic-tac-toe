const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]
    const getBoard = () => board;
    const setBoard = (index, marker) => board[index] = marker;
    return ({ getBoard, setBoard });
})();

const displayController = (() => {
    const render = () => {
        const board = gameBoard.getBoard();
        const gridSections = document.querySelectorAll('.grid-section');
        gridSections.forEach((gridSections, index) => {
            gridSections.textContent = board[index];
        });
        gridSections.forEach(element => element.addEventListener('click', () => gameFlow.userTurn(element), true));
    };

    const renderWinner = () => {
        gameFlow.getWinningCombo().forEach(element => document.querySelector(`[index='${element}']`).className += " win");
    };

    const renderLoser = () => {
        gameFlow.getWinningCombo().forEach(element => document.querySelector(`[index='${element}']`).className += " lose");
    };

    return ({ render, renderWinner, renderLoser });
})();

const gameFlow = (() => {

    const playerFactory = (name, marker) => {
        return { name, marker };
    };

    const user = playerFactory('User', 'X');
    const program = playerFactory('Program', 'O');

    let currentPlayer = user;
    let winner = null;
    let winningCombo = null;

    const startGame = () => {
        displayController.render();
    };

    const userTurn = (element) => {
        if (currentPlayer === user && element.innerHTML === "") {
            gameBoard.setBoard(element.getAttribute('index'), user.marker);
            displayController.render();
            currentPlayer = program;
            checkWinner();
            if (winner === null) {
                programTurn();
            }
        }
    };

    const programTurn = () => { 
        let randomNumber = Math.floor(Math.random() * 10);
        while (gameBoard.getBoard()[randomNumber] != ""){
            randomNumber = Math.floor(Math.random() * 10)
        };
        gameBoard.setBoard(randomNumber, program.marker);
        displayController.render();
        checkWinner();
        if (winner === null){
            currentPlayer = user;
        };
    };

    const winningCombinations = [[0,3,6], [1,4,7], [2,5,8], [0,1,2], [3,4,5], [6,7,8], [0,4,8], [2,4,6]];

    const checkWinner = () => {
        if (gameBoard.getBoard().includes("") === false) {
            winner = "Tie";
        };
    
        winningCombinations.forEach(winningCombination => {
            if (gameBoard.getBoard()[winningCombination[0]] != "") {
                if (gameBoard.getBoard()[winningCombination[0]] === gameBoard.getBoard()[winningCombination[1]] && gameBoard.getBoard()[winningCombination[1]] === gameBoard.getBoard()[winningCombination[2]]){
                    winningCombo = winningCombination;
                    if (gameBoard.getBoard()[winningCombination[0]] === 'X') {
                        winner = user;
                        displayController.renderWinner();
                    } else {
                        winner = program;
                        displayController.renderLoser();
                    }
                }
            }
        });
    };

    const getWinningCombo = () => winningCombo;

    return ({ startGame , userTurn, getWinningCombo });
})();

gameFlow.startGame();