import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_DB}`)
        // console.log("DB Connect success")
    } catch (error) {
        console.log("Faild DB Connect", error)
    }
}
export default connectDB