import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
// import { Post } from "@/app/config/models/Post";
import { NextRequest, NextResponse } from "next/server";

// thêm vào database
export async function POST(yc: NextRequest) {
    await connectDB();
    try {
        const { ten, moTaNgan } = await yc.json();
        // console.log(">>>  ", ten, "  >>>  ", moTaNgan);
        const isExit = await Post.findOne({ ten });
        // console.log(">>>  isExit", isExit, "  >>  ", typeof (isExit)); // [], object
        if (!isExit) {
            const newPost = await Post.create({ ten, moTaNgan });
            return NextResponse.json({
                data: newPost,
                message: "Thanh Cong Them"
            }, { status: 201, statusText: "Da tao thanh cong" })
        }
        return NextResponse.json({
            data: null,
            message: "Ten da ton tai"
        }, { status: 400, statusText: "Ten co roi" })
        // return new NextResponse("hello")
    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "That Bai Them"
        }, { status: 400, statusText: "Khong tao được" })
    }
}

// lấy tất cả từ database
export async function GET(yc: NextRequest) {
    // await connectDB();
    try {
        // const { ten, moTaNgan } = await yc.json();
        // console.log(">>>  ", ten, "  >>>  ", moTaNgan);
        // const isExit = await Post.findOne({ ten });
        // console.log(">>>  isExit", isExit, "  >>  ", typeof (isExit)); // [], object
        // if (!isExit) {
        const limit = yc.nextUrl.searchParams.get("limit") ?? 2//thực tế 10 sp
        const page = yc.nextUrl.searchParams.get("page") ?? 1
        const totalPost = await Post.countDocuments();
        const totalPage = Math.ceil(totalPost / +limit);

        const allPost = await Post.find().skip((+page - 1) * +limit).limit(+limit);
        return NextResponse.json({
            data: allPost,
            message: "Thanh Cong lay 1 trang",
            meta: {
                totalPage,
                totalCount: totalPost
            }
        }, { status: 200, statusText: "lay 1 trang thanh cong" })
        // }
        // return NextResponse.json({
        //     data: null,
        //     message: "Ten da ton tai"
        // }, { status: 400, statusText: "Ten co roi" })
        // return new NextResponse("hello")
    } catch (error) {
        return NextResponse.json({
            data: null,
            message: "That Bai Them",
        }, { status: 400, statusText: "Khong tao được" })
    }
}