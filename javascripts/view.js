import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
    let boardDiv = document.getElementById("board");
    let game = new Game(boardDiv);
});
