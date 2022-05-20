const gameboard =  (() => {

    let board = [" X ", " ", " ", "O", " "," ", " ", " ", " "]

    const getBoard = () => {
        return board;
    };

    const resetBoard = () => {
        board = [" ", " ", " ", " ", " "," ", " ", " ", " "]
        displayController.generateBoard();
    }

    const placeMark = (players, index, turn) =>  {
        if (board[index] != " ") {
            alert("Cant place mark there")
            return false
        } else {
            for (player in players) {
            }
        }


    return {getBoard, resetBoard, placeMark}
})();

const Player = (name,mark) => {
    const moves = []
    return {name, mark, moves}
}

const displayController = (() => {
    const GAMEBOARD_DIV = document.getElementById("gameboard");

    const generateBoard = () => {
        GAMEBOARD_DIV.innerHTML = ""
        for (let i = 0; i < 9;i++) {
            div_elem = document.createElement("div");
            div_elem.className = "cell";
            div_elem.setAttribute("data-index", i);
            div_elem.textContent = gameboard.getBoard()[i]
            GAMEBOARD_DIV.appendChild(div_elem);
        }
    }

    const createPlayer = (button) => {
        player1 = Player("Player1", button.id);
        if (player1.mark === "X") {
            player2 = Player("Player2", "O")
        } else if (player1.mark === "O") {
            player2 = Player("Player2", "X")
        } else {
            alert("Invalid button id")
            return false;
        }
    }

    const toggleDisplay =  (hide, appear) => {
        hide.className = "disabled";
        appear.className = "";
    }

    return {generateBoard, createPlayer, toggleDisplay, GAMEBOARD_DIV}

})();

const GameLogic = (() => {
    const WIN_CONDITIONS = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],

    ]

    let player1;
    let player2;



    const TITLE_SCREEN = document.getElementById("title-screen");
    const GAMEBOARD_DIV = document.getElementById("gameboard");
    const MARK_BTNS = document.querySelector(".mark-select").querySelectorAll("button")


    displayController.generateBoard();
    MARK_BTNS.forEach((button) => {
        button.addEventListener ("click",() => {
            displayController.createPlayer(button);
            displayController.toggleDisplay(TITLE_SCREEN, GAMEBOARD_DIV)
        }) 
    })


})()