import { User } from './types';

export function formatAndValidateUser(raw: any): User {
  if (
    typeof raw.id !== 'number' ||
    typeof raw.name !== 'string' ||
    typeof raw.email !== 'string' ||
    !['admin', 'user'].includes(raw.role)
  ) {
    throw new Error('Invalid user data');
  }

  return {
    id: raw.id,
    name: raw.name.trim(),
    email: raw.email.toLowerCase(),
    role: raw.role,
    createdAt: raw.createdAt
      ? new Date(raw.createdAt)
      : new Date(),
  };
}
