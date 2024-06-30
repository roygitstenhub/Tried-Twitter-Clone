import Tweet from "../models/tweet.js"
import User from "../models/user.js"
import expressHandler from "express-async-handler"


//get user
export const getalluser = expressHandler(async (req, res) => {
    try {
        const user = await User.find()
        console.log(user)
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})


//get user
export const getUser = expressHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean()
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})


//update user
export const updateUser = expressHandler(async (req, res) => {
    try {
        const update_user = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        )
        res.status(200).json(update_user)
    } catch (err) {
        console.log(err)
    }
})

//delete user
export const deleteUser = expressHandler(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id).lean()
        await Tweet.deleteMany({ userId: req.params.id })
        res.status(200).json({
            message: "user deleted"
        })
    } catch (error) {
        console.log(error)
    }
})

export const followUser = expressHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.id)

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!currentUser) {
            return res.status(404).json({ error: "Current user not found" });
        }

        if (!user.followers.includes(req.body.id)) {
            await User.findByIdAndUpdate(req.params.id,
                { $push: { followers: req.body.id } }
            )
            await User.findByIdAndUpdate(req.body.id, { $push: { following: req.params.id } })
        }
        else {

            res.status(403).json("you already follow this user");
        }

        res.status(200).json({
            message: "following the user"
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
})

export const unfollowUser = expressHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
     
        const currentUser = await User.findById(req.body.id)

        if (!user) {
            res.status(404).json({ error: "No user found" })
        }

        if (!currentUser) {
            res.status(404).json({ error: "No user found" })
        }

        if (currentUser.following.includes(req.params.id)) {
            await User.findByIdAndUpdate(req.params.id, { $pull: { followers: req.body.id } });

            await User.findByIdAndUpdate(req.body.id, { $pull: { following: req.params.id } });

            res.status(200).json({ message: "user unfollowed" })
        } else {
            res.status(404).json({ message: "Not following this user" })
        }

    } catch (err) {
        console.log(err)
        res.status(401).json({ error: "Internal server error" })

    }
})