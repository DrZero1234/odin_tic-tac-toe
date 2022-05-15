const gameBoard = (() => {
    board = [];
    const getBoard = () => {
        return board;
    }



    return {getBoard}
})()

const displayController = (() => {
    

    const _generate_gameboard = () => {
        let index = 0;
        const GAMEBOARD_DIV = document.querySelector(".gameboard")
        for (let i = 0; i < 3;i++){
            row_div = document.createElement("div");
            row_div.className="row"
            if (i < 2) {
                row_div.style.cssText += "border-right: 5px solid black;"
            }

            GAMEBOARD_DIV.appendChild(row_div)
            for (let k = 0; k < 3; k++) {

                const cell_div = document.createElement("div");
                cell_div.className = "cell"
                //cell_div.textContent = "X"
                cell_div.setAttribute("data-index", index);
                row_div.appendChild(cell_div)
                index++;
                gameBoard.getBoard().push(" ")

            }
        }
    }
    _generate_gameboard()


    /*
        SET UP GAMEBOARD CONTET
        A function which will store the gamebaord in an array
        and generate it to the website filling it with "X" or "O"-s 
    */

    /*
        PLAYER MARKS
        A function which will be created to handle the logic of players playing their move
        on the field
    */

    /* POST GAME
        A function which will handle the end of the game which should include 
        + Cleaning up the interface
        + Congratulating the winner or the notify if the round was draw
        + Button to restart the game
    */
})()

const Player = (name,mark) => {
    return {name, mark}
}

const playGame = (() => {
    gboard = gameBoard.getBoard()
    const cell_fields = document.querySelectorAll(".cell");
    player1 = Player("Mark", "X");
    player2 = Player("Joe", "O");

    const placeMark = (player, index) => {
        for (cell of cell_fields) {
            cell.addEventListener("click", () => {
                gboard[cell.dataset.index] = player.mark;
                cell_fields[cell.dataset.index].textContent = player.mark;
            })
        }
    }

    return {placeMark}
   
    /*
     GAME LOGIC
     A function which will check if 3 of the same marks match up
     vertically, horizontally or across
    */

})()

