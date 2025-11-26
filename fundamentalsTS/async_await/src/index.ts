async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();

  } catch (error) {
    console.error("❌ Error on request:", error);
    return null;
  }
}

// Test the function
fetchData<any>("https://jsonplaceholder.typicode.com/users")
  .then(data => console.log(data));
