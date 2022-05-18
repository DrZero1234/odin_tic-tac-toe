const gameboard =  (() => {

    board = ["","","","","","","","","",]

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
            div_elem.textContent = board[i]
            GAMEBOARD_DIV.appendChild(div_elem);
        }
    }

    return {generateBoard}

})();

const GameLogic = (() => {
    displayController.generateBoard();
})()