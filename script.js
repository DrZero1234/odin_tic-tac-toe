const GAMEBOARD_DIV = document.getElementById("gameboard");

const gameboard = (() => {
  board = [];
  const getBoard = () => {
    return board;
  };

  return { getBoard };
})();

const Player = (name, mark) => {
  return { name, mark };
};

const generate_board = (() => {
  board = gameboard.getBoard();
  for (let i = 0; i < 9; i++) {
    const div_elem = document.createElement("div");
    div_elem.className = "cell";
    div_elem.setAttribute("data-index", i);
    GAMEBOARD_DIV.appendChild(div_elem);
    board.push("");
  }
})();

const displayController = () => {
  const createPlayer = (mark) => {
    if (mark.toLowerCase() === "X".toLowerCase()) {
      player1 = Player("Player1", "X");
      player2 = Player("Player2", "O");
    } else if (mark.toLowerCase() === "O".toLowerCase()) {
      player1 = Player("Player1", "O");
      player2 = Player("Player2", "X");
    }
    return { player1, player2 };
  };

  const toggleClass = (hide, appear) => {
    hide.className = "disabled";
    appear.className = "";
  };

  return { createPlayer };
};

const playGame = (() => {
  const MARK_BTNS = document
    .querySelector(".mark-select")
    .querySelectorAll("button");
  MARK_BTNS.forEach((button) => {
    button.onclick = displayController.createPlayer(button.textContent);
  });
})();
