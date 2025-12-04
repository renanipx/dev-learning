// -----------------------------
// Objects + Modern ES6
// -----------------------------

interface Address {
  street: string;
  city: string;
}

interface User {
  name: string;
  age: number;
  skills: string[];
  address: Address;
}

const user: User = {
  name: "Alice",
  age: 25,
  skills: ["JS", "TS", "React"],
  address: {
    street: "Main St",
    city: "New York",
  },
};

console.log("Original User:", user);


// -----------------------------------
// 1. Destructuring (object + array)
// -----------------------------------

const { name, age, address: { city } } = user;
const [skill1, skill2, ...otherSkills] = user.skills;

console.log("\nDestructuring:");
console.log("Name:", name);
console.log("City:", city);
console.log("Skill1:", skill1);
console.log("Skill2:", skill2);
console.log("Other skills:", otherSkills);


// -----------------------------------
// 2. Spread operator
// -----------------------------------

const updatedUser = {
  ...user,
  age: 26,
  skills: [...user.skills, "Node.js"],
};

console.log("\nSpread operator:");
console.log(updatedUser);


// -----------------------------------
// 3. Rest operator
// -----------------------------------

function showUser({ name, ...rest }: User) {
  console.log("\nRest operator:");
  console.log("Name:", name);
  console.log("Rest of user:", rest);
}

showUser(user);


// -----------------------------------
// 4. Shallow vs Deep Copy
// -----------------------------------

const shallowCopy = { ...user };
shallowCopy.address.city = "Los Angeles"; // Affects original!

console.log("\nShallow copy:");
console.log("Original city:", user.address.city);
console.log("Shallow copy city:", shallowCopy.address.city);

const deepCopy: User = JSON.parse(JSON.stringify(user));
deepCopy.address.city = "Miami"; // Independent!

console.log("\nDeep copy:");
console.log("Original city:", user.address.city);
console.log("Deep copy city:", deepCopy.address.city);


// -----------------------------------
// 5. Immutable object example
// -----------------------------------

const immutableUser: User = {
  ...user,
  skills: [...user.skills],
  address: { ...user.address },
};

const newUser = {
  ...immutableUser,
  age: immutableUser.age + 1,
};

console.log("\nImmutable example:");
console.log("Immutable user:", immutableUser);
console.log("New user:", newUser);
