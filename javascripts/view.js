import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    let boardDiv = document.getElementById("board");
    let scoreDiv = document.getElementById("score");
    let matchesDiv = document.getElementsByClassName("matches");
    let matchesButton = document.getElementById("matchbutton");
    let resetButton = document.getElementById("resetbutton");

    let game = new Game(boardDiv, scoreDiv, matchesDiv[0]);
    game.render();

    matchesButton.addEventListener('click', toggleMatches);
    resetButton.addEventListener('click', () => {
      game = new Game(boardDiv, scoreDiv, matchesDiv[0]);
      game.render();
      game.renderMatches();
    });
});

const toggleMatches = (event) => {
  let el = document.getElementsByClassName("matches")[0];

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

};
