import { useState } from "react"
import { Input } from "../ui/Input/Input"
import { Button } from "../ui/Button/Button"

type LoginData = {
  email: string
  password: string
}

type LoginProps = {
  onSubmit: (data: LoginData) => void
}

export function Login({ onSubmit }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in</h2>

      <Input
        type="email"
        value={email}
        placeholder="Email"
        onChange={setEmail}
      />

      <Input
        type="password"
        value={password}
        placeholder="Password"
        onChange={setPassword}
      />

      <Button type="submit">Sign in</Button>
    </form>
  )
}
