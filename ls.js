#!/usr/bin/env node
//To run this file :  babel-node ls --dir=node_modules
require('./helper')
let fs = require('fs').promise;
let path = require('path');
let {dir} = require('yargs')
  .default('dir', __dirname)
  .argv;

async function ls(rootPath) {
  console.log('Executing ls function...');
  let fileNames = await fs.readdir(rootPath);
  for (let fileName of fileNames) {
    let filePath = path.join(rootPath, fileName);
    fs.stat(filePath, function(err, stats) {
      try{
        if (stats&&stats.isFile()) {
          console.log(fileName);
        }else if(stats && stats.isDirectory()){
          console.log("directory : "+fileName);
        }
      }catch(e){
        console.log("error");
      }
    });

  }
}
async function main() {
  await ls(dir);
}
main();