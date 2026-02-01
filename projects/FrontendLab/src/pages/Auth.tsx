import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Login } from "../components/Login/Login"
import { Register } from "../components/Register/Register"
import { useAuth } from "../hooks/useAuth"
import "../styles/auth.css"

type AuthMode = "login" | "register"

export function Auth() {
  const [mode, setMode] = useState<AuthMode>("login")
  const { token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate("/dashboard")
    }
  }, [token, navigate])

  const isLogin = mode === "login"

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? <Login /> : <Register />}

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
