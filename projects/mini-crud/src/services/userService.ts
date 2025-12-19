import { users, nextId } from "../data/users";
import { User } from "../models/User";

export function createUser(name: string, email: string): User {
  const newUser: User = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  return newUser;
}

export function getUsers(): User[] {
  return users;
}

export function updateUser(
  id: number,
  data: Partial<Omit<User, "id">>
): User | null {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  Object.assign(user, data);
  return user;
}

export function deleteUser(id: number): boolean {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;

  users.splice(index, 1);
  return true;
}
