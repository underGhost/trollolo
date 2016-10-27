import fs from 'fs';

export function formatArgs(arg) {
  const myObj = {};
  for(let i = 0; i < arg.length; i++) {
    if(i % 2 === 0) {
      myObj[arg[i]] = arg[i + 1] ? arg[i + 1] : 'flag';
    }
  }
  return myObj;
}

export function formatMessage(messagesPath) {
  const data = fs.readFileSync(messagesPath);
  return JSON.parse(data);
}

export function getTrollMessage(path) {
  const trollMessages = formatMessage(path);
  const i = Math.floor(Math.random() * (trollMessages.length - 0) + 0);
  return trollMessages[i];
}

export function debugParam(args) {
  return args['--debug'] || args['-D'] ? { show: true } : ''
}
