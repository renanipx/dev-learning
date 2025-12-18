import { fetchUsers } from './api';
import { formatAndValidateUser } from './utils';
import { User } from './types';

async function main() {
  const usersFromApi = await fetchUsers();

  const validatedUsers: User[] = usersFromApi.map((user) =>
    formatAndValidateUser(user)
  );

  console.log(validatedUsers);
}

main();
