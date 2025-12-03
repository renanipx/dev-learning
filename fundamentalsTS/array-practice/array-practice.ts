const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 22, active: true },
  { id: 4, name: "Diana", age: 28, active: true },
];

// 1. Filter: get only active users
const activeUsers = users.filter(user => user.active);

// 2. Map: transform names to uppercase
const uppercasedNames = activeUsers.map(user => user.name.toUpperCase());

// 3. Reduce: sum ages of active users
const totalAge = activeUsers.reduce((sum, user) => sum + user.age, 0);

// 4. Find: find a user by id
const foundUser = users.find(user => user.id === 3);

// 5. Some: check if there is any inactive user
const hasInactive = users.some(user => !user.active);

// 6. Every: check if all users are adults
const allAdults = users.every(user => user.age >= 18);

console.log({ activeUsers, uppercasedNames, totalAge, foundUser, hasInactive, allAdults });
