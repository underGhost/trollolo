#! /usr/bin/env node
if(process.env.NODE_ENV == 'dev') {
  console.log('********* DEVELOPER MODE *********');
  require("babel-register");
  require('./src/trollolo');
} else {
  require('./build/trollolo');
}
