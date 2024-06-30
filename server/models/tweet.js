import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        max: 280,
    },
    likes: {
        type: Array,
        defaultValue: [],
    },
    pic:{ type:String },
},
    { timestamps: true })

const Tweet = new mongoose.model("Tweet", tweetSchema)

export default Tweet