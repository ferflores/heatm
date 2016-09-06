/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _main = __webpack_require__(1);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.heatm = _main2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _drawMap = __webpack_require__(2);

	var _drawMap2 = _interopRequireDefault(_drawMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = {
	  newCoordsCallback: null
	};

	var recordedCoords = [];

	function addEvents() {
	  window.onmousemove = null;
	  window.onmousemove = function (event) {
	    mouseMoved(event.clientX, event.clientY);
	  };
	}

	function _stopRecording() {
	  window.onmousemove = null;
	}

	function mouseMoved(x, y) {
	  if (config.newCoordsCallback) {
	    config.newCoordsCallback(x, y);
	  }
	  recordedCoords.push({ x: x, y: y });
	}

	function setConfig(configObj) {
	  if (configObj) {
	    config.newCoordsCallback = configObj.newCoordsCallback;
	  }
	}

	exports.default = function (configObj) {

	  setConfig(configObj);

	  return {
	    startRecording: function startRecording() {
	      addEvents();
	    },

	    stopRecording: function stopRecording() {
	      _stopRecording();
	    },

	    drawHeatMap: function drawHeatMap() {
	      _stopRecording();
	      (0, _drawMap2.default)(recordedCoords);
	    }
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _colorInterpolation = __webpack_require__(3);

	var _colorInterpolation2 = _interopRequireDefault(_colorInterpolation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var initialColor = { R: 255, G: 0, B: 0, A: 0 };
	var targetColor = { R: 255, G: 255, B: 0, A: 1 };
	var defColorIncrement = .4;
	var defAlphaIncrement = .1;

	var markedCoords = {};
	var context = null;

	function createCanvas() {

	  var existingCanvas = document.getElementById('canvasHeatM');

	  if (existingCanvas) {
	    existingCanvas.parentNode.removeChild(existingCanvas);
	  }

	  var canvas = document.createElement('canvas');
	  canvas.id = "canvasHeatM";
	  canvas.width = screen.availWidth;
	  canvas.height = screen.availHeight;
	  canvas.style.zIndex = 1000;
	  canvas.style.position = 'absolute';
	  canvas.style.top = 0;
	  canvas.style.left = 0;

	  document.body.appendChild(canvas);
	  context = canvas.getContext('2d');
	}

	function processCoords(x, y) {
	  paintDot(x, y, defColorIncrement, defAlphaIncrement);

	  var aroundDots = [];
	  var ratioLevel = 1;

	  while (ratioLevel < 20) {
	    var radioPoints = ratioLevel * 3;

	    for (var j = 0; j < radioPoints; j++) {
	      var xi = Math.cos(Math.PI * 2 / radioPoints * j) * ratioLevel + x;
	      var yi = Math.sin(Math.PI * 2 / radioPoints * j) * ratioLevel + y;
	      paintDot(xi, yi, defColorIncrement - ratioLevel * 0.02, defAlphaIncrement - ratioLevel * .01);
	    }
	    ratioLevel++;
	  }
	}

	function paintDot(x, y, colorIncrement, alphaIncrement) {
	  var source = initialColor;
	  var currentColor = markedCoords['dot' + x + y];

	  if (currentColor) {
	    source = currentColor;
	  }

	  var newColor = (0, _colorInterpolation2.default)(source, targetColor, colorIncrement, alphaIncrement);

	  context.fillStyle = 'rgba(' + newColor.R + ',' + newColor.G + ',' + newColor.B + ',' + newColor.A + ')';

	  context.fillRect(x, y, 1, 1);

	  markedCoords['dot' + x + y] = newColor;
	}

	function drawCoords(coords) {
	  for (var i = 0; i < coords.length; i++) {
	    processCoords(coords[i].x, coords[i].y);
	  }
	}

	exports.default = function (coords) {
	  if (coords && coords.length > 0) {
	    createCanvas();
	    drawCoords(coords);
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (source, target, colorIncrement, alpha) {
	  if (JSON.stringify(source) === JSON.stringify(target)) {
	    return target;
	  }

	  var r = source.R + (target.R - source.R) * colorIncrement;
	  var g = source.G + (target.G - source.G) * colorIncrement;
	  var b = source.B + (target.B - source.B) * colorIncrement;

	  return { R: Math.floor(r), G: Math.floor(g), B: Math.floor(b), A: alpha };
	};

/***/ }
/******/ ]);