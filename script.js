const gameboard =  (() => {

    let board = ["","","","","","","","","",]

    const getBoard = () => {
        return board;
    };


    return {getBoard}
})();

const Player = (name,mark) => {
    return {name, mark}
}

const displayController = (() => {
    const GAMEBOARD_DIV = document.getElementById("gameboard");

    const generateBoard = () => {

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

    return {generateBoard, createPlayer}

})();

const GameLogic = (() => {
    let player1;
    let player2;

    const MARK_BTNS = document.querySelector(".mark-select").querySelectorAll("button")
    displayController.generateBoard();
    MARK_BTNS.forEach((button) => {
        button.addEventListener ("click",() => {
            displayController.createPlayer(button);
        }) 
    })

})()