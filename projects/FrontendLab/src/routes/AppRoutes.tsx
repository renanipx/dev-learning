import { Routes, Route } from "react-router-dom"
import { Auth } from "../pages/Auth"
import { Dashboard } from "../pages/Dashboard"
import { Layout } from "../components/Layout/Layout"
import { ProtectedRoute } from "./ProtectedRoute"

type AppRoutesProps = {
  isAuthenticated: boolean
  onAuthSuccess: () => void
}

export function AppRoutes({
  isAuthenticated,
  onAuthSuccess,
}: AppRoutesProps) {
  return (
    <Routes>
      {/* INITIAL ROUTE */}
      <Route path="/" element={<Auth onAuthSuccess={onAuthSuccess} />} />

      {/* PROTECTED ROUTE */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
