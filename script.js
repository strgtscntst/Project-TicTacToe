// Gameboard

let ticTacToe = (function(){
    let whoseTurn = "X"
    let gameBoard 
    let isGameRunning 

    // Cache Dom
    const DOC = document;
    const cellList = Array.from(DOC.querySelectorAll('.cell'))
    const resetButton = DOC.getElementById("reset")
    const playerPanels = Array.from(DOC.querySelectorAll(".playerPanel"))

    // Bind Events
    cellList.map(node => {
        node.addEventListener("click", () => {
            const x = node.getAttribute("data-x");
            const y = node.getAttribute("data-y");
            _runTurn(x, y);
        })
    })
    resetButton.addEventListener("click", () => {
        _setGameBoard();
        _render();
    })
    playerPanels.map((panel)=> {
        // TODO apply click listener to h2 & submit button that calls a function to swap display:none between the h2 and the playerNameInput(and submit button)

        
        let playerIcon = panel.getAttribute("data-player"); // assume that is pulled from panel data-player

        this.querySelector("h2").addEventListener("click", _nameDisplaySwap.bind(panel, playerIcon))
        
        this.querySelector("button").addEventListener("click", _nameDisplaySwap.bind(panel, playerIcon))
        
        // TODO within the callback, return the name value for use in createPlayers()
        // look into Event.target?
    })

    function _nameDisplaySwap(playerIcon){
        // this === panel
        // h2 -> display = display == block ? none : block
        // nameInput -> display = display == block ? none : block;
        // h2.textContent = input.textContent
    }

    function _runTurn(x, y){
        if (gameBoard[y][x] !== ""){
            console.log("Position occupied")
            return
        } else if(!isGameRunning){
            return  // prevents board placement & modification of winner
        } else {
            gameBoard[y][x] = whoseTurn

        }
        _checkForWin()
        _render()
    }
    
    function _render(){
        // populate table
        cellList.map(cell => {
            const x = Number(cell.getAttribute("data-x"))
            const y = Number(cell.getAttribute("data-y"))
            cell.textContent = gameBoard[y][x];
        })

        console.table(gameBoard)
        // TODO display victory message
        if(!isGameRunning){
            // display victory modal
        }
    }
    
    function createPlayers(){
        // try deconstructing a nodelist of all inputs for assignment?
        // TODO obtain playerNames from their respective h2 elements
        let player1Name = ""
        let player2Name = ""

        
        // return an object containing two "player" objects

        return {
            X: player1Name,
            O: player2Name
        }
    }
    
    function _setGameBoard(){
        whoseTurn = "X";
        isGameRunning = true
        gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }
    
    function _swapTurn(){
        
        whoseTurn = whoseTurn==="O" ? "X" : "O"
        console.log("whoseTurn = " + whoseTurn)
    }
    
    function _checkForWin(){
        let winArrays = [
            [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
            [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
            [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],
            [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
            [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
            [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],
            [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
            [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
        ]
        
        // prevent modification of whoseTurn if game has been won.
        if(isGameRunning){
        
            // check for win or tie
            if(winArrays.some(arr => arr.every(checkItem => checkItem === "X") || arr.every(checkItem => checkItem === "O"))){
                // _render()
                
                // TODO Notify the players of winstate
                console.log(`${whoseTurn} wins!`)
                isGameRunning = false
            } else if(gameBoard.every(row => row.every(space => space != ""))) {  // check tie
                // _render()
                console.log("Tie game")
                isGameRunning = false

            } else {
                _swapTurn()
            }
        }
    }
    
    
    // Run the game
    const playerSet = createPlayers()
    _setGameBoard()
    _render()
    
    
    //Debugging functions
    function checkBoard(){
        console.table(gameBoard)
    }
    function checkTieGame(){
        gameBoard = [
            ["X","O","X"],
            ["X","O","X"],
            ["O","X","O"],
        ]
        _render()
        _checkForWin()
        _swapTurn()
    }
    function checkWinGame(){
        gameBoard = [
            ["X","O","X"],
            ["X","O","X"],
            ["X","",""],
        ]
        _render()

        _checkForWin()
        _swapTurn()

    }
    // end debugging



    return {
        whoseTurn,
        checkBoard,
        _runTurn,
        checkWinGame,
        checkTieGame,
        _checkForWin,
        // playerSet,
        playerPanels,
        isGameRunning
    }
})()