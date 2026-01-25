import { useNavigate } from "react-router-dom"
import { Login } from "../components/Login/Login"

export function LoginPage() {
  const navigate = useNavigate()

  function handleLogin(data: { email: string; password: string }) {
    console.log("Login data:", data)

    navigate("/dashboard")
  }

  return <Login onSubmit={handleLogin} />
}
