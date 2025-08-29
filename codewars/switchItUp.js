// When provided with a number between 0-9, return it in words. Note that the input is guaranteed to be within the range of 0-9.

// Input: 1
// Output: "One".

function switchItUp(number){
  let dictionaryNumbers = {
    '0': 'Zero',
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',            
  }
  
  return dictionaryNumbers[number]
}