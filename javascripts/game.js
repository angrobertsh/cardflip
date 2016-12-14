import Board from './board';

class Game{
  constructor(boardView, scoreView, matchesView){
    this.score = 0;
    this.matchedPairs = [];
    this.flippedArr = [];
    this.board = new Board();
    this.boardView = boardView;
    this.scoreView = scoreView;
    this.matchesView = matchesView;
    this.scoreView.innerHTML = "Welcome to Cardflip!"
  }

  flip(event){
    let loc = parseInt(event.currentTarget.id);

    let cardToFlip = this.board.data[loc];
    if(this.flippedArr.length == 2){
      this.flippedArr[0].unflip();
      this.flippedArr[1].unflip();
      this.flippedArr = [];
    }

    cardToFlip.flip();
    this.flippedArr.push(cardToFlip);

    if(this.flippedArr.length == 2){
      if(this.match(this.flippedArr[0], this.flippedArr[1])){
        this.flippedArr = [];
        this.renderScore();
        this.renderMatches();
      }
    }

    this.render();
  }

  match(card1, card2){
    if(card1.value === card2.value){
      this.score += 1;
      this.cheer();
      this.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
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
          newCell.addEventListener("click", this.flip.bind(this));
        }
      }
      this.boardView.appendChild(newCell);
    }
  }

  renderScore(){
    this.scoreView.innerHTML = `Score: ${this.score} Matches!`
  }

  renderMatches(){
    this.matchesView.innerHTML = "";
    for(let i = 0; i < this.matchedPairs.length; i++){
      let pair = this.matchedPairs[i];
      let pairDiv = document.createElement("div");
      pairDiv.className = "pair";
      for(let j = 0; j < 2; j++){
        let card = document.createElement("div");
        card.className = "card matched true";
        card.innerHTML = `${this.matchedPairs[i][j].value} <br /> of <br /> ${this.matchedPairs[i][j].suit}`;
        pairDiv.appendChild(card);
      }
      this.matchesView.appendChild(pairDiv);
    }
  }

  won(){
    if(this.score === 26){
      alert("You win!");
    }
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
