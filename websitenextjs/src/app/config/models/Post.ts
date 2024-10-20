import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    ten: String,
    anh: String,
    moTaNgan: String,
    noiDung: String,
}, { timestamps: true })
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)
export default Post;