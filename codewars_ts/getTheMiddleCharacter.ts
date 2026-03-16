// You are going to be given a non-empty string. Your job is to return the middle character(s) of the string.

// If the string's length is odd, return the middle character.
// If the string's length is even, return the middle 2 characters.
// Examples:
// "test" --> "es"
// "testing" --> "t"
// "middle" --> "dd"
// "A" --> "A"

export function getMiddle(s:string) {
  let sIndex : number = Math.trunc(s.length/2);
  return s.length % 2  == 0 ? s.slice(sIndex-1, sIndex+1) : s.slice(sIndex, sIndex +1);
}