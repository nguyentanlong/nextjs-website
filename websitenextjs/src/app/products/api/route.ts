import { dsSanPham } from "@/app/data"
import { NextRequest, NextResponse } from "next/server"


// const dulieu = dsSanPham;
// lấy tất cả dữ liệu
export function GET(yeucau: NextRequest) {
    const data = dsSanPham;
    console.log(">>> request>>> ", { yeucau: yeucau.nextUrl.searchParams.get('page') });
    return NextResponse.json({ data }, { status: 200, statusText: "Get All thành công" })
}

// thêm mới dữ liệu
export async function POST(yeucau: NextRequest) {
    const spMoi = await yeucau.json()
    // console.log(">>> body>>> ", {spMoi});
    const dkThem = dsSanPham.find((item) => item.ten === spMoi.ten);
    if (!dkThem) {
        const id = Math.random();
        dsSanPham.push({
            ...spMoi,
            id
        })
        return NextResponse.json({ data: { ...spMoi, id } }, { status: 200, statusText: "Them thanh cong" })
    }
    if (yeucau == null) {
        return NextResponse.json({ data: null }, { status: 200, statusText: "San phẩm da co" })
    }//dsSanPham-data
}