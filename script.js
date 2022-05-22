const gameboard =  (() => {

    let board = [" ", " ", " ", " ", " "," ", " ", " ", " "]

    const getBoard = () => {
        return board;
    };

    const resetBoard = () => {
        board = [" ", " ", " ", " ", " "," ", " ", " ", " "]
        displayController.generateBoard();

    }

    const placeMark = (cell, players, turn) => {
        
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

        return {player1, player2}
    }

    const toggleDisplay =  (hide, appear) => {
        for (item of hide) {
            item.className = "disabled"
        }
        for (app of appear) {
            app.className = ""
        }
    }

    return {generateBoard, createPlayer, toggleDisplay, GAMEBOARD_DIV}

})();

const GameLogic = (() => {
    displayController.generateBoard();
    const WIN_CONDITIONS = [

        // Row winning
        [0,1,2],
        [3,4,5],
        [6,7,8],

        // Columns
        [0,3,6],
        [1,4,7],
        [2,5,8],

        // Diagonal
        [0,4,8],
        [2,4,6],
  

    ]

    let turn = "X";
    let player1;
    let player2;


    const TITLE_SCREEN = document.getElementById("title-screen");
    const GAMEBOARD_DIV = document.getElementById("gameboard");
    const GAMEBOARD_CELLS = GAMEBOARD_DIV.querySelectorAll("div");
    const MARK_BTNS = document.querySelector(".mark-select").querySelectorAll("button")
    const RESTART_BTN = document.getElementById("restart");

    function place_mark(cell_array) {
        cell_array.forEach((cell) => {
            cell.addEventListener("click", () => {

                // PLACING MARK ON THE BOARD
                if (player1.moves.includes(+cell.dataset.index) || player2.moves.includes(+cell.dataset.index)) {
                    alert("Cant place mark there");
                    return false;
                } else {
                    for (player of [player1, player2]) {
                        if (player.mark === turn) {
                            cell.textContent = player.mark;
                            gameboard.getBoard()[cell.dataset.index] = player.mark;
                            // ADDS INDEX TO THE PLAYER´S MOVES ARRAY
                            player.moves.push(+cell.dataset.index)
                        }
                    }
                }
            // check_winner
            check_winner()
            // SWITCH TURN
            if (turn === "X") {
                turn = "O"
            } else {
                turn = "X"
            }
            })
        })
    }
    

    MARK_BTNS.forEach((button) => {
        button.addEventListener ("click",() => {
            players = displayController.createPlayer(button);
            player1 = players.player1;
            player2 = players.player2
            console.log(players)
            displayController.toggleDisplay([TITLE_SCREEN], [GAMEBOARD_DIV])
            place_mark(GAMEBOARD_CELLS)
        }) 
    })



    RESTART_BTN.addEventListener("click", () => {
        gameboard.resetBoard()
        const GAMEBOARD_CELLS = GAMEBOARD_DIV.querySelectorAll("div");
        place_mark(GAMEBOARD_CELLS)
        player1.moves = [];
        player2.moves = [];
        turn = player1.mark
    });

    const check_winner = () => {
        WIN_CONDITIONS.forEach(winCondition => {
            const p1Wins = winCondition.every(a => player1.moves.includes(a))
            const p2Wins = winCondition.every(a => player2.moves.includes(a))

            if (p1Wins || p2Wins) {
                alert("Player won")
                GAMEBOARD_CELLS.forEach((cell) => {
                    cell.style.pointerEvents = "none"
                    return
                })
            }


            // Checks if gameboard is full
            else if (!gameboard.getBoard().includes(" ") && p1Wins ===false && p2Wins === false) {
                alert("The array is full. Its a draw")
            }

            console.log(`Player 1 winning status: ${p1Wins}`);
            console.log(`Player 2 winning status: ${p2Wins}`);
        })

        

    }


    




})()