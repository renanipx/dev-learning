import { createContext, useEffect, useState } from "react"

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

  // 🔁 Session persistence
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      setUser({ email: "user@email.com" }) // mock
    }
  }, [])

  async function login(email: string, password: string) {
    // 🔧 API simulation
    const fakeToken = "fake-jwt-token"

    localStorage.setItem("token", fakeToken)
    setToken(fakeToken)
    setUser({ email })
  }

  function logout() {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
