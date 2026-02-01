import { createContext, useEffect, useState } from "react"
import { loginService } from "../services/authService"

type User = {
  email: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // 🔁 Restore session
  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken)
      // Optional: Search for real user
      setUser({ email: "user@email.com" })
    }
  }, [])

  async function login(email: string, password: string) {
    const { token, user } = await loginService(email, password)

    localStorage.setItem("token", token)
    setToken(token)
    setUser(user)
  }

  function logout() {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
