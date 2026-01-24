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
      <div className="auth-card">
        {mode === "login" ? (
          <>
            <Login onSubmit={onAuthSuccess} />
            <div className="auth-footer">
              Don’t have an account?
              <button onClick={() => setMode("register")}>
                Register
              </button>
            </div>
          </>
        ) : (
          <>
            <Register onSubmit={onAuthSuccess} />
            <div className="auth-footer">
              Already have an account?
              <button onClick={() => setMode("login")}>
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
