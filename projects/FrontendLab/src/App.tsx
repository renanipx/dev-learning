import { useState } from "react"
import { Layout } from "./components/Layout/Layout"
import { Auth } from "./pages/Auth"

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
      <h2>Dashboard</h2>
    </Layout>
  )
}

export default App
