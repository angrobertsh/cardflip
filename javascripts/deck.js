import Card from './card';

const suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class Deck{
  constructor(){
    this.cards = [];
    for(let i = 0; i < suits.length; i++){
      for(let j = 0; j < nums.length; j++){
        this.cards.push(new Card(nums[j], suits[i]));
      }
    }
  }

  shuffle(){
    let temp;
    let randomIndex;

    for(let i = 0; i < this.cards.length; i++){
      randomIndex = Math.floor(Math.random() * this.cards.length);
      temp = this.cards[i];
      this.cards[i] = this.cards[randomIndex];
      this.cards[randomIndex] = temp;
    }
  }

}

export default Deck;
