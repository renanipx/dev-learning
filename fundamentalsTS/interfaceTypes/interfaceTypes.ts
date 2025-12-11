// -----------------------------
// INTERFACES
// -----------------------------

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

interface Order {
  id: number;
  user: User;
  products: Product[];
  total: number;
  createdAt: Date;
}


// -----------------------------
// INTERFACE EXTENSION
// -----------------------------

interface AdminUser extends User {
  permissions: string[];
}


// -----------------------------
// TYPES (UNION & INTERSECTION)
// -----------------------------

type UserRole = "ADMIN" | "CUSTOMER" | "GUEST";

type Timestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type OrderWithStatus = Order & {
  status: "PENDING" | "PAID" | "SHIPPED";
} & Timestamps;


// -----------------------------
// EXAMPLES OF USAGE
// -----------------------------

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const admin: AdminUser = {
  id: 99,
  name: "Super Admin",
  email: "admin@example.com",
  isAdmin: true,
  permissions: ["DELETE_USER", "MANAGE_PRODUCTS"],
};

const product: Product = {
  id: 10,
  name: "Keyboard",
  price: 120,
  inStock: true,
};

const order: OrderWithStatus = {
  id: 501,
  user,
  products: [product],
  total: 120,
  status: "PAID",
  createdAt: new Date(),
  updatedAt: new Date(),
};
