import fs from 'fs';

export const formatArgs = (arg) => {
  const myObj = {};
  for(let i = 0; i < arg.length; i++) {
    if(i % 2 === 0) {
      myObj[arg[i]] = arg[i + 1] ? arg[i + 1] : 'flag';
    }
  }
  return myObj;
}

export const formatMessage = (messagesPath) => {
  const data = fs.readFileSync(messagesPath);
  return JSON.parse(data);
}

export const getTrollMessage = (path) => {
  const trollMessages = formatMessage(path);
  const i = Math.floor(Math.random() * (trollMessages.length - 0) + 0);
  return trollMessages[i];
}

export const typeIntervalParam = (args) => {
  return args['-i'] ? args['-i'] : 100;
}

export const debugParam = (args) => {
  return args['--debug'] || args['-D'] ? true : false;
}
