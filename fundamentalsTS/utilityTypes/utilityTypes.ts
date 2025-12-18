// ------------------------------------------------------------
// Base type
// ------------------------------------------------------------
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
};

// ------------------------------------------------------------
// Utility Types required in the exercise
// ------------------------------------------------------------

// Partial — updating user with optional fields
type UpdateUser = Partial<User>;

// Pick — show only name and email
type UserNameEmail = Pick<User, "name" | "email">;

// Omit — remove password
type UserWithoutPassword = Omit<User, "password">;

// ------------------------------------------------------------
// Extra Utility Types from the lesson list
// ------------------------------------------------------------

// Required — all properties become required
type CompleteUser = Required<User>;

// Readonly — properties cannot be changed
type ReadonlyUser = Readonly<UserWithoutPassword>;

// ------------------------------------------------------------
// Example functions using these types
// ------------------------------------------------------------

// Update user partially
function updateUser(id: string, data: UpdateUser) {
  console.log("Updating user:", id, data);
}

// Show only name + email
function showUserBasicInfo(user: UserNameEmail) {
  console.log(`User: ${user.name} - ${user.email}`);
}

// Remove password from returned data
function sanitizeUser(user: User): UserWithoutPassword {
  const { password, ...rest } = user;
  return rest;
}

// Freeze user object — make it readonly
function freezeUser(user: UserWithoutPassword): ReadonlyUser {
  return Object.freeze(user);
}

// ------------------------------------------------------------
// Usage example
// ------------------------------------------------------------
const user: User = {
  id: "1",
  name: "Renan",
  email: "renan@mail.com",
  password: "1234",
};

// Partial update
updateUser(user.id, { email: "new@mail.com" });

// Show only name and email
showUserBasicInfo({ name: user.name, email: user.email });

// Remove password
const 
,
3
 = sanitizeUser(user);

// Make user readonly
const frozenUser = freezeUser(safeUser);

// frozenUser.name = "Another"; // ❌ Error: readonly property
