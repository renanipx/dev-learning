import { useState } from "react"

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
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

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Create account</button>
    </form>
  )
}
