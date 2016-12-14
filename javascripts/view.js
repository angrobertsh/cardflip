import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    let boardDiv = document.getElementById("board");
    let scoreDiv = document.getElementById("score");
    let matchesDiv = document.getElementsByClassName("matches");
    let matchesButton = document.getElementById("matchbutton");

    let game = new Game(boardDiv, scoreDiv, matchesDiv[0], matchbutton);
    game.render();

    matchesButton.addEventListener('click', toggleMatches);
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
