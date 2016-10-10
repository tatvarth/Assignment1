#!/usr/bin/env node
//To run this file : babel-node cat --file=catSample.txt
require('./helper')
let fs = require('fs').promise;
let path = require('path');
let {file} = require('yargs')
  .default('file', __dirname)
  .argv;

async function cat (fileName) {
    console.log('Executing cat function...for '+fileName);
    try {
        return await fs.readFile(fileName,'utf8');
    }
    catch (err) { console.error( err ) }
};


async function main() {
    let fileContent = await cat(file);
    console.log(fileContent);
}
main();
