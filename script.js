// Gameboard

let ticTacToe = (function(){
    let whoseTurn = "X"
    let gameBoard 

    // Cache Dom
    const DOC = document;
    const cellList = Array.from(DOC.querySelectorAll('.cell'))

    // Bind Events
    cellList.map(node => {
        node.addEventListener("click", () => {
            const x = node.getAttribute("data-x");
            const y = node.getAttribute("data-y");
            _runTurn(node, x, y);
        })
    })
    
    
    function _runTurn(node, x, y){
        if (gameBoard[y][x] !== ""){
            console.log("Position occupied")
            return
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
    }
    
    function createPlayers(){
        // try deconstructing a nodelist of all inputs for assignment?
        
        // return an object containing two "player" objects
    }
    
    function _setGameBoard(){
        whoseTurn = "X";
        gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
        // _render()
    }
    
    function _swapTurn(){
        
        whoseTurn = whoseTurn==="X" ? "O" : "X"
        console.log("whoseTurn = " + whoseTurn)
        // _render()
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
        
        if(arrsToCheck.some(arr => arr.every(checkItem => checkItem === "X") || arr.every(checkItem => checkItem === "O"))){
            _render()
            
            // Notify the players
            console.log(`${whoseTurn} wins!`)
            
            // Wipe the gameBoard
            _setGameBoard()
        } else if(gameBoard.every(row => row.every(space => space != ""))) {  // check tie
            _render()
            console.log("Tie game")
            _setGameBoard()  
        } else {
            _swapTurn()
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
        checkBoard,
        _runTurn,
        checkWinGame,
        checkTieGame,
        _checkForWin
    }
})()