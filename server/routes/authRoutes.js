import expresss from "express"
import { handleRegister, handleLogin, handleLogout } from "../controllers/authRoutes.js"

const router = expresss.Router()

router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/logout", handleLogout)


export default router