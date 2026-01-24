import { useState } from "react"
import { Login } from "./Login"
import { Register } from "./Register"

type AuthMode = "login" | "register"

export function Auth() {
  const [mode, setMode] = useState<AuthMode>("login")

  function handleLogin(data: { email: string; password: string }) {
    console.log("Login:", data)
  }

  function handleRegister(data: {
    name: string
    email: string
    password: string
  }) {
    console.log("Register:", data)
  }

  return (
    <div>
      {mode === "login" ? (
        <>
          <Login onSubmit={handleLogin} />
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setMode("register")}>
              Register
            </button>
          </p>
        </>
      ) : (
        <>
          <Register onSubmit={handleRegister} />
          <p>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>
              Login
            </button>
          </p>
        </>
      )}
    </div>
  )
}
