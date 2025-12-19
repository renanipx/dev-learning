import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "./services/userService";

createUser("Alice", "alice@email.com");
createUser("Bob", "bob@email.com");

console.log("Users:", getUsers());

updateUser(1, { name: "Alice Updated" });

deleteUser(2);

console.log("Final Users:", getUsers());
