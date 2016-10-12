#!/usr/bin/env node
//To run this file :  babel-node mkdir happyDir
require('./helper')
let fs = require('fs').promise;
let dir = process.argv[2];

 function rm(dirName) {
       fs.mkdir(dirName,function(){
       });

}
 function main() {
   rm(dir);
}
main();