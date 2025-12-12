// 1. Generic in Functions
function identity<T>(value: T): T {
  return value;
}

const idNumber = identity(10);
const idString = identity("Renan");
const idObject = identity({ id: 1, name: "Test" });

// 2. Generic in Interfaces
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const userResponse: ApiResponse<{ name: string }> = {
  data: { name: "Renan" },
  success: true,
};

const numbersResponse: ApiResponse<number[]> = {
  data: [1, 2, 3],
  success: true,
};

// 3. Generics in Arrays
function getFirst<T>(items: T[]): T {
  return items[0];
}

const firstNum = getFirst([10, 20, 30]);
const firstText = getFirst(["a", "b", "c"]);

// 4. paginate<T>(items: T[])
function paginate<T>(items: T[], pageSize: number = 2): T[][] {
  const pages: T[][] = [];

  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }

  return pages;
}

const paginatedNumbers = paginate([1, 2, 3, 4, 5], 2);
const paginatedUsers = paginate(
  [
    { id: 1, name: "Renan" },
    { id: 2, name: "Ana" },
    { id: 3, name: "João" }
  ],
  2
);
