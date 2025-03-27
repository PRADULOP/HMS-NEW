import express from "express"
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"


const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())


// api endpoints
app.use("/apis/user", userRouter)
app.use("/apis/admin", adminRouter)
app.use("/apis/doctor", doctorRouter)


app.listen(port, () => console.log(`Server started on PORT:${port}`))