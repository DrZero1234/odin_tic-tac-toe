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
/*
const gameboard = (() => {
  let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  const getBoard = () => {
    return board;
  };

  const resetBoard = () => {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    displayController.generateBoard();
  };

  const placeMark = (cell, players, turn) => {};

  return { getBoard, resetBoard, placeMark };
})();

const Player = (name, mark) => {
  const moves = [];
  return { name, mark, moves };
};

const displayController = (() => {
  const GAMEBOARD_DIV = document.getElementById("gameboard");

  const generateBoard = () => {
    GAMEBOARD_DIV.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      div_elem = document.createElement("div");
      div_elem.className = "cell";
      div_elem.setAttribute("data-index", i);
      div_elem.textContent = gameboard.getBoard()[i];
      GAMEBOARD_DIV.appendChild(div_elem);
    }
  };

  const createPlayer = (button) => {
    player1 = Player("Player1", button.id);
    if (player1.mark === "X") {
      player2 = Player("Player2", "O");
    } else if (player1.mark === "O") {
      player2 = Player("Player2", "X");
    } else {
      alert("Invalid button id");
      return false;
    }

    return { player1, player2 };
  };

  const toggleDisplay = (hide, appear) => {
    for (item of hide) {
      item.className = "disabled";
    }
    for (app of appear) {
      app.className = "";
    }
  };

  return { generateBoard, createPlayer, toggleDisplay, GAMEBOARD_DIV };
})();

const GameLogic = (() => {
  displayController.generateBoard();
  const WIN_CONDITIONS = [
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

  let turn = "X";
  let player1;
  let player2;

  const TITLE_SCREEN = document.getElementById("title-screen");
  const GAMEBOARD_DIV = document.getElementById("gameboard");
  const GAMEBOARD_CELLS =
    GAMEBOARD_DIV && GAMEBOARD_DIV.querySelectorAll("div");
  const MARK_SELECT = document.querySelector(".mark-select");
  const MARK_BTNS = MARK_SELECT && MARK_SELECT.querySelectorAll("button");
  const RESTART_BTN = document.getElementById("restart");
  const RESULT_TEXT = document.getElementById("result");

  function place_mark(cell_array) {
    cell_array.forEach((cell) => {
      cell.addEventListener("click", () => {
        // PLACING MARK ON THE BOARD
        if (
          player1.moves.includes(+cell.dataset.index) ||
          player2.moves.includes(+cell.dataset.index)
        ) {
          alert("Cant place mark there");
          return false;
        } else {
          for (player of [player1, player2]) {
            if (player.mark === turn) {
              cell.textContent = player.mark;
              gameboard.getBoard()[cell.dataset.index] = player.mark;
              // ADDS INDEX TO THE PLAYER´S MOVES ARRAY
              player.moves.push(+cell.dataset.index);
            }
          }
        }
        // check_winner
        check_winner();
        // SWITCH TURN
        if (turn === "X") {
          turn = "O";
        } else {
          turn = "X";
        }
      });
    });
  }

  MARK_BTNS.forEach((button) => {
    button.addEventListener("click", () => {
      players = displayController.createPlayer(button);
      player1 = players.player1;
      player2 = players.player2;
      displayController.toggleDisplay([TITLE_SCREEN], [GAMEBOARD_DIV]);
      place_mark(GAMEBOARD_CELLS);
    });
  });

  RESTART_BTN.addEventListener("click", () => {
    gameboard.resetBoard();
    const GAMEBOARD_CELLS = GAMEBOARD_DIV.querySelectorAll("div");
    place_mark(GAMEBOARD_CELLS);
    player1.moves = [];
    player2.moves = [];
    turn = player1.mark;
    RESULT_TEXT.textContent = "";
  });

  const check_winner = () => {
    WIN_CONDITIONS.forEach((winCondition) => {
      const p1Wins = winCondition.every((a) => player1.moves.includes(a));
      const p2Wins = winCondition.every((a) => player2.moves.includes(a));

      if (p1Wins) {
        RESULT_TEXT.textContent = `Player 1 won!`;
        GAMEBOARD_CELLS.forEach((cell) => {
          cell.style["pointer-events"] = "none";
        });
      } else if (p2Wins) {
        RESULT_TEXT.textContent = `Player 2 won!`;
        GAMEBOARD_CELLS.forEach((cell) => {
          cell.style["pointer-events"] = "none";
        });
      }

      // Checks if gameboard is full
      else if (
        !gameboard.getBoard().includes(" ") &&
        p1Wins === false &&
        p2Wins === false
      ) {
        RESULT_TEXT.textContent = `The game is a draw`;
        GAMEBOARD_CELLS.forEach((cell) => {
          cell.style["pointer-events"] = "none";
        });
      }
    });
  };
})();

*/
