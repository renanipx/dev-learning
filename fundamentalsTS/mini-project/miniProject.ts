// ================================
// Types
// ================================
interface Address {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

// ================================
// Helper: simulate loading delay
// ================================
function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ================================
// Fetch with loading + error handling
// ================================
async function fetchWithLoading(url: string): Promise<any> {
  try {
    console.log("Loading...");

    // simulate loading
    await wait(1000);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("✔ Loaded!");
    return data;

  } catch (error: any) {
    console.error("❌ Error fetching data:", error.message);
    return null;
  }
}

// ================================
// Format results
// ================================
function formatUsers(users: User[]): string[] {
  return users.map(user => {
    return `Name: ${user.name} | Email: ${user.email} | City: ${user.address.city}`;
  });
}

// ================================
// Main function
// ================================
async function run() {
  const URL = "https://jsonplaceholder.typicode.com/users";

  const users = await fetchWithLoading(URL);

  if (!users) {
    console.log("Could not load users.");
    return;
  }

  const formatted = formatUsers(users);

  console.log("=== Formatted Users ===");
  formatted.forEach(line => console.log(line));
}

// run mini-project
run();
