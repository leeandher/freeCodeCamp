//Intermediate Algorithm Scripting

//A JS Script file of all my solutions to the freeCodeCamp Intermediate Algorithm Scripting challenges
//These can be found over at: https://www.freecodecamp.org/map > Front End Development Certification > Intermediate Algorithm Scripting
//Written by: Leander Rodrigues

//Sum all integers in a given range [arr]
function sumAll(arr) {
  var sum = 0;
  //Loop from lower number to higher number and sum incrementally
  //ex. sumAll([1,4]) and sumAll([4,1]) must both return 10
  for (var i = Math.min(...arr); i <= Math.max(...arr); i++) sum += i;
  return sum;
}

//Outputs an array of all exclusive items in arr1 and arr2 (in one array, not both)
function diffArray(arr1, arr2) {
  //Combines both arrays, then filters any entries that are not included in any individual array
  return arr1
  .concat(arr2)
  .filter(x => !arr1.includes(x) || !arr2.includes(x));
}

//Convert num to roman numerals
function convertToRoman(num) {
  //User input error catching
  if (num < 0 || num >= 5000) return 'Please enter a valid number (between 0 and 4999).';
  //Place values in roman numerals
  var numerals = [
    ['I','V'], //Ones
    ['X','L'], //Tens
    ['C','D'], //Hundreds
    ['M'] //Thousands
  ];
  var roman = '';
  //Convert num to an array of integers in ascending placevalue
  //ex. 3974 => [4, 7, 9, 3]
  var numArr = num.toString().split('').reverse().map(n => parseInt(n));
  //Loop through each place value and substitute correct numerals
  for (var i=0; i<numArr.length; i++) {
    if (i != 3) { 
      //Digits 0 to 3
      if (numArr[i] <= 3) roman = numerals[i][0].repeat(numArr[i]) + roman;
      //Digits 4 and 5
      else if (numArr[i] <= 5) roman = numerals[i][0].repeat(5-numArr[i]) + numerals[i][1] + roman;
      //Digits 6 to 8
      else if (numArr[i] <= 8) roman = numerals[i][1] + numerals[i][0].repeat(numArr[i]-5) + roman;
      //Digit 9
      else  roman = numerals[i][0] + numerals[i+1][0] + roman;
      //Handles the thousands placevalue
    } else roman = numerals[i][0].repeat(numArr[i]) + roman; 
  }
  return roman;
}

//Searches collection array of objects for items with source's properties
function whatIsInAName(collection, source) {
  //Filter the collection
  return collection.filter(function(item) {
    //Checks if every property is in/equal to item's set of properties
    return Object.keys(source).every(function(prop) {
      return source[prop] == item[prop];
    });
  });
}

//Replace before in str with after (with identical case)
function myReplace(str, before, after) {
  //Checks each character case from before
  before.split('').forEach(function(x,i){
    //Loops through all of after
    if (i < after.length) {
      //Change after's character to uppercase
      if (x.toUpperCase() == x) after = after.slice(0,i) + after[i].toUpperCase() + after.slice(i+1);
      //Change after's character to lowercase
      else after = after.slice(0,i) + after[i].toLowerCase() + after.slice(i+1);
    }
  });
  //Replace with new, case-sensitive after
  var re = new RegExp(before,'gi');
  return str.replace(re,after);
}

