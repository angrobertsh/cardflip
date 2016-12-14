class Card{
  constructor(value, suit){
    this.value = value;
    this.suit = suit;
    this.flipped = false;
  }

  flip(){
    this.flipped = true;
  }

  unflip(){
    this.flipped = false;
  }

}

export default Card;
