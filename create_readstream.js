const fs = require('fs');
// The Readline module provides a way of reading a datastream, one line at a time.
const readline = require('readline');
const stream = require('stream');

const inputStream = fs.createReadStream('test.txt');
const outputStream = new stream();
const rl = readline.createInterface(inputStream, outputStream);

// get line count for file
let lineCount = 0;

// create array list of names
const names = [];

rl.on('line', function(line) {
  // increment line count
  lineCount++;

  // get all names
  const name = line.split('|')[7];
  if (lineCount === 431 || lineCount === 43242) {
    names.push(name);
  }
});

rl.on('close', function() {
  // total line count
  console.log('Total line count is: ', lineCount);

  // names at various points in time
  console.log('432nd name: ', names[0]);
  console.log('43243rd name: ', names[1]);
});
