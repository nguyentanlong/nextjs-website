import { dsSanPham } from "@/app/data"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"

// lấy tất cả dữ liệu
export function GET(yeucau: Request, layId: any) {
    const idSP = layId?.params?.productId;//productId là [productId]
    // console.log(">>> Check context: >>>   ", { layId });
    // console.log(">>> Check idSP: >>>   ", { idSP }); kieu undefined
    const data = dsSanPham.find((item) => item.id === +idSP)
    if (data) { //kiểm tra dữ liệu có hay không
        return NextResponse.json({ data }, { status: 200, statusText: "Get SP theo id thành công" })

    }
    // trường hợp ko có dữ liệu dang bị lỗi
    redirect("product/api");
    // else {
    //     return NextResponse.json({
    //         data: {
    //             message: `ko có sp có id`,
    //             data: "ko co sp"
    //         }
    //     }, { status: 404, statusText: "Get SP theo id THẤT BẠI" })
    // }

}


// update dữ liệu
export async function PATCH(yeucau: Request, layId: any) {
    const dsId = layId?.params?.productId;//productId là [productId]
    // console.log(">>> Check context: >>>   ", { layId });
    // console.log(">>> Check idSP: >>>   ", { idSP }); kieu undefined
    const idCapNhat = dsSanPham.findIndex((item) => item.id === parseInt(dsId))
    console.log(typeof (idCapNhat), ">>>  ", idCapNhat);
    const updateId = await yeucau.json();
    if (idCapNhat !== -1 && idCapNhat) { //kiểm tra dữ liệu có hay không
        dsSanPham[idCapNhat].ten = updateId.ten ? updateId.ten : dsSanPham[idCapNhat].ten
        dsSanPham[idCapNhat].gia = updateId.gia ? updateId.gia : dsSanPham[idCapNhat].gia
        return NextResponse.json({
            data: {
                message: `Update success`,
                data: dsSanPham[idCapNhat]
            }
        }, { status: 200, statusText: "Update Success" })
    }
    // trường hợp ko có dữ liệu dang bị lỗi
    else {
        return NextResponse.json({
            data: {
                message: `ko có sp có id`
            }
        }, { status: 404, statusText: "San pham khong co" })
    }

}

// delete dữ liệu
export async function DELETE(yeucau: Request, layId: any) {
    const dsId = layId?.params?.productId;//productId là [productId]
    // console.log(">>> Check context: >>>   ", { layId });
    // console.log(">>> Check idSP: >>>   ", { idSP }); kieu undefined
    const idXoa = dsSanPham.findIndex((item) => item.id === parseInt(dsId))
    console.log(typeof (idXoa), ">>>  ", idXoa);
    //const updateId = await yeucau.json();//request body
    if (idXoa !== -1 && idXoa) { //kiểm tra dữ liệu có hay không
        const deleteProduct = dsSanPham[idXoa]
        dsSanPham.splice(idXoa, 1)
        return NextResponse.json({
            data: {
                message: `Delete success`,
                data: deleteProduct
            }
        }, { status: 200, statusText: "Delete Success" })
    }
    // trường hợp ko có dữ liệu dang bị lỗi
    else {
        return NextResponse.json({
            data: {
                message: `ko có sp có id`
            }
        }, { status: 404, statusText: "San pham khong co" })
    }

}