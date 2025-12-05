// ----- Closure -----
function createCounter() {
  let count = 0; // private variable

  return {
    increment: () => ++count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount());  // 1


// ----- Array Methods -----
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);         // [2, 4, 6, 8, 10]
const evens = numbers.filter(n => n % 2 === 0);  // [2, 4]
const firstBig = numbers.find(n => n > 3);       // 4
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15

numbers.forEach(n => console.log(`Number: ${n}`));


// ----- Destructuring -----
const user = { name: "Renan", age: 25 };
const { name, age } = user;

const coords = [10, 20];
const [x, y] = coords;


// ----- Arrow Functions -----
const greet = person => `Hello, ${person}!`;
console.log(greet(name));


// ----- Template Literals -----
const message = `User ${name} is ${age} years old.`;


// ----- let / const -----
let mutable = 10;
mutable = 20;

const constantValue = 5;
// constantValue = 10; // ❌ not allowed


// ----- Spread Operator -----
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1,2,3,4]

const userCopy = { ...user };

console.log(message);
console.log(combined);
