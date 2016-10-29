import Nightmare from 'nightmare';
import path from 'path';
import readline from 'readline';
import { formatArgs, formatMessage, getTrollMessage, debugParam } from './helpers';

const args = process.argv;
const argumentsObj = formatArgs(args);
const nightmare = Nightmare( {
  typeInterval: 1,
  show: debugParam(argumentsObj)
});
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const messagesPath = argumentsObj['-c'] ? argumentsObj['-c'] : path.join(__dirname, '../.trollolo');
const site = argumentsObj['-t'];
const selector = argumentsObj['-s'];
const wait = argumentsObj['-w'] ? parseInt(argumentsObj['-t'], 10) : 500;

const processStart = new Date().getTime();
let processEnd;
let sitepage;
let phInstance;
let message;
let startTime;
let timeDiff;

function updateMessage(message) {
  const t = processEnd - processStart;
  const minutes = Math.floor(t / (1000*60));
  const seconds = ((t / 1000) % 60).toFixed(2);
  readline.moveCursor(rl, 0, -1);
  readline.clearLine(rl, 0);
  readline.cursorTo(rl, 0);
  if(timeDiff)
    rl.write(`Elapsed Time: ${minutes}m ${seconds}s / ${timeDiff[0]}s ${Math.floor(timeDiff[1]/1000000)}ms`);
  readline.moveCursor(rl, 0, 1);
  readline.clearLine(rl, 0);
  readline.cursorTo(rl, 0);
  rl.write(message);
}

function troll() {
  startTime = process.hrtime();
  message = getTrollMessage(messagesPath);
  updateMessage(message);
  nightmare
    .goto(site)
    .type(selector, message)
    .type(selector, '\u000d')
    .wait(wait)
    .evaluate(function () {
      return document.forms[0].innerHTML;
    })
    .then(function (form) {
      if(form) {
        // Continue
        timeDiff = process.hrtime(startTime);
        processEnd = new Date().getTime();
        troll();
      } else {
        // Dead End
      }
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

if(site && selector) {
  console.log('-------------------');
  console.log('      TROLLOLO     ');
  console.log(site);
  console.log('-------------------');
  troll();
} else {
  console.log('[ERROR] You must specify a target and selector');
}
