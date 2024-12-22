import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const adminToken = request.cookies.get("token");
    if (!adminToken || adminToken?.value !== "admintoken") {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "admin" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error happened" },
      { status: 500 }
    );
  }
}
