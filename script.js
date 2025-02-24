// Gameboard

let ticTacToe = (function(){
    let whoseTurn = "X"
    let gameBoard 

    // Cache Dom
    const el = document;

    // Bind Events

    
    // Run the game
    const playerSet = createPlayers()
    freshBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    gameBoard = freshBoard
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

    function _swapTurn(){
        
        whoseTurn = whoseTurn==="X" ? "O" : "X"
        console.log("whoseTurn = " + whoseTurn)
        _render()
    }

    function _checkForWin(){
        // check for win or tie
        if(false

        ){
        alert(`${whoseTurn} wins!`)
        gameBoard = freshBoard
        }

    }



    return {
        gameBoard,
        _runTurn
    }
})()