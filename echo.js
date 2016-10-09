#!/usr/bin/env node

require('./helper')
function echo(arg) {
    console.log(arg);
}
echo(process.argv[2]);
