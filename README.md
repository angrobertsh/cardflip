# Cardflip!
  See Cardflip live [here!](https://angrobertsh.github.io/cardflip/)

## Overview
  Cardflip is a matching card game where you flip cards until you get all the matches. Click on cards to flip them, and if they go blue, they're matched! See your matches by toggling the matches button, and see your score at the top of the screen!

## Technologies
  This website was made with JavaScript, invoking the regular inheritance patterns required by ES6. Files are bundled with webpack and code is transpiled with babel. The DOM is altered using regular JavaScript to append children onto DOM elements. There's also a single animation made with [animate.css](https://github.com/daneden/animate.css).

## Implementation details

### Game Logic

`Card`s have suits, values, and a flipped state.

```javascript
class Card{
  constructor(value, suit){
    this.value = value;
    this.suit = suit;
    this.flipped = false;
  }
}
```

`Deck`s are collections of cards. They have a shuffle method that utilizes `Math.random()`.

```javascript
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
```

A `Board` utilizes a shuffled deck and generates a display using the positions of the cards in its `data` array to inform how the `Card` divs are rendered on the screen. Ultimately it is the `Game` class that renders the board as well as other important game data, such as matched pairs and scores. The board is initially rendered, and after taking a turn (utilizing the logic in `flip`), everything is rerendered.

```javascript
this.render();

if(this.flippedArr.length == 2){
  let card1 = this.flippedArr[0];
  let card2 = this.flippedArr[1]
  if(this.match(card1, card2)){
    this.renderScore();
    this.renderMatches();
    this.render();
  } else {
    // Redacted
    card1.unflip();
    card2.unflip();
  }
  this.flippedArr = [];
}
```

When a match is found, the `score` is incremented and the `Game` checks to see if you've `won`.

```javascript
if(card1.value === card2.value){
  this.cheer();
  this.currentPlayer.score += 1;
  // Redacted
  this.currentPlayer.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
  this.won();
  return true;
}
return false
```

User input is determined by `click` event listeners, and information is passed to the processing side through the `div` `id` which is analogous to its location in the `data` array of `Board`.

```javascript
  let val = item.value;
  let suit = item.suit;
  newCell.className = `card ${item.flipped}`
  newCell.id = `${i}`
  if(item.flipped){
    newCell.innerHTML = `${val} <br /> of <br /> ${suit}`;
  } else {
    newCell.addEventListener("click", this.flip.bind(this));
  }
```

### AI

Throughout the course of the game, players (both computer and human alike thanks to ducktyping) `remember` and `forget` based on actions taken throughout the game. When new information is revealed, it's added to the `Player` `memory` instance variable. When a pair is revealed, the players `forget` and no longer consider them in future decisions.

```javascript
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
```
Computer players use this `memory` variable to make decisions. If it knows of a pair, it'll make that move during its turn. Otherwise, it will pick two valid points randomly.

```javascript
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
```

## Future features
  Cardflip uses very elementary CSS. Future implementations would involve creating better color and opacity coordination, invoking better transitions on flipping cards, and using better fonts. Additional decision-making could be incorporated into the AI, such as considering half turns if it reveals something already seen, as opposed to picking the pair of actions and not considering what was just flipped.
