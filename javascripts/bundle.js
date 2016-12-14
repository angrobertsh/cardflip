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

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var boardDiv = document.getElementById("board");
	  var scoreDiv = document.getElementById("score");
	  var matchesDiv = document.getElementsByClassName("matches");
	  var matchesButton = document.getElementById("matchbutton");
	
	  var game = new _game2.default(boardDiv, scoreDiv, matchesDiv[0], matchbutton);
	  game.render();
	
	  matchesButton.addEventListener('click', toggleMatches);
	});
	
	var toggleMatches = function toggleMatches(event) {
	  var el = document.getElementsByClassName("matches")[0];
	
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
	  function Game(boardView, scoreView, matchesView) {
	    _classCallCheck(this, Game);
	
	    this.score = 0;
	    this.matchedPairs = [];
	    this.flippedArr = [];
	    this.board = new _board2.default();
	    this.boardView = boardView;
	    this.scoreView = scoreView;
	    this.matchesView = matchesView;
	  }
	
	  _createClass(Game, [{
	    key: "flip",
	    value: function flip(event) {
	      var loc = parseInt(event.currentTarget.id);
	
	      var cardToFlip = this.board.data[loc];
	      if (this.flippedArr.length == 2) {
	        this.flippedArr[0].unflip();
	        this.flippedArr[1].unflip();
	        this.flippedArr = [];
	      }
	
	      cardToFlip.flip();
	      this.flippedArr.push(cardToFlip);
	
	      if (this.flippedArr.length == 2) {
	        if (this.match(this.flippedArr[0], this.flippedArr[1])) {
	          this.flippedArr = [];
	          this.renderScore();
	          this.renderMatches();
	        }
	      }
	
	      this.render();
	    }
	  }, {
	    key: "match",
	    value: function match(card1, card2) {
	      if (card1.value === card2.value) {
	        this.score += 1;
	        this.cheer();
	        this.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
	        this.won();
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
	            newCell.addEventListener("click", this.flip.bind(this));
	          }
	        }
	        this.boardView.appendChild(newCell);
	      }
	    }
	  }, {
	    key: "renderScore",
	    value: function renderScore() {
	      this.scoreView.innerHTML = "Score: " + this.score + " Matches!";
	    }
	  }, {
	    key: "renderMatches",
	    value: function renderMatches() {
	      this.matchesView.innerHTML = "";
	      for (var i = 0; i < this.matchedPairs.length; i++) {
	        var pair = this.matchedPairs[i];
	        var pairDiv = document.createElement("div");
	        pairDiv.className = "pair";
	        for (var j = 0; j < 2; j++) {
	          var card = document.createElement("div");
	          card.className = "card matched true";
	          card.innerHTML = this.matchedPairs[i][j].value + " <br /> of <br /> " + this.matchedPairs[i][j].suit;
	          pairDiv.appendChild(card);
	        }
	        this.matchesView.appendChild(pairDiv);
	      }
	    }
	  }, {
	    key: "won",
	    value: function won() {
	      if (this.score === 26) {
	        alert("You win!");
	      }
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
	      var val = card.value;
	      var suit = card.suit;
	      for (var i = 0; i < this.data.length; i++) {
	        if (this.data[i]) {
	          if (this.data[i].value === val && this.data[i].suit === suit) {
	            this.data[i] = undefined;
	          }
	        }
	      }
	      return card;
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map