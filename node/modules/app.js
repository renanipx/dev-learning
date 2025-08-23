// Importing custom module
const math = require('./math');
// OR destructure directly:
// const { add, subtract, multiply, divide } = require('./math');

// Using custom module functions
try {
  console.log("Addition:", math.add(5, 3));          // 8
  console.log("Subtraction:", math.subtract(10, 4)); // 6
  console.log("Multiplication:", math.multiply(6, 7)); // 42
  console.log("Division:", math.divide(20, 5));     // 4
  console.log("Division by zero:", math.divide(10, 0)); // Error
} catch (error) {
  console.error("Math Error:", error.message);
}

// Importing native module
const path = require('path');
console.log("Current file:", path.basename(__filename));
console.log("Current directory:", path.dirname(__filename));
