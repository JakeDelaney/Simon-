let game = {
    score: 0,
    turnNumber: 0,
    turnInProgress: false,
    lastButton: "",
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame(){
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore()
    addTurn()
};

function showScore(){
    document.getElementById("score").innerText = game.score
}

function addTurn(){
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns()
};

function lightsOn(circ){
    document.getElementById(circ).classList.add("light");
    setTimeout(() => { //setTimeout function and .remove() method to remove the "light" class after 4 seconds
        document.getElementById(circ).classList.remove("light")
    }, 400);
}

function showTurns(){
    game.turnInProgress = true
    game.turnNumber = 0;
    let turns = setInterval( () => { //setInterval ensures pause between next steps in the sequence
        lightsOn(game.currentGame[game.turnNumber])
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
            game.turnInProgress = false
        }
    }, 800);
}

function playerTurn(){
    let i = game.playerMoves.length -1;
    if (game.currentGame[i] === game.playerMoves[i]){
        if (game.currentGame.length === game.playerMoves.length){
            game.score++
            showScore()
            addTurn()
        }
    } else{
        alert("wrong move!")
    }
}

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn};