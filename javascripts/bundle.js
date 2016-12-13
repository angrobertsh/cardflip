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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(1);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(view) {
	    _classCallCheck(this, Game);
	
	    this.score = 0;
	    this.matchedPairs = [];
	    this.flippedArr = [];
	    this.board = new _board2.default();
	    this.view = view;
	  }
	
	  _createClass(Game, [{
	    key: 'flip',
	    value: function flip(loc) {
	      var cardToFlip = this.board.data[loc];
	      if (this.flippedArr.length == 2) {
	        this.flippedArr[0].flipped = false;
	        this.flippedArr[1].flipped = false;
	        this.flippedArr = [];
	      }
	
	      cardToFlip.flipped = true;
	      this.flippedArr.push(cardToFlip);
	
	      if (this.flippedArr.length == 2) {
	        if (this.match(this.flippedArr[0], this.flippedArr[1])) {
	          this.flippedArr = [];
	        }
	      }
	
	      this.render();
	    }
	  }, {
	    key: 'match',
	    value: function match(card1, card2) {
	      if (card1.value === card2.value) {
	        this.score += 1;
	        this.matchedPairs.push([this.board.remove(card1), this.board.remove(card2)]);
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      for (var i = 0; i < this.board.data.length; i++) {}
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 1 */
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
	      for (var i = 0; i < this.deck.length; i++) {
	        this.data.push(this.deck[i]);
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(card) {
	      var val = card.value;
	      var suit = card.suit;
	      for (var i = 0; i < this.data.length; i++) {
	        if (this.data[i].value === val && this.data[i].suit === suit) {
	          this.data[i] = [];
	        }
	      }
	      return card;
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Card = function Card(value, suit) {
	  _classCallCheck(this, Card);
	
	  this.value = value;
	  this.suit = suit;
	  this.flipped = false;
	};
	
	exports.default = Card;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _card = __webpack_require__(2);
	
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
	        this.cards.push(new _card2.default(suits[i], nums[j]));
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map