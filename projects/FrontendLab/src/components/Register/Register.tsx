import { useState } from "react"
import { Input } from "../ui/Input/Input"
import { Button } from "../ui/Button/Button"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import type { AxiosError } from "axios"

type RegisterData = {
  name: string
  email: string
  password: string
}

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(name: keyof RegisterData, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError("")
    setSuccess("")

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError("Invalid email")
      return
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)
    register(form.name, form.email, form.password)
      .then(() => {
        setSuccess("User registered successfully. You can now login.")
        setTimeout(() => navigate("/"), 1000)
      })
      .catch((err) => {
        const axiosErr = err as AxiosError<{ message?: string }>
        const msg = axiosErr.response?.data?.message || "Registration failed. Please try again."
        setError(msg)
      })
      .finally(() => setLoading(false))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <Input
        value={form.name}
        placeholder="Name"
        onChange={(value) => handleChange("name", value)}
      />

      <Input
        type="email"
        value={form.email}
        placeholder="Email"
        onChange={(value) => handleChange("email", value)}
      />

      <Input
        type="password"
        value={form.password}
        placeholder="Password"
        onChange={(value) => handleChange("password", value)}
      />

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">{success}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </Button>
    </form>
  )
}
