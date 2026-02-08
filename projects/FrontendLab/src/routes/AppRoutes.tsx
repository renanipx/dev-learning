import { Routes, Route } from "react-router-dom"
import { Auth } from "../pages/Auth"
import { RegisterPage } from "../pages/RegisterPage"
import { Dashboard } from "../pages/Dashboard"
import { Layout } from "../components/Layout/Layout"
import { ProtectedRoute } from "./ProtectedRoute"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
