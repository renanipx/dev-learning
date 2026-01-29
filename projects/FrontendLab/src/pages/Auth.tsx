import { useState } from "react"
import { Login } from "../components/Login/Login"
import { Register } from "../components/Register/Register"
import "../styles/auth.css"

type AuthProps = {
  onAuthSuccess: () => void
}

type AuthMode = "login" | "register"

export function Auth({ onAuthSuccess }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>("login")

  const isLogin = mode === "login"

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? (
          <Login onSubmit={onAuthSuccess} />
        ) : (
          <Register onSubmit={onAuthSuccess} />
        )}

        <div className="auth-footer">
          {isLogin ? (
            <>
              Don’t have an account?
              <button onClick={() => setMode("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button onClick={() => setMode("login")}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
