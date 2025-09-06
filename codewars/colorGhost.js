// Color Ghost
// Create a class Ghost

// Ghost objects are instantiated without any arguments.

// Ghost objects are given a random color attribute of "white" or "yellow" or "purple" or "red" when instantiated

// ghost = new Ghost();
// ghost.color //=> "white" or "yellow" or "purple" or "red"

let Ghost = function() {
  let dictionaryColors = ['white', 'yellow', 'purple', 'red'];  
  this.color = dictionaryColors[Math.floor(Math.random() * dictionaryColors.length)]
};