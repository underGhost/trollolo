#! /usr/bin/env node

function formatArgs(arguments) {
  const myObj = {};
  for(let i = 0; i < arguments.length; i++) {
    if(i % 2 === 0) {
      myObj[arguments[i]] = arguments[i + 1];
    }
  }
  return myObj;
}

var args = process.argv;
var argumentsObj = formatArgs(args);
var Nightmare = require('nightmare');
var nightmare = Nightmare(args.indexOf('-D') > 0 ? { show: true } : '');
const trollMessages = require('./trollMessages.js');

let sitepage;
let phInstance;
let message;

function getTrollMessage() {
  const i = Math.floor(Math.random() * (trollMessages.length - 0) + 0);
  return trollMessages[i];
}

const site = argumentsObj['-s'];
const selector = argumentsObj['-c'];
const wait = argumentsObj['-t'] ? parseInt(argumentsObj['-t'], 10) : 500;

function troll() {
  message = getTrollMessage();
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
