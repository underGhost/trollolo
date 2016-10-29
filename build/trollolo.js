'use strict';

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv;
var argumentsObj = (0, _helpers.formatArgs)(args);
var nightmare = (0, _nightmare2.default)({
  typeInterval: 1,
  show: (0, _helpers.debugParam)(argumentsObj)
});
var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

var messagesPath = argumentsObj['-c'] ? argumentsObj['-c'] : _path2.default.join(__dirname, '../.trollolo');
var site = argumentsObj['-t'];
var selector = argumentsObj['-s'];
var wait = argumentsObj['-w'] ? parseInt(argumentsObj['-t'], 10) : 500;

var processStart = new Date().getTime();
var processEnd = void 0;
var sitepage = void 0;
var phInstance = void 0;
var message = void 0;
var startTime = void 0;
var timeDiff = void 0;

function updateMessage(message) {
  var t = processEnd - processStart;
  var minutes = Math.floor(t / (1000 * 60));
  var seconds = (t / 1000 % 60).toFixed(2);
  _readline2.default.moveCursor(rl, 0, -1);
  _readline2.default.clearLine(rl, 0);
  _readline2.default.cursorTo(rl, 0);
  if (timeDiff) rl.write('Elapsed Time: ' + minutes + 'm ' + seconds + 's / ' + timeDiff[0] + 's ' + Math.floor(timeDiff[1] / 1000000) + 'ms');
  _readline2.default.moveCursor(rl, 0, 1);
  _readline2.default.clearLine(rl, 0);
  _readline2.default.cursorTo(rl, 0);
  rl.write(message);
}

function troll() {
  startTime = process.hrtime();
  message = (0, _helpers.getTrollMessage)(messagesPath);
  updateMessage(message);
  nightmare.goto(site).type(selector, message).type(selector, '\r').wait(wait).evaluate(function () {
    return document.forms[0].innerHTML;
  }).then(function (form) {
    if (form) {
      // Continue
      timeDiff = process.hrtime(startTime);
      processEnd = new Date().getTime();
      troll();
    } else {
      // Dead End
    }
  }).catch(function (error) {
    console.error('Search failed:', error);
  });
}

if (site && selector) {
  console.log('-------------------');
  console.log('      TROLLOLO     ');
  console.log(site);
  console.log('-------------------');
  troll();
} else {
  console.log('[ERROR] You must specify a target and selector');
}