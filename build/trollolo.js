'use strict';

var _nightmare = require('nightmare');

var _nightmare2 = _interopRequireDefault(_nightmare);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv;
var argumentsObj = (0, _helpers.formatArgs)(args);
var nightmare = (0, _nightmare2.default)((0, _helpers.debugParam)(argumentsObj));

var sitepage = void 0;
var phInstance = void 0;
var message = void 0;

var messagesPath = argumentsObj['-c'] ? argumentsObj['-c'] : _path2.default.join(__dirname, '../.trollolo');
var site = argumentsObj['-t'];
var selector = argumentsObj['-s'];
var wait = argumentsObj['-w'] ? parseInt(argumentsObj['-t'], 10) : 500;

function troll() {
  message = (0, _helpers.getTrollMessage)(messagesPath);
  console.log('[MESSAGE]', message);
  nightmare.goto(site).type(selector, message).type(selector, '\r').wait(wait).evaluate(function () {
    return document.forms[0].innerHTML;
  }).then(function (form) {
    if (form) {
      console.log('[CONTINUING]');
      troll();
    } else {
      console.log('[DEAD END] No forms found. Terminating.');
    }
  }).catch(function (error) {
    console.error('Search failed:', error);
  });
}

if (site && selector) {
  console.log('[TROLLING]', site);
  troll();
} else {
  console.log('[ERROR] You must specify a target and selector');
}