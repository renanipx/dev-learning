import { useState } from "react"
import { Login } from "./Login"
import { Register } from "./Register"
import "../styles/auth.css"

type AuthProps = {
  onAuthSuccess: () => void
}

type AuthMode = "login" | "register"

export function Auth({ onAuthSuccess }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>("login")

  return (
    <div className="auth-container">
      {mode === "login" ? (
        <>
          <Login onSubmit={onAuthSuccess} />
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setMode("register")}>
              Register
            </button>
          </p>
        </>
      ) : (
        <>
          <Register onSubmit={onAuthSuccess} />
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
