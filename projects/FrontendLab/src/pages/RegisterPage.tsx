import { useNavigate } from "react-router-dom"
import { Register } from "../components/Register/Register"
import { useAuth } from "../hooks/useAuth"

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleRegister(data: {
    name: string
    email: string
    password: string
  }) {
    await register(data.name, data.email, data.password)
    navigate("/login")
  }

  return <Register onSubmit={handleRegister} />
}
