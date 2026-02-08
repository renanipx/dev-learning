import { useState } from "react"
import { loginService, registerService } from "../services/authService"
import { AuthContext, type User } from "./auth"

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const initialToken = localStorage.getItem("token")
  const [token, setToken] = useState<string | null>(initialToken)
  const [user, setUser] = useState<User | null>(
    initialToken ? { email: "user@email.com" } : null
  )

  const isAuthenticated = !!token

  // 🔐 LOGIN (authenticates user)
  async function login(email: string, password: string) {
    const { token, user } = await loginService(email, password)

    localStorage.setItem("token", token)
    setToken(token)
    setUser(user)
  }

  // 📝 REGISTER (does NOT authenticate)
  async function register(
    name: string,
    email: string,
    password: string
  ) {
    await registerService(name, email, password)
    // no token, no user, no auth
  }

  // 🚪 LOGOUT
  function logout() {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
