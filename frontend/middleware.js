import { NextRequest, NextResponse } from "next/server";

export function middleware(req) {
    const allCookies = req.cookies;
    //console.log("all cookies: ", allCookies);
    //console.log("hello");
    return NextResponse.next();
}

export const config = {
    matcher: '/',
}