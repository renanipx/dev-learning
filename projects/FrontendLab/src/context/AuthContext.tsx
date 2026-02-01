import { createContext, useEffect, useState } from "react"
import { loginService, registerService } from "../services/authService"

type User = {
  email: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const isAuthenticated = !!token

  // 🔁 Restore session on reload
  useEffect(() => {
    const storedToken = localStorage.getItem("token")

    if (storedToken) {
      setToken(storedToken)
      // Temporary mock user (replace later with /me)
      setUser({ email: "user@email.com" })
    }
  }, [])

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
