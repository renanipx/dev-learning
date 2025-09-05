// Create a function that accepts an array of names, and returns an array of each name with its first letter capitalized and the remainder in lowercase.

// Examples
// ["jo", "nelson", "jurie"] -->  ["Jo", "Nelson", "Jurie"]
// ["KARLY", "DANIEL", "KELSEY"] --> ["Karly", "Daniel", "Kelsey"]

function capMe(names) {

let array = [];
  for(let i=0; i<names.length;i++){
    array.push(names[i][0].toUpperCase() + names[i].slice(1).toLowerCase())    
  }
  
return array
  
}