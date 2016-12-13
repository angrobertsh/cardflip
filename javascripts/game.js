import Board from './board';

class Game{
  constructor(view){
    this.score = 0;
    this.matchedPairs = [];
    this.flippedArr = [];
    this.board = new Board();
    this.view = view;
  }

  flip(loc){
    let cardToFlip = this.board.data[loc];
    if(this.flippedArr.length == 2){
      this.flippedArr[0].flipped = false;
      this.flippedArr[1].flipped = false;
      this.flippedArr = [];
    }

    cardToFlip.flipped = true;
    this.flippedArr.push(cardToFlip);

    if(this.flippedArr.length == 2){
      if(this.match(this.flippedArr[0], this.flippedArr[1])){
        this.flippedArr = [];
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
    for(let i = 0; i < this.board.data.length; i++){

    }
  }

}

export default Game;
