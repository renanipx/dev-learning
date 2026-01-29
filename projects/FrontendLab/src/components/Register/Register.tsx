import { useState } from "react"
import { Input } from "../ui/Input/Input"
import { Button } from "../ui/Button/Button"

type RegisterData = {
  name: string
  email: string
  password: string
}

type RegisterProps = {
  onSubmit: (data: RegisterData) => void
}

export function Register({ onSubmit }: RegisterProps) {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  function handleChange(name: keyof RegisterData, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required")
      return
    }

    setError("")
    onSubmit(form)
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

      <Button type="submit">Create account</Button>
    </form>
  )
}
