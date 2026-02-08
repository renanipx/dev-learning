import { Register } from "../components/Register/Register"
import { useNavigate } from "react-router-dom"
import "../styles/auth.css"

export function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <div className="auth-card">
        <Register />

        <div className="auth-footer">
          <>
            Already have an account?
            <button onClick={() => navigate("/")}>Login</button>
          </>
        </div>
      </div>
    </div>
  )
}
