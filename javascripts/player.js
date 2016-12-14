class Player{
  constructor(type, name){
    this.type = type;
    this.name = name;
    this.score = 0;
    this.matchedPairs = [];
    this.memory = {};
  }

  takeTurn(game){
    if(this.type == "Computer"){
      this.freezeOverlay();
      let pair = this.searchForPairsInMemory();
      if(pair === undefined){
        pair = this.randomValidPair(game);
      }
      window.timeout1 = setTimeout(() => { game.flipLoc(pair[0]) }, 1000);
      window.timeout2 = setTimeout(() => { game.flipLoc(pair[1]) }, 2000);
    }
  }

  finishTurn(game){
    if(this.type == "Computer"){
      this.vanishOverlay();
    }
  }

  remember(val, loc){
    if(this.memory[val] && this.memory[val].includes(loc) === false){
      this.memory[val] = this.memory[val].concat([loc]);
    } else {
      this.memory[val] = [loc];
    }
  }

  forget(val, loc){
    let idx = this.memory[val].indexOf(loc);
    this.memory[val].splice(idx, 1);
  }

  freezeOverlay(){
    let overlay = document.getElementById("overlay");
    overlay.className = "visible";
  }

  vanishOverlay(){
    let overlay = document.getElementById("overlay");
    overlay.className = "invisible";
  }

  searchForPairsInMemory(){
    let vals = Object.keys(this.memory);
    for(let i = 0; i < vals.length; i++){
      if(this.memory[vals[i]].length > 1){
        let pair = [this.memory[vals[i]][0], this.memory[vals[i]][1]];
        this.memory[vals[i]].splice(0, 2);
        return pair;
      }
    }
    return undefined;
  }

  randomValidPair(game){
    let validMoves = game.board.validMoves();
    let idx = Math.floor(Math.random() * validMoves.length);
    let move1 = validMoves.splice(idx, 1)[0];
    let move2 = validMoves[Math.floor(Math.random() * validMoves.length)];
    return [move1, move2];
  }

}

export default Player;
