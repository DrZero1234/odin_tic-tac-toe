document.addEventListener("DOMContentLoaded", function () {
    var TITLE_SCREEN = document.getElementById("title-screen");
    var GAMEBOARD_DIV = document.getElementById("gameboard");
    var GAMEBOARD_CELLS = GAMEBOARD_DIV.childNodes;
    var MARK_SELECT = document.querySelector(".mark-select");
    var MARK_BTNS = MARK_SELECT && MARK_SELECT.querySelectorAll("button");
    var RESTART_BTN = document.getElementById("restart");
    var RESULT_TEXT = document.getElementById("result");
    var WIN_CONDITIONS = [
        // Row winning
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ];
    var player1;
    var player2;
    var gameStatus;
    var b = {
        board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    };
    var generateBoard = function () {
        if (GAMEBOARD_DIV) {
            GAMEBOARD_DIV.innerHTML = "";
            var _loop_1 = function (i) {
                var div_elem = document.createElement("div");
                div_elem.className = "cell";
                div_elem.setAttribute("data-index", i.toString());
                div_elem.textContent = getBoard(b)[i];
                div_elem.addEventListener("click", function () { return place_mark(div_elem); });
                GAMEBOARD_DIV.appendChild(div_elem);
            };
            for (var i = 0; i < 9; i++) {
                _loop_1(i);
            }
        }
    };
    function getBoard(boardVar) {
        return boardVar.board;
    }
    function restartGame() {
        player1.moves = [];
        player2.moves = [];
        resetBoard(b);
        generateBoard();
        gameStatus = {
            turn: player1,
            isOver: false,
        };
        if (RESULT_TEXT)
            RESULT_TEXT.textContent = "";
    }
    function resetBoard(boardVar) {
        boardVar.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        generateBoard();
        return boardVar.board;
    }
    function createPlayer(mark) {
        if (!mark) {
            console.error("There was an error while creating a player");
            throw new Error();
        }
        else if (mark === "X") {
            player1 = { name: "Player1", mark: "X", moves: [] };
            player2 = { name: "Player2", mark: "O", moves: [] };
        }
        else if (mark === "O") {
            player1 = { name: "Player1", mark: "O", moves: [] };
            player2 = { name: "Player2", mark: "X", moves: [] };
        }
        console.log(player1);
        console.log(player2);
        gameStatus = {
            turn: player1,
            isOver: false,
        };
        generateBoard();
        toggleDisplay();
        return;
    }
    var toggleDisplay = function () {
        if (TITLE_SCREEN) {
            TITLE_SCREEN.className = "disabled";
        }
        if (GAMEBOARD_DIV) {
            GAMEBOARD_DIV.className = "";
        }
    };
    var check_winner = function () {
        console.log(GAMEBOARD_DIV === null || GAMEBOARD_DIV === void 0 ? void 0 : GAMEBOARD_DIV.childNodes);
        WIN_CONDITIONS.forEach(function (winCondition) {
            var p1Wins = winCondition.every(function (a) { return player1.moves.includes(a); });
            var p2Wins = winCondition.every(function (a) { return player2.moves.includes(a); });
            console.log(GAMEBOARD_DIV === null || GAMEBOARD_DIV === void 0 ? void 0 : GAMEBOARD_DIV.innerHTML);
            if (p1Wins) {
                RESULT_TEXT.textContent = "Player 1 won!";
                GAMEBOARD_CELLS &&
                    GAMEBOARD_CELLS.forEach(function (cell) {
                        cell.style.pointerEvents = "none";
                    });
            }
            else if (p2Wins) {
                RESULT_TEXT.textContent = "Player 2 won!";
                GAMEBOARD_CELLS &&
                    GAMEBOARD_CELLS.forEach(function (cell) {
                        cell.style.pointerEvents = "none";
                    });
            }
            // Checks if gameboard is full
            else if (!getBoard(b).includes(" ") &&
                p1Wins === false &&
                p2Wins === false) {
                RESULT_TEXT.textContent = "The game is a draw";
                if (GAMEBOARD_CELLS) {
                    GAMEBOARD_CELLS.forEach(function (cell) {
                        cell.style.pointerEvents = "none";
                    });
                }
            }
        });
    };
    function place_mark(cell) {
        // PLACING MARK ON THE BOARD
        if (cell.dataset.index) {
            if (player1.moves.includes(+cell.dataset.index) ||
                player2.moves.includes(+cell.dataset.index)) {
                alert("Cant place mark there");
                return false;
            }
            else {
                for (var _i = 0, _a = [player1, player2]; _i < _a.length; _i++) {
                    var player = _a[_i];
                    if (player === gameStatus.turn) {
                        cell.textContent = player.mark;
                        getBoard(b)[+cell.dataset.index] = player.mark;
                        // ADDS INDEX TO THE PLAYER´S MOVES ARRAY
                        player.moves.push(+cell.dataset.index);
                    }
                }
            }
            // check_winner
            check_winner();
            // SWITCH TURN
            gameStatus.turn === player1
                ? (gameStatus.turn = player2)
                : gameStatus.turn === player2
                    ? (gameStatus.turn = player1)
                    : null;
        }
    }
    console.log(getBoard(b));
    MARK_BTNS === null || MARK_BTNS === void 0 ? void 0 : MARK_BTNS.forEach(function (btn) {
        return btn.addEventListener("click", function () { return createPlayer(btn.id); });
    });
    RESTART_BTN === null || RESTART_BTN === void 0 ? void 0 : RESTART_BTN.addEventListener("click", restartGame);
});
