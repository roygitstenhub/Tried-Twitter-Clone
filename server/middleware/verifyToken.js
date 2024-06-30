import jwt from "jsonwebtoken"
import expressHandler from "express-async-handler"
import User from "../models/user.js"

const verifyToken = expressHandler(async (req, res, next) => {

    let token
    token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()

        } catch (error) {
            res.status(401).json({
                message: "Not authorized, token failed"
            })
        }
    } else {
        res.status(401).json({
            message: "Not authorized , No token"
        })
    }

})

export default verifyToken