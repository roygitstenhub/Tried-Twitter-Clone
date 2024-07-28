import express from "express"
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import database from "./database/dbconfig.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser"
import tweetRoutes from "./routes/tweetRoutes.js"
import cors from "cors"

const PORT = process.env.PORT || 8000

database()

const app = express()

app.set("view engine", "ejs")

app.use(cors({
    origin:"http://localhost:5000",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

app.use(express.json())
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({ extended: true }))


app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/tweet",tweetRoutes)

// app.use(express.static(path.join(__dirname, '/dist')))

app.get("/", (req, res) => {
    res.send("you have completed your project setup.")
})

app.listen(PORT,
    console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`)
)