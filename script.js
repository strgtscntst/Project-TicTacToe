// Gameboard

let ticTacToe = (function(){
    let whoseTurn = "X"
    let gameBoard 
    // Cache Dom
    const el = document;

    // Bind Events

    
    // Run the game
    const playerSet = createPlayers()

    _setGameBoard()
    _render()



    // _runTurn() should be the callback for eventListeners placing marks
    function _runTurn(x, y){
        if (gameBoard[x][y] !== ""){
            console.log("Position occupied")
            return
        } else {
            gameBoard[x][y] = whoseTurn
        }
        _checkForWin()
        _swapTurn()
    }

    function _render(){
        console.table(gameBoard)


    }

    function createPlayers(){
        // try deconstructing a nodelist of all inputs for assignment?

        // return an object containing two "player" objects
    }

    function _setGameBoard(){
        return gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }

    function _swapTurn(){
        
        whoseTurn = whoseTurn==="X" ? "O" : "X"
        console.log("whoseTurn = " + whoseTurn)
        _render()
    }

    function _checkForWin(){
        let arrsToCheck = [
            [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
            [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
            [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],
            [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
            [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
            [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],
            [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
            [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]]
        ]

        // check for win or tie


        if(arrsToCheck.some(arr => arr.every(checkItem => checkItem === "X") || arr.every(checkItem => checkItem === "O"))){      // CHECK THIS NEXT

            // Notify the players
            alert(`${whoseTurn} wins!`)

            // Wipe the gameBoard
            _setGameBoard()
            return true
        } else if(gameBoard.every(row => row.every(space => space != ""))) {  // check tie
            alert ("Tie game")
            _setGameBoard()  
            return true        
        } else {
            return false
        }
    }




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
        checkBoard,
        _runTurn,
        checkWinGame,
        checkTieGame,
        _checkForWin
    }
})()