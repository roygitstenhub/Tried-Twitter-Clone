import User from "../models/user.js"
import expressHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import genrateToken from "../utils/genrateToken.js"

//Register
export const handleRegister = expressHandler(async (req, res) => {

    const { email, password } = req.body

    const userExist = await User.findOne({ email: email }).lean()

    if (userExist) {
        res.status(400).json({ message: "user already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ ...req.body, password: hashPassword })

    if (user) {
        genrateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            following: user.following,
            followers: user.followers,
            profilePicture: user.profilePicture,
            message: "User Registered"
        })
    } else {
        res.status(400).json({ message: " Invalid user data " })
    }

})

//Login
export const handleLogin = expressHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).lean()

    if (!user) {
        res.status(400).json({ message: "user not exists" })
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        genrateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            following: user.following,
            followers: user.followers,
            profilePicture: user.profilePicture,
        })

    } else {
        res.status(404).json({ message: "Invaild Email or Password" })
    }

})

//Logout
export const handleLogout = expressHandler(async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "Logged out successfully"
    })
})

