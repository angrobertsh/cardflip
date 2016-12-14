import Deck from './deck';

class Board{
  constructor(){
    this.deck = new Deck();
    this.data = [];
    this.setup();
  }

  setup(){
    this.deck.shuffle()
    for(let i = 0; i < this.deck.cards.length; i++){
      this.data.push(this.deck.cards[i]);
    }
  }

  remove(card){
    let idx = this.locate(card);
    if(idx > -1){
      this.data[idx] = undefined;
    }
    return card;
  }

  validMoves(){
    let moves = [];
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i]){
        moves.push(i);
      }
    }
    return moves;
  }

  locate(card){
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i]){
        if(this.data[i].value === card.value && this.data[i].suit === card.suit){
          return i;
        }
      }
    }
    return undefined;
  }

}


export default Board;
