// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let userWord = input.question("Enter a word: ");
   return userWord;
};

function simpleScorer(word) {
   return word.length;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints++;
      }
   }
   return letterPoints;
};

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
   }
   return letterPoints;
}

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(userWord) {
   console.log(`Which scoring algorithim would you like to use?
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system`);
   let userChoice = input.question('Enter 0, 1, or 2: ');
   console.log(`Score for ${userWord}: ${scoringAlgorithms[userChoice].scorerFunction(userWord)}`);
   return scoringAlgorithms[userChoice].scorerFunction;
}

function transform(pointStructure) {
   let transformedStructure = {};
   for (let key in pointStructure) {
      for (i = 0; i < pointStructure[key].length; i++) {
         transformedStructure[pointStructure[key][i].toLowerCase()] = Number(key);
      }
   }
   return transformedStructure;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   scorerPrompt(initialPrompt());
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
