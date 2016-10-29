'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugParam = exports.typeIntervalParam = exports.getTrollMessage = exports.formatMessage = exports.formatArgs = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatArgs = exports.formatArgs = function formatArgs(arg) {
  var myObj = {};
  for (var i = 0; i < arg.length; i++) {
    if (i % 2 === 0) {
      myObj[arg[i]] = arg[i + 1] ? arg[i + 1] : 'flag';
    }
  }
  return myObj;
};

var formatMessage = exports.formatMessage = function formatMessage(messagesPath) {
  var data = _fs2.default.readFileSync(messagesPath);
  return JSON.parse(data);
};

var getTrollMessage = exports.getTrollMessage = function getTrollMessage(path) {
  var trollMessages = formatMessage(path);
  var i = Math.floor(Math.random() * (trollMessages.length - 0) + 0);
  return trollMessages[i];
};

var typeIntervalParam = exports.typeIntervalParam = function typeIntervalParam(args) {
  return args['-i'] ? args['-i'] : 100;
};

var debugParam = exports.debugParam = function debugParam(args) {
  return args['--debug'] || args['-D'] ? true : false;
};