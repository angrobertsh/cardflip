/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _player = __webpack_require__(5);
	
	var _player2 = _interopRequireDefault(_player);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var boardDiv = document.getElementById("board");
	  var scoreDiv = document.getElementById("score");
	  var matchesDiv = document.getElementsByClassName("matches");
	  var matchesButton = document.getElementById("matchbutton");
	  var matchesButton2 = document.getElementById("matchbutton2");
	  var matchBox = document.getElementById("matchbox");
	  var matchBox2 = document.getElementById("matchbox2");
	  var resetButton = document.getElementById("resetbutton");
	
	  matchesButton.addEventListener('click', toggleMatches);
	  matchesButton2.addEventListener('click', toggleMatches2);
	
	  startGame(boardDiv, scoreDiv, matchesDiv[0], matchesDiv[1], matchBox2);
	
	  resetButton.addEventListener('click', function () {
	    if (window.timeout2) {
	      clearTimeout(window.timeout2);
	    }
	    if (window.timeout) {
	      clearTimeout(window.timeout);
	    }
	    startGame(boardDiv, scoreDiv, matchesDiv[0], matchesDiv[1], matchBox2);
	  });
	});
	
	var startGame = function startGame(boardEl, scoreEl, matchesEl, matches2El, matchBoxEl) {
	  var type = prompt("Would you like to play alone?", "Yes");
	  var player2 = undefined;
	  if (type !== "Yes") {
	    alert("Now playing against a computer player");
	    player2 = new _player2.default("Computer", "Computer");
	  }
	  var game = new _game2.default(boardEl, scoreEl, matchesEl, new _player2.default("Human", "Human"), matches2El, matchBoxEl, player2);
	};
	
	var toggleMatches = function toggleMatches(event) {
	  var el = document.getElementsByClassName("matches")[0];
	  toggleEl(el);
	};
	
	var toggleMatches2 = function toggleMatches2(event) {
	  var el = document.getElementsByClassName("matches")[1];
	  toggleEl(el);
	};
	
	var toggleEl = function toggleEl(el) {
	  if (el.classList) {
	    el.classList.toggle("invisible");
	  } else {
	    var classes = el.className.split(' ');
	    var existingIndex = classes.indexOf("invisible");
	
	    if (existingIndex >= 0) {
	      classes.splice(existingIndex, 1);
	    } else {
	      classes.push("invisible");
	    }
	
	    el.className = classes.join(' ');
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(boardView, scoreView, matchesView, p1, matchesView2, matchBox2) {
	    var p2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;
	
	    _classCallCheck(this, Game);
	
	    this.p1 = p1;
	    this.p2 = p2;
	    this.currentPlayer = p1;
	    this.flippedArr = [];
	    this.board = new _board2.default();
	    this.boardView = boardView;
	    this.scoreView = scoreView;
	    this.matchesView = matchesView;
	    this.matchesView2 = matchesView2;
	    this.matchBox2 = matchBox2;
	    this.initializeGame();
	  }
	
	  _createClass(Game, [{
	    key: "initializeGame",
	    value: function initializeGame() {
	      this.scoreView.innerHTML = "Welcome to Cardflip!";
	      if (this.p2) {
	        this.matchBox2.className = "visible";
	      } else {
	        this.matchBox2.className = "invisible";
	      }
	      this.render();
	      this.renderMatches();
	      while (this.won === false) {
	        this.currentPlayer.takeTurn(this);
	      }
	    }
	  }, {
	    key: "clickFlip",
	    value: function clickFlip(event) {
	      var loc = parseInt(event.currentTarget.id);
	      this.flipLoc(loc);
	    }
	  }, {
	    key: "flipLoc",
	    value: function flipLoc(loc) {
	      var cardToFlip = this.board.data[loc];
	
	      cardToFlip.flip();
	      this.flippedArr.push(cardToFlip);
	
	      this.p1.remember(cardToFlip.value, loc);
	      if (this.p2) {
	        this.p2.remember(cardToFlip.value, loc);
	      }
	      this.render();
	
	      if (this.flippedArr.length == 2) {
	        this.processTurn();
	      }
	    }
	  }, {
	    key: "processTurn",
	    value: function processTurn() {
	      var card1 = this.flippedArr[0];
	      var card2 = this.flippedArr[1];
	      if (this.match(card1, card2)) {
	        this.renderScore();
	        this.renderMatches();
	        this.render();
	        if (this.won()) {
	          return;
	        }
	      } else {
	        this.currentPlayer.finishTurn();
	        if (this.currentPlayer.name === this.p1.name && this.p2) {
	          this.currentPlayer = this.p2;
	        } else {
	          this.currentPlayer = this.p1;
	        }
	        card1.unflip();
	        card2.unflip();
	      }
	      this.flippedArr = [];
	      this.currentPlayer.takeTurn(this);
	    }
	  }, {
	    key: "match",
	    value: function match(card1, card2) {
	      if (card1.value === card2.value) {
	        this.cheer();
	        this.currentPlayer.score += 1;
	        this.p1.forget(card1.value, this.board.locate(card1));
	        this.p1.forget(card2.value, this.board.locate(card2));
	        if (this.p2) {
	          this.p2.forget(card1.value, this.board.locate(card1));
	          this.p2.forget(card2.value, this.board.locate(card2));
	        }
	        this.currentPlayer.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.boardView.innerHTML = "";
	      for (var i = 0; i < this.board.data.length; i++) {
	        var newCell = document.createElement("div");
	        var item = this.board.data[i];
	        if (item === undefined) {
	          newCell.className = "empty";
	        } else {
	          var val = item.value;
	          var suit = item.suit;
	          newCell.className = "card " + item.flipped;
	          newCell.id = "" + i;
	          if (item.flipped) {
	            newCell.innerHTML = val + " <br /> of <br /> " + suit;
	          } else {
	            newCell.addEventListener("click", this.clickFlip.bind(this));
	          }
	        }
	        this.boardView.appendChild(newCell);
	      }
	    }
	  }, {
	    key: "renderScore",
	    value: function renderScore() {
	      if (this.p1 && this.p2) {
	        this.scoreView.innerHTML = this.p1.name + ": " + this.p1.score + "! " + this.p2.name + ": " + this.p2.score + "!";
	      } else {
	        this.scoreView.innerHTML = "Score: " + this.p1.score + " Matches!";
	      }
	    }
	  }, {
	    key: "renderMatches",
	    value: function renderMatches() {
	      this.renderPlayerMatches(this.p1, this.matchesView);
	      if (this.p2) {
	        this.renderPlayerMatches(this.p2, this.matchesView2);
	      }
	    }
	  }, {
	    key: "renderPlayerMatches",
	    value: function renderPlayerMatches(player, view) {
	      view.innerHTML = "";
	      for (var i = 0; i < player.matchedPairs.length; i++) {
	        var pair = player.matchedPairs[i];
	        var pairDiv = document.createElement("div");
	        pairDiv.className = "pair";
	        for (var j = 0; j < 2; j++) {
	          var card = document.createElement("div");
	          card.className = "card matched true";
	          card.innerHTML = player.matchedPairs[i][j].value + " <br /> of <br /> " + player.matchedPairs[i][j].suit;
	          pairDiv.appendChild(card);
	        }
	        view.appendChild(pairDiv);
	      }
	    }
	  }, {
	    key: "won",
	    value: function won() {
	      for (var i = 0; i < this.board.data.length; i++) {
	        if (this.board.data[i]) {
	          return false;
	        }
	      }
	      if (this.p2) {
	        if (this.p1.score > this.p2.score) {
	          this.scoreView.innerHTML = "Game over! " + this.p1.name + " wins!";
	        } else {
	          this.scoreView.innerHTML = "Game over! " + this.p2.name + " wins!";
	        }
	      } else {
	        this.scoreView.innerHTML = "Game over! You win!";
	      }
	      return true;
	    }
	  }, {
	    key: "cheer",
	    value: function cheer() {
	      var matchcry = document.getElementById("amatch");
	      matchcry.classList.add("fadeIn", "animated", "visible");
	      matchcry.classList.remove("hidden");
	
	      var transitionEvent = this.whichTransitionEvent();
	      transitionEvent && matchcry.addEventListener(transitionEvent, function () {
	        matchcry.classList.remove("fadeIn", "animated", "visible");
	        matchcry.classList.add("hidden");
	      });
	    }
	  }, {
	    key: "whichTransitionEvent",
	    value: function whichTransitionEvent() {
	      var t = void 0;
	      var el = document.createElement('fakeelement');
	      var transitions = {
	        'animation': 'animationend',
	        'OAnimation': 'oAnimationEnd',
	        'MozAnimation': 'animationend',
	        'WebkitAnimation': 'webkitAnimationEnd'
	      };
	
	      for (t in transitions) {
	        if (el.style[t] !== undefined) {
	          return transitions[t];
	        }
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _deck = __webpack_require__(3);
	
	var _deck2 = _interopRequireDefault(_deck);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board() {
	    _classCallCheck(this, Board);
	
	    this.deck = new _deck2.default();
	    this.data = [];
	    this.setup();
	  }
	
	  _createClass(Board, [{
	    key: 'setup',
	    value: function setup() {
	      this.deck.shuffle();
	      for (var i = 0; i < this.deck.cards.length; i++) {
	        this.data.push(this.deck.cards[i]);
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(card) {
	      var idx = this.locate(card);
	      if (idx > -1) {
	        this.data[idx] = undefined;
	      }
	      return card;
	    }
	  }, {
	    key: 'validMoves',
	    value: function validMoves() {
	      var moves = [];
	      for (var i = 0; i < this.data.length; i++) {
	        if (this.data[i]) {
	          moves.push(i);
	        }
	      }
	      return moves;
	    }
	  }, {
	    key: 'locate',
	    value: function locate(card) {
	      for (var i = 0; i < this.data.length; i++) {
	        if (this.data[i]) {
	          if (this.data[i].value === card.value && this.data[i].suit === card.suit) {
	            return i;
	          }
	        }
	      }
	      return undefined;
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _card = __webpack_require__(4);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
	var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
	
	var Deck = function () {
	  function Deck() {
	    _classCallCheck(this, Deck);
	
	    this.cards = [];
	    for (var i = 0; i < suits.length; i++) {
	      for (var j = 0; j < nums.length; j++) {
	        this.cards.push(new _card2.default(nums[j], suits[i]));
	      }
	    }
	  }
	
	  _createClass(Deck, [{
	    key: "shuffle",
	    value: function shuffle() {
	      var temp = void 0;
	      var randomIndex = void 0;
	
	      for (var i = 0; i < this.cards.length; i++) {
	        randomIndex = Math.floor(Math.random() * this.cards.length);
	        temp = this.cards[i];
	        this.cards[i] = this.cards[randomIndex];
	        this.cards[randomIndex] = temp;
	      }
	    }
	  }]);
	
	  return Deck;
	}();
	
	exports.default = Deck;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Card = function () {
	  function Card(value, suit) {
	    _classCallCheck(this, Card);
	
	    this.value = value;
	    this.suit = suit;
	    this.flipped = false;
	  }
	
	  _createClass(Card, [{
	    key: "flip",
	    value: function flip() {
	      this.flipped = true;
	    }
	  }, {
	    key: "unflip",
	    value: function unflip() {
	      this.flipped = false;
	    }
	  }]);
	
	  return Card;
	}();
	
	exports.default = Card;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player(type, name) {
	    _classCallCheck(this, Player);
	
	    this.type = type;
	    this.name = name;
	    this.score = 0;
	    this.matchedPairs = [];
	    this.memory = {};
	  }
	
	  _createClass(Player, [{
	    key: "takeTurn",
	    value: function takeTurn(game) {
	      var _this = this;
	
	      if (this.type == "Computer") {
	        (function () {
	          _this.freezeOverlay();
	          var pair = _this.searchForPairsInMemory();
	          if (pair === undefined) {
	            pair = _this.randomValidPair(game);
	          }
	          window.timeout1 = setTimeout(function () {
	            game.flipLoc(pair[0]);
	          }, 1000);
	          window.timeout2 = setTimeout(function () {
	            game.flipLoc(pair[1]);
	          }, 2000);
	        })();
	      }
	    }
	  }, {
	    key: "finishTurn",
	    value: function finishTurn(game) {
	      if (this.type == "Computer") {
	        this.vanishOverlay();
	      }
	    }
	  }, {
	    key: "remember",
	    value: function remember(val, loc) {
	      if (this.memory[val] && this.memory[val].includes(loc) === false) {
	        this.memory[val] = this.memory[val].concat([loc]);
	      } else {
	        this.memory[val] = [loc];
	      }
	    }
	  }, {
	    key: "forget",
	    value: function forget(val, loc) {
	      var idx = this.memory[val].indexOf(loc);
	      this.memory[val].splice(idx, 1);
	    }
	  }, {
	    key: "freezeOverlay",
	    value: function freezeOverlay() {
	      var overlay = document.getElementById("overlay");
	      overlay.className = "visible";
	    }
	  }, {
	    key: "vanishOverlay",
	    value: function vanishOverlay() {
	      var overlay = document.getElementById("overlay");
	      overlay.className = "invisible";
	    }
	  }, {
	    key: "searchForPairsInMemory",
	    value: function searchForPairsInMemory() {
	      var vals = Object.keys(this.memory);
	      for (var i = 0; i < vals.length; i++) {
	        if (this.memory[vals[i]].length > 1) {
	          var pair = [this.memory[vals[i]][0], this.memory[vals[i]][1]];
	          this.memory[vals[i]].splice(0, 2);
	          return pair;
	        }
	      }
	      return undefined;
	    }
	  }, {
	    key: "randomValidPair",
	    value: function randomValidPair(game) {
	      var validMoves = game.board.validMoves();
	      var idx = Math.floor(Math.random() * validMoves.length);
	      var move1 = validMoves.splice(idx, 1)[0];
	      var move2 = validMoves[Math.floor(Math.random() * validMoves.length)];
	      return [move1, move2];
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map