import Tweet from "../models/tweet.js"
import expressHandler from "express-async-handler"
import User from "../models/user.js"

export const createTweet = expressHandler(async (req, res) => {
    try {
        const tweet = await Tweet.create({ ...req.body })
        res.status(200).json(tweet)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})


export const deleteTweet = expressHandler(async (req, res) => {
    try {
        const tweet = Tweet.findById(req.params.id).lean()
        await tweet.deleteOne()
        res.status(200).json({ message: "Tweet deleted successully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})


export const likesOrDislikes = expressHandler(async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
        if (!tweet.likes.includes(req.body.id)) {
            await Tweet.findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.body.id } })
            res.status(200).json({ message: "Liked successully" })

        } else {
            await Tweet.findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.body.id } })
            res.status(200).json({ message: "Disliked successully" })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
})


export const getAllTweets = expressHandler(async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id)
        const userTweets = await Tweet.find({ userId: currentUser._id })

        const followersTweets = await Promise.all(
            currentUser.following.map((followerId) => {
                return Tweet.find({ userId: followerId });
            })
        )
        res.status(200).json(userTweets.concat(...followersTweets));
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
})


export const getUserTweet = expressHandler(async (req, res) => {
    try {
        const userTweet = await Tweet.find({ userId: req.params.id }).sort({ createdAt: -1 })
        res.status(200).json(userTweet)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "Internal server error"
        })
    }
})


export const exploreUserTweet = expressHandler(async (req, res) => {
    try {
        const exploreTweet = await Tweet.find({ likes: { $exists: true } }).sort({ likes: -1 })
        res.status(200).json(exploreTweet)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})
