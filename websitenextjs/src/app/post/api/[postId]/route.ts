import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
// import { Post } from "@/app/config/models/Post";
import { NextRequest, NextResponse } from "next/server";

// lấy id cu the
export async function GET(yc: NextRequest, layId: { params: { postId: String } }) {
    // await connectDB();
    try {
        const id = layId.params.postId
        const postDetail = await Post.findById(id)
        if (!postDetail) {
            return NextResponse.json({
                data: postDetail,
                message: "Thanh Cong lay 1 trang",
            }, { status: 200, statusText: "lay 1 trang thanh cong" })
        }
        return NextResponse.json({
            data: null,
            message: "Bai viet khong ton tai",
        }, { status: 400, statusText: "ko lay duoc id bai viet" })
        // }
        // return NextResponse.json({
        //     data: null,
        //     message: "Ten da ton tai"
        // }, { status: 400, statusText: "Ten co roi" })
        // return new NextResponse("hello")
    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "Ko lay chi tiet duoc",
        }, { status: 400, statusText: "Khong tao được" })
    }
}