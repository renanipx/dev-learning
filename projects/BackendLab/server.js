import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3333
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"

// In-memory users
const users = [
  {
    id: 1,
    name: "Test User",
    email: "test@test.com",
    password: "123456",
  },
]

// LOGIN ENDPOINT
app.post("/login", (req, res) => {
  const { email, password } = req.body

  const user = users.find((u) => u.email === email)

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid credentials",
    })
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  return res.json({
    token,
    user: {
      email: user.email,
    },
  })
})

// REGISTER ENDPOINT
app.post("/register", (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" })
  }

  const exists = users.some((u) => u.email === email)
  if (exists) {
    return res.status(409).json({ message: "Email already registered" })
  }

  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1
  users.push({ id, name, email, password })

  return res.status(201).json({ message: "User registered successfully" })
})

app.listen(PORT, () => {
  console.log(`🚀 Auth API running on http://localhost:${PORT}`)
})
