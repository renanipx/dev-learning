// Given a random non-negative number, you have to return the digits of this number within an array in reverse order.

// Example (Input => Output):
// 35231 => [1,3,2,5,3]
// 0     => [0]

function digitize(n) {
  let stringNumber = n.toString();
  let array = [];
  for(let i=stringNumber.length-1; i>=0; i--){
    array.push(Number(stringNumber[i]));
  }

  return array;  
}