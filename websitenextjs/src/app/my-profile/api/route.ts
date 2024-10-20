import { cookies } from "next/headers";//headers
import { NextRequest, NextResponse } from "next/server";

export function GET(yc: NextRequest) {

    console.log(">> Cookes >>", { cookies: cookies().get("city") }); // in cookie thong qua ten cách 1
    //set lại cookie
    cookies().set("ten", "gia tri") //cach 2

    // const reqHeaders = new Headers(yc.headers); // cách 1 get token
    // const newHewders = headers();//cach 2 get token
    // console.log(">>> Token >>  ", { token: reqHeaders.get("Authorization") }); // cách 1 get token
    // console.log(">>> Token 2  >>  ", { token: newHewders.get("Authorization") }); //cách 2 get token
    //trả heades
    // return new NextResponse("<h1>NextResponese</h1", {
    //     headers: {
    //         "Content-Type": "text/html"
    //     }
    // });
    // tra cookie
    return new NextResponse("<h1>NextResponese</h1", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "name=tan long, city=dx"
        }
    });
}