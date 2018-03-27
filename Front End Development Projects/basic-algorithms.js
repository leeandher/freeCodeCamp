//Basic Algorithm Scripting

//A JS Script file of all my solutions to the freeCodeCamp Basic Algorithm Scripting challenges
//These can be found over at: https://www.freecodecamp.org/map > Front End Development Certification > Basic Algorithm Scripting
//Written by: Leander Rodrigues

//Reverses a string str
function reverseString(str) {
  //Split at every character into an array, reverse the array, join all array entries
  return str.split('').reverse().join('');
}

//Evaluate n factorial
function factorialize(n) {
  //Recursion until until n is 0
  return n == 0 ? 1 : n*factorialize(n-1);
}

//Checks if str is a palindrome
function palindrome(str) {
  //Front of string pointer
  var startStr = 0;
  //Back of string pointer
  var endStr = str.length-1;
  //Loops through half the string
  while (startStr<endStr) {
	//Skips invalid characters for front pointer
	while (str[startStr].match(/[\W_]/)) {
	  startStr++;
	  continue;
	}
	//Skips invalid characters for back pointer
	while (str[endStr].match(/[\W_]/)) {
	  endStr--;
	  continue;
	}
	//Checks if palindromic
	if(str[startStr].toLowerCase() != str[endStr].toLowerCase()) return false;
	//Repeat for next characters
	startStr++;
	endStr--;
  }
  return true;
}

//Finds length of the longest word in str
function findLongestWord(str) {
  //Split string into array
  str = str.split(' ');
  //Return last surviving entry, recursion ends here
  if (str.length == 1) return str[0].length;
  //Recursion process starts here
  if (str[0].length >= str[1].length) {
  //If first entry is shorter, remove and repeat
	str.splice(1,1);
	return findLongestWord(str.join(' '));
  } else {
  //If second entry is shorter, exclude and repeat
	return findLongestWord(str.splice(1, str.length-1).join(' '));
  }
}

//Puts str in Title Case format
function titleCase(str) {
  //RegExp matches any 
  return str.toLowerCase().replace(/(^|\s)\S/g,x => x.toUpperCase());
}

//Finds the largest numbers in an array set
function largestOfFour(arr) {
  var out = [];
  //Loops through, and finds the max in each array
  for(var i=0; i<arr.length; i++) {
	//Applies Math.max on arr via spread operator
	out.push(Math.max(...arr[i]));
  }
  return out;
}

//Checks if target is the end of str
function confirmEnding(str, target) {
  //Compares target to a substring ending of str
  return target === str.substr(-target.length);
}

//Repeats str num times if num is valid
function repeatStringNumTimes(str, num) {
  // returns empty if num is less than or equal to 0
  return num > 0 ? str.repeat(num): '' ;
}

//Truncates str to num characters with an ellipses (if num > 3)
function truncateString(str, num) {
  //Checks if truncation is needed, then checks if ellipses should add to length
  if (num < str.length) return str.slice(0, num > 3 ? num-3 : num) + '...';
  return str;
}

//Splits arr into smaller arrays of size length
function chunkArrayInGroups(arr, size) {
  var out = [];
  //Loop through array incrementing by size
  for (var i=0; i<arr.length; i+=size) {
	//Add sectioned array of size length
	out.push(arr.slice(i, i+size));
  }
  return out;
}
never tell odds, battles tstations, outrun askreddit, youtube haiku simulated vexil bexil jerk

//Removes howMany elements from the front of arr
function slasher(arr, howMany) {
  //Returns arr from howMany'th element
  return arr.slice(howMany);
}

//Checks if the letters from arr[1] are in arr[0]
function mutation(arr) {
  //Splits and lowers all of arr[1]
  return arr[1]
	.toLowerCase()
	.split('')
	.every(function(letter) {
	  //Checks if every letter is included in arr[0]
	  return arr[0]
		.toLowerCase()
		.includes(letter);
	});
}

//Remove all entries from arr which return false
function bouncer(arr) {
  // Filter each entry as a boolean
  return arr.filter(Boolean);
}

//Removes arguments[1] and onwards from arr (arguments[0])
function destroyer(arr) {
  //Create a sliceable array
  var args = Array.from(arguments).slice(1);
  //Filter arr as per args
  return arr.filter(val => !args.includes(val));
}

//Gets index location of num if num was in arr (and arr was in ascending order)
function getIndexToIns(arr, num) {
  //append num to arr
  arr[arr.length] = num;
  //Sort in ascending orer then get num's index
  return arr.sort((a,b) => a-b).indexOf(num);
}

//Perform a Caesarian cipher shift of 13 letters
function rot13(str) {
  return str
    .split('')
    //Identify and replace each char based on charCode (x)
    .map(function(char) {
      x = char.charCodeAt(0);
      //If char is not a capital letter -> do not change it
      if (x < 65 || x > 90) return String.fromCharCode(x);
      //If char is between A and M -> return 13 letters after
      else if (x >= 65 && x <= 77) return String.fromCharCode(x + 13);
      //If char is between N and Z -> return 13 letters before
      else return String.fromCharCode(x - 13);
    }).join('');
}