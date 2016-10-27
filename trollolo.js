#! /usr/bin/env node
import Nightmare from 'nightmare';
import { formatArgs, formatMessage, getTrollMessage, debugParam } from './helpers';

const args = process.argv;
const argumentsObj = formatArgs(args);
const nightmare = Nightmare(debugParam(argumentsObj));

let sitepage;
let phInstance;
let message;

const messagesPath = argumentsObj['-c'] ? argumentsObj['-c'] : './.trollolo';
const site = argumentsObj['-t'];
const selector = argumentsObj['-s'];
const wait = argumentsObj['-w'] ? parseInt(argumentsObj['-t'], 10) : 500;

function troll() {
  message = getTrollMessage(messagesPath);
  console.log('[MESSAGE]', message);
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
        console.log('[CONTINUING]');
        troll();
      } else {
        console.log('[DEAD END] No forms found. Terminating.');
      }
    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
}

if(site && selector) {
  console.log('[TROLLING]', site);
  troll();
} else {
  console.log('NO SITE SPECIFIED');
}
