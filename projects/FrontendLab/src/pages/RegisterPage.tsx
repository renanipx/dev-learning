import { useNavigate } from "react-router-dom"
import { Register } from "../components/Register/Register"

export function RegisterPage() {
  const navigate = useNavigate()

  function handleRegister(data: {
    name: string
    email: string
    password: string
  }) {
    console.log("Register data:", data)

    navigate("/login")
  }

  return <Register onSubmit={handleRegister} />
}
