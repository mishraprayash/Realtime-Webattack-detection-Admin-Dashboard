import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request:NextRequest){
    try {
        const token = cookies().get('token');
        if(!token){
            return NextResponse.redirect('/', {status: 302})
        }
        cookies().delete('token');
        return NextResponse.json({message: "Logged out successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}