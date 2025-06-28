document.addEventListener("DOMContentLoaded", () => {
  const TITLE_SCREEN = document.getElementById("title-screen");
  const GAMEBOARD_DIV = document.getElementById("gameboard");
  const GAMEBOARD_CELLS = GAMEBOARD_DIV!.childNodes as NodeListOf<HTMLElement>;
  const MARK_SELECT = document.querySelector(".mark-select");
  const MARK_BTNS = MARK_SELECT && MARK_SELECT.querySelectorAll("button");
  const RESTART_BTN = document.getElementById("restart");
  const RESULT_TEXT = document.getElementById("result");

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

  type Mark = "O" | "X";

  let player1: Player;
  let player2: Player;
  let gameStatus: GameStatus;
  let b: Gameboard = {
    board: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  };

  interface GameStatus {
    turn: Player;
    isOver: boolean;
  }

  interface Player {
    name: string;
    moves: Array<Number>;
    mark: Mark;
  }

  interface Gameboard {
    board: Array<Mark | " ">;
  }

  const generateBoard = () => {
    if (GAMEBOARD_DIV) {
      GAMEBOARD_DIV.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        let div_elem = document.createElement("div");
        div_elem.className = "cell";
        div_elem.setAttribute("data-index", i.toString());
        div_elem.textContent = getBoard(b)[i];
        div_elem.addEventListener("click", () => place_mark(div_elem));
        GAMEBOARD_DIV.appendChild(div_elem);
      }
    }
  };

  function getBoard(boardVar: Gameboard) {
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
    if (RESULT_TEXT) RESULT_TEXT.textContent = "";
  }

  function resetBoard(boardVar: Gameboard) {
    boardVar.board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    generateBoard();
    return boardVar.board;
  }

  function createPlayer(mark: string) {
    if (!mark) {
      console.error(`There was an error while creating a player`);
      throw new Error();
    } else if (mark === "X") {
      player1 = { name: "Player1", mark: "X", moves: [] };
      player2 = { name: "Player2", mark: "O", moves: [] };
    } else if (mark === "O") {
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

  const toggleDisplay = () => {
    if (TITLE_SCREEN) {
      TITLE_SCREEN.className = "disabled";
    }
    if (GAMEBOARD_DIV) {
      GAMEBOARD_DIV.className = "";
    }
  };

  const check_winner = () => {
    console.log(GAMEBOARD_DIV?.childNodes);
    WIN_CONDITIONS.forEach((winCondition) => {
      const p1Wins = winCondition.every((a) => player1.moves.includes(a));
      const p2Wins = winCondition.every((a) => player2.moves.includes(a));
      console.log(GAMEBOARD_DIV?.innerHTML);

      if (p1Wins) {
        RESULT_TEXT!.textContent = `Player 1 won!`;
        GAMEBOARD_CELLS &&
          GAMEBOARD_CELLS.forEach((cell) => {
            cell.style.pointerEvents = "none";
          });
      } else if (p2Wins) {
        RESULT_TEXT!.textContent = `Player 2 won!`;
        GAMEBOARD_CELLS &&
          GAMEBOARD_CELLS.forEach((cell) => {
            cell.style.pointerEvents = "none";
          });
      }

      // Checks if gameboard is full
      else if (
        !getBoard(b).includes(" ") &&
        p1Wins === false &&
        p2Wins === false
      ) {
        RESULT_TEXT!.textContent = `The game is a draw`;
        if (GAMEBOARD_CELLS) {
          GAMEBOARD_CELLS.forEach((cell) => {
            cell.style.pointerEvents = "none";
          });
        }
      }
    });
  };

  function place_mark(cell: HTMLDivElement) {
    // PLACING MARK ON THE BOARD
    if (cell.dataset.index) {
      if (
        player1.moves.includes(+cell.dataset.index) ||
        player2.moves.includes(+cell.dataset.index)
      ) {
        alert("Cant place mark there");
        return false;
      } else {
        for (let player of [player1, player2]) {
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

  MARK_BTNS?.forEach((btn) =>
    btn.addEventListener("click", () => createPlayer(btn.id))
  );

  RESTART_BTN?.addEventListener("click", restartGame);
});
