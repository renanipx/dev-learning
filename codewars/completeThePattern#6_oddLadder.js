// Task:
// You have to write a function which creates the following odd-numbers staircase pattern up to the desired number of rows.

// If the input is <= 0, return an empty string
// If the input is even, round it down to the odd number that precedes it.
// There are no spaces in the pattern
// The lines are separated by a newline character (\n)
// Examples:
// pattern(9):

// 1
// 333
// 55555
// 7777777
// 999999999
// pattern(6):

// 1
// 333
// 55555

function pattern(n){
  if (n <= 0) return ''
  
  let output="1";
  for(let i=3; i<=n; i=i+2){
    output += '\n' + i.toString().repeat(i)
  }
  
  return output;
}