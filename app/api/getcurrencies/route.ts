import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      "https://kratest.pesaflow.com/api/static/custom/currencies",
      { method: "GET" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch currencies: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      { message: "Success", currencies: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return NextResponse.json(
      { message: "Failed to fetch currencies", error: String(error) },
      { status: 500 }
    );
  }
}
