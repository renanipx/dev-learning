import { BrowserRouter, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AppRoutes } from "./routes/AppRoutes"

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  function handleAuthSuccess() {
    setIsAuthenticated(true)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  return (
    <AppRoutes
      isAuthenticated={isAuthenticated}
      onAuthSuccess={handleAuthSuccess}
    />
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
