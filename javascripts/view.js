import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    let boardDiv = document.getElementById("board");
    let scoreDiv = document.getElementById("score");
    let matchesDiv = document.getElementById("matches");
    let game = new Game(boardDiv, scoreDiv, matchesDiv);
    game.render();
});
