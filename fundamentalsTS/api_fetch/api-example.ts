// ==============================
// Types
// ==============================
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id?: number;
  name: string;
  email: string;
  address: Address;
}

// ==============================
// Helper: Handle HTTP errors
// ==============================
function handleHttpError(response: Response): void {
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
}

// ==============================
// GET: Fetch all users
// ==============================
async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    handleHttpError(res);

    const users: User[] = await res.json();
    console.log("All users:", users);
    return users;
  } catch (error) {
    console.error("GET error:", error);
    return [];
  }
}

// ==============================
// POST: Create new user
// ==============================
async function createUser(user: User): Promise<User | null> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    handleHttpError(res);

    const created: User = await res.json();
    console.log("User created:", created);
    return created;
  } catch (error) {
    console.error("POST error:", error);
    return null;
  }
}

// ==============================
// PUT: Replace entire user
// ==============================
async function updateUser(id: number, user: User): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    handleHttpError(res);

    const updated: User = await res.json();
    console.log("User updated (PUT):", updated);
    return updated;
  } catch (error) {
    console.error("PUT error:", error);
    return null;
  }
}

// ==============================
// PATCH: Update fields partially
// ==============================
async function patchUser(id: number, data: Partial<User>): Promise<User | null> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    handleHttpError(res);

    const updated: User = await res.json();
    console.log("User updated (PATCH):", updated);
    return updated;
  } catch (error) {
    console.error("PATCH error:", error);
    return null;
  }
}

// ==============================
// DELETE: Remove user
// ==============================
async function deleteUser(id: number): Promise<void> {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    });

    handleHttpError(res);
    console.log(`User ${id} deleted. Status:`, res.status);
  } catch (error) {
    console.error("DELETE error:", error);
  }
}

// ==============================
// Filter users by city + map data
// ==============================
async function filterUsersByCity(city: string): Promise<void> {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    handleHttpError(res);

    const users: User[] = await res.json();

    const result = users
      .filter(user => user.address.city === city)
      .map(user => ({
        name: user.name,
        email: user.email,
        city: user.address.city
      }));

    console.log(`Users from ${city}:`, result);

  } catch (error) {
    console.error("Filter error:", error);
  }
}

// ==============================
// Example Calls
// ==============================
(async () => {
  await getUsers();

  await createUser({
    name: "Renan",
    email: "renan@example.com",
    address: {
      street: "Main St",
      suite: "Apt 1",
      city: "South Christy",
      zipcode: "12345"
    }
  });

  await updateUser(1, {
    name: "Updated Name",
    email: "updated@email.com",
    address: {
      street: "New Street",
      suite: "Apt 99",
      city: "New City",
      zipcode: "00000"
    }
  });

  await patchUser(1, { name: "Partially Updated Name" });

  await deleteUser(1);

  await filterUsersByCity("South Christy");
})();
