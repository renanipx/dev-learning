// Custom Math Utility Module

function add(a, b) {
  validateNumbers(a, b);
  return a + b;
}

function subtract(a, b) {
  validateNumbers(a, b);
  return a - b;
}

function multiply(a, b) {
  validateNumbers(a, b);
  return a * b;
}

function divide(a, b) {
  validateNumbers(a, b);
  if (b === 0) throw new Error("Division by zero is not allowed.");
  return a / b;
}

function validateNumbers(...args) {
  if (!args.every(num => typeof num === "number")) {
    throw new Error("All arguments must be numbers.");
  }
}

module.exports = { add, subtract, multiply, divide };
