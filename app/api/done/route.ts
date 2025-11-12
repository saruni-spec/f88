import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received data:", body);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
