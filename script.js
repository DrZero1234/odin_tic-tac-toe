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
        const TITLE_SCREEN_DIV = document.getElementById("mark-select")
        const GAMEBOARD_DIV = document.getElementById("gameboard")
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

    const toggleClass = (hide, appear) => {
        hide.className = "disabled";
        appear.className = "";
    }
    _generate_gameboard()

    return {toggleClass}




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
    const TITLE_SCREEN_DIV = document.getElementById("title-screen")
    const GAMEBOARD_DIV = document.getElementById("gameboard")
    const MARK_BTNS = document.querySelector("#title-screen").querySelectorAll("button");

    const createPlayer =  (mark) => {
        if (mark === "X") {
            player1 = Player("Player1", "X");
            player2 = Player("Player2", "O");
        } else {
            player1 = Player("Player1", "O");
            player2 = Player("Player2", "X");
        }
        displayController.toggleClass(TITLE_SCREEN_DIV,GAMEBOARD_DIV)
        return {player1, player2};
    }

    MARK_BTNS.forEach((button) => {
        button.addEventListener("click", createPlayer(button.innerHTML))
    })

    return {createPlayer}

   
    /*
     GAME LOGIC
     A function which will check if 3 of the same marks match up
     vertically, horizontally or across
    */

})()

