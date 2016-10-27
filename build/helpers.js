'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatArgs = formatArgs;
exports.formatMessage = formatMessage;
exports.getTrollMessage = getTrollMessage;
exports.debugParam = debugParam;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatArgs(arg) {
  var myObj = {};
  for (var i = 0; i < arg.length; i++) {
    if (i % 2 === 0) {
      myObj[arg[i]] = arg[i + 1] ? arg[i + 1] : 'flag';
    }
  }
  return myObj;
}

function formatMessage(messagesPath) {
  var data = _fs2.default.readFileSync(messagesPath);
  return JSON.parse(data);
}

function getTrollMessage(path) {
  var trollMessages = formatMessage(path);
  var i = Math.floor(Math.random() * (trollMessages.length - 0) + 0);
  return trollMessages[i];
}

function debugParam(args) {
  return args['--debug'] || args['-D'] ? { show: true } : '';
}