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
    let val = card.value;
    let suit = card.suit;
    for(let i = 0; i < this.data.length; i++){
      if(this.data[i]){
        if(this.data[i].value === val && this.data[i].suit === suit){
          this.data[i] = undefined;
        }        
      }
    }
    return card;
  }

}


export default Board;
