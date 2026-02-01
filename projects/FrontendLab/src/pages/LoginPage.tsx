import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Login } from "../components/Login/Login"
import { useAuth } from "../hooks/useAuth"

export function LoginPage() {
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/dashboard")
    }
  }, [token, navigate])

  return <Login />
}
