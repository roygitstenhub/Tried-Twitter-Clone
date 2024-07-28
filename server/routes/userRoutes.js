import express from "express"
import { deleteUser, followUser, getUser, unfollowUser, updateUser,getalluser } from "../controllers/userRoutes.js"
// import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/find/all",getalluser)

router.get("/find/:id",getUser)

router.put("/update/:id",updateUser)

router.delete("/:id",deleteUser)

router.put("/follow/:id",followUser)

router.put("/unfollow/:id",unfollowUser)

export default router