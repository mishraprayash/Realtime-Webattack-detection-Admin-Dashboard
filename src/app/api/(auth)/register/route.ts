import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(request:NextRequest){
    try {
        const {email,username,password} = await request.json();
        if(!email || !username || !password){
            return NextResponse.json({error:"Please provide all fields"},{status:404});
        }
        const userCount = await prisma.user.count();
        if(userCount>0){
            return NextResponse.json({error:"Admin already exists"},{status:404});
        }
        const user = await prisma.user.create({
            data:{
                email,
                username,
                password
            }
        });
        if(!user){
            return NextResponse.json({error:"Couldnot register"},{status:404});
        }
        return NextResponse.json({message:"Registration successful"},{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:"Internal server error"},{status:500});
    }
}