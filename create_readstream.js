const fs = require('fs');
// The Readline module provides a way of reading a datastream, one line at a time.
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream(`${__dirname}/indiv18/by_date/itcont_2018_20020411_20170529.txt`),
  // input: fs.createReadStream(`${__dirname}/indiv18/itcont.txt`),
  // crlfDelay: Infinity,
});

// get line count for file
let lineCount = 0;

// create array list of names
const names = [];

rl.on('line', function(line) {
  // increment line count
  lineCount++;

  // get all names
  const name = line.split('|')[7].trim();
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
