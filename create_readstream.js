const fs = require('fs');
// The Readline module provides a way of reading a datastream, one line at a time.
const readline = require('readline');
const stream = require('stream');

const inputStream = fs.createReadStream('test.txt');
const outputStream = new stream();
const rl = readline.createInterface(inputStream, outputStream);

// get line count for file
let lineCount = 0;

rl.on('line', function(line) {
  // increment line count
  lineCount++;
});

rl.on('close', function() {
  // total line count
  console.log('Total line count is: ', lineCount);
});
