import { useState } from "react"
import { Layout } from "./components/Layout/Layout"
import { Auth } from "./pages/Auth"
import { Users } from "./pages/Users"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleLogin() {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleLogin} />
  }

  return (
    <Layout>
      <Users />
      <h2>Dashboard</h2>
    </Layout>
  )
}

export default App
