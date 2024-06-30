import mongoose from "mongoose";

const database = async () => {
    try {

        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`connected mongoDB ${conn.connection.host}`)

    } catch (err) {
        console.log(`error roysten : ${err.message}`)
        process.exit(1)
    }
}
export default database