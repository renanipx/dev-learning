import { User } from './types';

export async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Alice',
          email: 'alice@email.com',
          role: 'admin',
          createdAt: new Date('2024-01-01'),
        },
        {
          id: 2,
          name: 'Bob',
          email: 'bob@email.com',
          role: 'user',
          createdAt: new Date('2024-02-10'),
        },
      ]);
    }, 500);
  });
}
