// Gameboard

const ticTacToe = (function(){
    let whoseTurn = "X"
    let gameBoard 
    let isGameRunning 
    let playerSet

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
        // apply click listener to h2 & submit button that calls a function to swap display:none between the h2 and the editArea div

        panel.querySelector("h2").addEventListener("click", function(e){
            _nameDisplaySwap.bind(panel, e)()
        })
        
        panel.querySelector("button").addEventListener("click", function(e){
            _nameDisplaySwap.bind(panel, e)()
        })

        panel.querySelector(".editArea input").addEventListener("keydown", function(e){
            if (e.key === "Enter"){
                _nameDisplaySwap.bind(panel, e)()
            }
        })
        // TODO within the callback, return the name value for use in createPlayers()
        // look into Event.target?
    })

    function _nameDisplaySwap(e){
        // this === panel
        const h2 = this.querySelector("h2")
        const editArea = this.querySelector(".editArea")
        const input = this.querySelector("input")

        const isEditing = h2.style.display === "none"

        // h2 -> display = display == block ? none : block
        h2.style.display = isEditing ? "block" : "none"

        // nameInput -> display = display == block ? none : block;
        editArea.style.display = isEditing ? "none" : "block"
    
        // h2.textContent = input.textContent
        setTimeout(() => input.focus(), 0)
        h2.textContent = input.value.trim()
        playerSet = createPlayers()

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
        const panels = document.querySelectorAll(".playerPanel");
        
        
        let players = {}
        
        panels.forEach( panel =>{
            const playerKey = panel.getAttribute("data-player")
            const name = panel.querySelector('h2').textContent
            players[playerKey] = name || 'Player ${playerKey)'
        })


        
        // return an object containing two "player" objects
        console.log(players)
        return players
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
                _endOfGame()
                
                console.log(`${whoseTurn} wins!`)
                isGameRunning = false
            } else if(gameBoard.every(row => row.every(space => space != ""))) {  // check tie
                // _render()
                _endOfGame()
                console.log("Tie game")
                isGameRunning = false

            } else {
                _swapTurn()
            }
        }
    }
    function _endOfGame(){
        // Take whoseTurn, check it against playerSet, to get winner name
        console.log("testLog")
        // Enable the Dialogue box
            // Fill in the appropriate username, or Player1/Player2
    }
    
    // Run the game
    playerSet = createPlayers()
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
        isGameRunning,
        playerSet
    }
})()