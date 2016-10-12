#!/usr/bin/env node
//To run this file :  babel-node mkdir 'd/e/f'

require('./helper')
let fs = require('fs').promise;
let path = require('path');

function mkdir(dirPathArray, currentPath) {
  if (!dirPathArray || dirPathArray.length === 0) {
    return;
  }

  var dir = dirPathArray.shift();
  currentPath = currentPath + dir  + path.sep;
  fs.access(currentPath, function(error) {
    if (error) { // directory does not exist and create it
      fs.mkdir(currentPath, function(error) {
        if (!error) {
          mkdir(dirPathArray, currentPath);
        }
      });
    } else {
      mkdir(dirPathArray, currentPath);
    }
  });
}
async function main() {
  let dir = process.argv[2]||'a/b/c';
  let dirPathArray = dir.split('/');//[a,b,c]
  await mkdir(dirPathArray,'');
}
main();