// -----------------------------
// 1. Primitive Types
// -----------------------------
let username: string = "Renan";
let age: number = 28;
let isAdmin: boolean = false;
let nothingHere: null = null;
let notAssigned: undefined = undefined;
let productId: bigint = 500n;
let uniqueKey: symbol = Symbol("unique");

// -----------------------------
// 2. Type Inference (automatic)
// -----------------------------
let city = "São Paulo";    // inferred: string
let temperature = 29;       // inferred: number
let isLogged = true;        // inferred: boolean

// -----------------------------
// 3. Functions with explicit types
// -----------------------------
function sum(a: number, b: number): number {
  return a + b;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

function createUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}

// -----------------------------
// 4. Functions with implicit return types
// -----------------------------
function greet(name: string) {
  return `Hello, ${name}!`;  // inferred return: string
}

function multiplyByTen(value: number) {
  return value * 10;         // inferred return: number
}

function startsWithVowel(word: string) {
  return /^[aeiou]/i.test(word); // inferred return: boolean
}
