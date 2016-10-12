#!/usr/bin/env node
//To run this file :  babel-node rm a/b/c
var fs = require('fs')
  , path = require('path')
  , _ = require('underscore');

/*function mkdir(dirPathArray, currentPath) {
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
}*/
async function rm(dirPath) {
  if (!dirPath || dirPath.length === 0) {
    return;
  }
  fs.access(dirPath, function(error) {
    if (error) { // directory does not exist and create it
      //let dirPathArray = dirPath.split('/');//[a,b,c]
     // await mkdir(dirPathArray,'');
      console.log("bad path : "+dirPath);
      return;
    }
  });
  fs.readdir(dirPath, function(err, files) {
    if (err) {
      console.log(err);
    } else {
      if (files.length === 0) {
        fs.rmdir(dirPath, function(err) {
          if (err) {
            console.log(err);
          } else {
            var parentPath = path.normalize(dirPath + '/..') + '/';
            if (parentPath != path.normalize(process.argv[2])) {
              rm(parentPath);
            }
          }
        });
      } else {
        _.each(files, function(file) {
          var filePath = dirPath + file;
          fs.stat(filePath, function(err, stats) {
            if (err) {
              console.log(err);
            } else {
              if (stats.isFile()) {
                fs.unlink(filePath, function(err) {
                  if (err) {
                    console.log(err);
                  }
                });
              }

              if (stats.isDirectory()) {
                rm(filePath + '/');
              }
            }
          });
        });
      }
    }
  });
}

async function main() {
  let dirPath = process.argv[2]||'/a/b/c';
  await rm(dirPath);
}
main();