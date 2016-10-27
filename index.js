#! /usr/bin/env node
if(process.NODE_ENV === 'dev') {
  require("babel-register");
  require('./src/trollolo');
} else {
  require('./build/trollolo');
}
