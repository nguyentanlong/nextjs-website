import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
// import { Post } from "@/app/config/models/Post";
import { NextRequest, NextResponse } from "next/server";

// lấy id cu the
export async function GET(yc: NextRequest, layId: { params: { postId: string } }) {
    await connectDB();
    try {
        const id = layId.params.postId
        const postDetail = await Post.findById(id)
        if (!postDetail) {
            return NextResponse.json({
                data: null,
                message: "Bai viet khong ton tai",
            }, { status: 500, statusText: "Khong co bai nay" })
        }
        return NextResponse.json({
            data: postDetail,
            message: "TC lay bai theo id",
        }, { status: 200, statusText: "Lay duoc 1 bai duy nhat" })
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

// cap nhat
export async function PUT(yc: NextRequest, layId: { params: { postId: String } }) {
    // await connectDB();
    try {
        const { ten, anh, moTaNgan, noiDung } = await yc.json();
        const id = layId.params.postId
        const post = await Post.findById(id)
        if (!post) {
            return NextResponse.json({
                data: null,
                message: "Ko lay 1 post de cap nhat",
            }, { status: 400, statusText: "Ko lay post duoc" })
        }
        const isExitTitle = await Post.findOne({ ten, _id: { $ne: id } });
        if (!isExitTitle) {
            const updated = await Post.findByIdAndUpdate(id, { ten, anh, moTaNgan, noiDung }, { new: true })
            return NextResponse.json({
                data: updated,
                message: "Cap nhat thanh cong",
            }, { status: 200, statusText: "thanh cong" })
        }
        return NextResponse.json({
            data: null,
            message: "Ten da ton tai"
        }, { status: 400, statusText: "Ten co roi" })
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

// xoa
export async function DELETE(yc: NextRequest, layId: { params: { postId: String } }) {
    // await connectDB();
    try {
        const { ten, anh, moTaNgan, noiDung } = await yc.json();
        const id = layId.params.postId
        const post = await Post.findById(id)
        if (!post) {
            return NextResponse.json({
                data: null,
                message: "Ko lay 1 post de cap nhat",
            }, { status: 400, statusText: "Ko lay post duoc" })
        }

        const deletePost = await Post.findByIdAndDelete(id)
        return NextResponse.json({
            data: deletePost,
            message: "Xoa thanh cong",
        }, { status: 200, statusText: "thanh cong" })

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