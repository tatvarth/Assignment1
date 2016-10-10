#!/usr/bin/env node
// To run this file : babel-node echo 'hello' 
require('./helper')
function echo(arg) {
    console.log(arg);
}
echo(process.argv[2]);
