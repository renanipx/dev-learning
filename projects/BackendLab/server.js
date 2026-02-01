import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3333
const JWT_SECRET = process.env.JWT_SECRET

// Fake user 
const fakeUser = {
  id: 1,
  email: "test@test.com",
  password: "123456",
}

// LOGIN ENDPOINT
app.post("/login", (req, res) => {
  const { email, password } = req.body

  if (
    email !== fakeUser.email ||
    password !== fakeUser.password
  ) {
    return res.status(401).json({
      message: "Invalid credentials",
    })
  }

  const token = jwt.sign(
    { id: fakeUser.id, email: fakeUser.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  )

  return res.json({
    token,
    user: {
      email: fakeUser.email,
    },
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Auth API running on http://localhost:${PORT}`)
})
