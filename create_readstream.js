const fs = require('fs');
// The Readline module provides a way of reading a datastream, one line at a time.
const readline = require('readline');

const rl = readline.createInterface({
  // input: fs.createReadStream(`${__dirname}/indiv18/by_date/itcont_2018_20020411_20170529.txt`),
  input: fs.createReadStream(`${__dirname}/indiv18/itcont.txt`),
  // crlfDelay: Infinity,
});

// get line count for file
let lineCount = 0;

// create array list of names
const names = [];

// donations occuring in each month
const donationsMap = new Map();

// list of firstnames and most common firstnames
const firstnameMap = new Map();

rl.on('line', function(line) {
  // increment line count
  lineCount++;

  // get all names
  const name = line.split('|')[7].trim();
  if (lineCount === 431 || lineCount === 43242) {
    names.push(name);
  }

  // year and month
  const timestamp = line.split('|')[4].slice(0, 6);
  const formattedTimestamp = `${timestamp.slice(0, 4)}-${timestamp.slice(4, 6)}`;
  donationsMap.has(formattedTimestamp)
    ? donationsMap.set(formattedTimestamp, donationsMap.get(formattedTimestamp) + 1)
    : donationsMap.set(formattedTimestamp, 1)

  // get all firstnames
  const firstHalfOfName = name.split(', ')[1];
  if (firstHalfOfName !== undefined) {
    let firstname;
    firstHalfOfName.trim();

    if (firstHalfOfName.includes(' ')) {
      firstname = firstHalfOfName.split(' ')[0].trim();
    } else {
      firstname = firstHalfOfName;
    }
    firstnameMap.has(firstname)
      ? firstnameMap.set(firstname, firstnameMap.get(firstname) + 1)
      : firstnameMap.set(firstname, 1)
  }
});

rl.on('close', () => {
  // total line count
  console.log('Total line count is: ', lineCount);

  // names at various points in time
  console.log('432nd name: ', names[0]);
  console.log('43243rd name: ', names[1]);

  // number of donations in each month
  console.log('Number of donations: ', donationsMap);

  // most common firstnames and number of times it occurs
  let name = '', max = 0;
  for ([key, value] of firstnameMap.entries()) {
    if (value > max) {
      max = value;
      name = key;
    }
  }
  console.log(
    'Most common firstname: ', name, '\n',
    'Number of occurence: ', max,
  );
});
