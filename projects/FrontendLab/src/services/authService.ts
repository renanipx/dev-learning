import { api } from "./api"

/* =====================
   TYPES
===================== */

type LoginResponse = {
  token: string
  user: {
    email: string
  }
}

type RegisterResponse = {
  message: string
}

/* =====================
   SERVICES
===================== */

// 🔐 LOGIN (returns token + user)
export async function loginService(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", {
    email,
    password,
  })

  return response.data
}

// 📝 REGISTER (only creates user)
export async function registerService(
  name: string,
  email: string,
  password: string
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/register", {
    name,
    email,
    password,
  })

  return response.data
}
