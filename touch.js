#!/usr/bin/env node
//To run this file : babel-node touch --file=catSample.txt
//stat catSample.txt
require('./helper')
let fs = require('fs').promise;
let path = require('path');
let {file} = require('yargs')
  .default('file', __filename)
  .argv;



async function touch (fileName) {
    console.log('Executing touch function...for '+fileName);
   fs.open(fileName, "w+",function(err,fd){
     let date = new Date();
     let mtime = date.getTime();
      fs.futimes(fd,mtime,function(){
        console.log("time modified : "+mtime);
     });
  });
};


async function main() {
    await touch(file);
}
main();
