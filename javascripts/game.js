import Board from './board';

class Game{
  constructor(boardView, scoreView, matchesView, p1, matchesView2, matchBox2, p2 = undefined){
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.flippedArr = [];
    this.board = new Board();
    this.boardView = boardView;
    this.scoreView = scoreView;
    this.matchesView = matchesView;
    this.matchesView2 = matchesView2;
    this.matchBox2 = matchBox2;
    this.initializeGame();
  }

  initializeGame(){
    this.scoreView.innerHTML = "Welcome to Cardflip!"
    if(this.p2){
      this.matchBox2.className = "visible";
    } else {
      this.matchBox2.className = "invisible";
    }
    this.render();
    this.renderMatches();
    while(this.won === false){
      this.currentPlayer.takeTurn(this);
    }
  }

  clickFlip(event){
    let loc = parseInt(event.currentTarget.id);
    this.flipLoc(loc);
  }

  flipLoc(loc){
    let cardToFlip = this.board.data[loc];

    cardToFlip.flip();
    this.flippedArr.push(cardToFlip);

    this.p1.remember(cardToFlip.value, loc);
    if(this.p2){
      this.p2.remember(cardToFlip.value, loc);
    }
    this.render();

    if(this.flippedArr.length == 2){
      let card1 = this.flippedArr[0];
      let card2 = this.flippedArr[1]
      if(this.match(card1, card2)){
        this.renderScore();
        this.renderMatches();
        this.render();
      } else {
        this.currentPlayer.finishTurn();
        if(this.currentPlayer.name === this.p1.name && this.p2){
          this.currentPlayer = this.p2;
        } else {
          this.currentPlayer = this.p1;
        }
        card1.unflip();
        card2.unflip();
      }
      this.flippedArr = [];
      this.currentPlayer.takeTurn(this);
    }

  }

  match(card1, card2){
    if(card1.value === card2.value){
      this.cheer();
      this.currentPlayer.score += 1;
      this.p1.forget(card1.value, this.board.locate(card1));
      this.p1.forget(card2.value, this.board.locate(card2));
      if(this.p2){
        this.p2.forget(card1.value, this.board.locate(card1));
        this.p2.forget(card2.value, this.board.locate(card2));
      }
      this.currentPlayer.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
      this.won();
      return true;
    }
    return false
  }

  render(){
    this.boardView.innerHTML = "";
    for(let i = 0; i < this.board.data.length; i++){
      let newCell = document.createElement("div");
      let item = this.board.data[i];
      if(item === undefined){
        newCell.className = "empty"
      } else {
        let val = item.value;
        let suit = item.suit;
        newCell.className = `card ${item.flipped}`
        newCell.id = `${i}`
        if(item.flipped){
          newCell.innerHTML = `${val} <br /> of <br /> ${suit}`;
        } else {
          newCell.addEventListener("click", this.clickFlip.bind(this));
        }
      }
      this.boardView.appendChild(newCell);
    }
  }

  renderScore(){
    if(this.p1 && this.p2){
      this.scoreView.innerHTML = `${this.p1.name}: ${this.p1.score}! ${this.p2.name}: ${this.p2.score}!`
    }else{
      this.scoreView.innerHTML = `Score: ${this.p1.score} Matches!`
    }
  }

  renderMatches(){
    this.renderPlayerMatches(this.p1, this.matchesView);
    if(this.p2){
      this.renderPlayerMatches(this.p2, this.matchesView2);
    }
  }

  renderPlayerMatches(player, view){
    view.innerHTML = "";
    for(let i = 0; i < player.matchedPairs.length; i++){
      let pair = player.matchedPairs[i];
      let pairDiv = document.createElement("div");
      pairDiv.className = "pair";
      for(let j = 0; j < 2; j++){
        let card = document.createElement("div");
        card.className = "card matched true";
        card.innerHTML = `${player.matchedPairs[i][j].value} <br /> of <br /> ${player.matchedPairs[i][j].suit}`;
        pairDiv.appendChild(card);
      }
      view.appendChild(pairDiv);
    }
  }

  won(){
    for(let i = 0; i < this.board.data.length; i++){
      if(this.board.data[i]){
        return false;
      }
    }
    if(this.p2){
      if(this.p1.score > this.p2.score){
        this.scoreView.innerHTML = `Game over! ${this.p1.name} wins!`;
      } else {
        this.scoreView.innerHTML = `Game over! ${this.p2.name} wins!`;
      }
    } else {
      this.scoreView.innerHTML = `Game over! You win!`;
    }
    return true;
  }

  cheer(){
    let matchcry = document.getElementById("amatch");
    matchcry.classList.add("fadeIn", "animated", "visible");
    matchcry.classList.remove("hidden");

    let transitionEvent = this.whichTransitionEvent();
    transitionEvent && matchcry.addEventListener(transitionEvent, () => {
      matchcry.classList.remove("fadeIn", "animated", "visible");
      matchcry.classList.add("hidden");
    });
  }

  whichTransitionEvent(){
    let t;
    let el = document.createElement('fakeelement');
    let transitions = {
      'animation':'animationend',
      'OAnimation':'oAnimationEnd',
      'MozAnimation':'animationend',
      'WebkitAnimation':'webkitAnimationEnd'
    }

    for(t in transitions){
      if( el.style[t] !== undefined ){
        return transitions[t];
      }
    }
  }

}


export default Game;
