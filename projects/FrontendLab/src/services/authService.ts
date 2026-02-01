import { api } from "./api"

type LoginResponse = {
  token: string
  user: {
    email: string
  }
}

export async function loginService(
  email: string,
  password: string
) {
  const response = await api.post<LoginResponse>(
    "/login",
    { email, password }
  )

  return response.data
}
