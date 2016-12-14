import Game from './game';
import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
  let boardEl = document.getElementById("board");
  let scoreEl = document.getElementById("score");
  let matchesEls = document.getElementsByClassName("matches");
  let matchesButton = document.getElementById("matchbutton");
  let matchesButton2 = document.getElementById("matchbutton2");
  let matchBoxEl2 = document.getElementById("matchbox2");
  let resetButton = document.getElementById("resetbutton");

  matchesButton.addEventListener('click', toggleMatches);
  matchesButton2.addEventListener('click', toggleMatches2);

  startGame(boardEl, scoreEl, matchesEls[0], matchesEls[1], matchBoxEl2);

  resetButton.addEventListener('click', () => {
    if(window.timeout2){
      clearTimeout(window.timeout2);
    }
    if(window.timeout){
      clearTimeout(window.timeout);
    }
    startGame(boardEl, scoreEl, matchesEls[0], matchesEls[1], matchBoxEl2);
  });
});

const startGame = (boardEl, scoreEl, matchesEl, matches2El, matchBoxElEl) => {
  let type = prompt("Would you like to play alone?", "Yes");
  let player2 = undefined;
  if(type !== "Yes"){
    alert("Now playing against a computer player");
    player2 = new Player("Computer", "Computer");
  }
  let game = new Game(boardEl, scoreEl, matchesEl, new Player("Human", "Human"), matches2El, matchBoxElEl, player2);
}

const toggleMatches = (event) => {
  let el = document.getElementsByClassName("matches")[0];
  toggleEl(el);
};

const toggleMatches2 = (event) => {
  let el = document.getElementsByClassName("matches")[1];
  toggleEl(el);
};

const toggleEl = (el) => {
  if (el.classList) {
    el.classList.toggle("invisible");
  } else {
    let classes = el.className.split(' ');
    let existingIndex = classes.indexOf("invisible");

    if (existingIndex >= 0){
      classes.splice(existingIndex, 1);
    } else {
      classes.push("invisible");
    }

    el.className = classes.join(' ');
  }
}
