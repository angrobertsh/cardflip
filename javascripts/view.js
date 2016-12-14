import Game from './game';
import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
  let boardDiv = document.getElementById("board");
  let scoreDiv = document.getElementById("score");
  let matchesDiv = document.getElementsByClassName("matches");
  let matchesButton = document.getElementById("matchbutton");
  let matchesButton2 = document.getElementById("matchbutton2");
  let matchBox2 = document.getElementById("matchbox2");
  let resetButton = document.getElementById("resetbutton");

  let type = prompt("Would you like to play alone?", "Yes");
  if(type === "Yes"){
    let game = new Game(boardDiv, scoreDiv, matchesDiv[0], new Player("Human", "Human"), matchesDiv[1], matchBox2);
  } else {
    alert("Now playing against a computer player");
    let game = new Game(boardDiv, scoreDiv, matchesDiv[0], new Player("Human", "Human"), matchesDiv[1], matchBox2, new Player("Computer", "Computer"));
  }

  matchesButton.addEventListener('click', toggleMatches);
  matchesButton2.addEventListener('click', toggleMatches2);
  resetButton.addEventListener('click', () => {
    if(window.timeout2){
      clearTimeout(window.timeout2);
    }
    if(window.timeout){
      clearTimeout(window.timeout);
    }
    let type = prompt("Would you like to play alone?", "Yes");
    if(type === "Yes"){
      let game = new Game(boardDiv, scoreDiv, matchesDiv[0], new Player("Human", "Human"), matchesDiv[1], matchBox2);
    } else {
      alert("Now playing against a computer player");
      let game = new Game(boardDiv, scoreDiv, matchesDiv[0], new Player("Human", "Human"), matchesDiv[1], matchBox2, new Player("Computer", "Computer"));
    }
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

const toggleMatches2 = (event) => {
  let el = document.getElementsByClassName("matches")[1];

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
