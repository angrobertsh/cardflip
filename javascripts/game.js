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
      }
    }

    this.render();
  }

  match(card1, card2){
    if(card1.value === card2.value){
      this.score += 1;
      this.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
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
          newCell.innerHTML = `${val} of ${suit}`;
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

}



export default Game;
