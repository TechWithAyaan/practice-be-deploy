import express from 'express'
import userRoutes from 'src/routes/userRoutes.js'
import authRoutes from 'src/routes/authRoutes.js'
import dns from "node:dns"
// import { errorMiddlware } from './middleware/errorMiddleware.js'

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])

const app = express()
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
}); 

// middleware -->
app.use(express.json())

// auth routes -->
app.use("/api/auth", authRoutes)

// userRoute -->
app.use("/api/user", userRoutes)


// app.use(errorMiddlware)

export default app