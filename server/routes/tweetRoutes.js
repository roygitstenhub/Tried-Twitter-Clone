import expresss from "express"
import verifyToken from "../middleware/verifyToken.js"
import { createTweet, deleteTweet, exploreUserTweet, getAllTweets, getUserTweet, likesOrDislikes } from "../controllers/tweetRoutes.js"

const router = expresss.Router()

router.post("/",createTweet)

router.delete("/:id", verifyToken, deleteTweet)

router.put("/:id/like", likesOrDislikes)

router.get("/user/all/:id",getUserTweet)

router.get("/timeline/:id",getAllTweets)

router.get("/explore",exploreUserTweet)

export default router