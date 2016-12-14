import Game from './game';
import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
  let boardDiv = document.getElementById("board");
  let scoreDiv = document.getElementById("score");
  let matchesDiv = document.getElementsByClassName("matches");
  let matchesButton = document.getElementById("matchbutton");
  let matchesButton2 = document.getElementById("matchbutton2");
  let matchBox = document.getElementById("matchbox");
  let matchBox2 = document.getElementById("matchbox2");
  let resetButton = document.getElementById("resetbutton");

  matchesButton.addEventListener('click', toggleMatches);
  matchesButton2.addEventListener('click', toggleMatches2);

  startGame(boardDiv, scoreDiv, matchesDiv[0], matchesDiv[1], matchBox2);

  resetButton.addEventListener('click', () => {
    if(window.timeout2){
      clearTimeout(window.timeout2);
    }
    if(window.timeout){
      clearTimeout(window.timeout);
    }
    startGame(boardDiv, scoreDiv, matchesDiv[0], matchesDiv[1], matchBox2);
  });
});

const startGame = (boardEl, scoreEl, matchesEl, matches2El, matchBoxEl) => {
  let type = prompt("Would you like to play alone?", "Yes");
  let player2 = undefined;
  if(type !== "Yes"){
    alert("Now playing against a computer player");
    player2 = new Player("Computer", "Computer");
  }
  let game = new Game(boardEl, scoreEl, matchesEl, new Player("Human", "Human"), matches2El, matchBoxEl, player2);
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
