import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received data:", body);

    const items = [
      {
        type: "restricted_items",
        hscode: "93019010",
        description: "Fully automatic shotguns",
        quantity: 4,
        value: 4444,
        currency: "BRL",
      },
      {
        type: "restricted_items",
        hscode: "85434010",
        description: "Electronic cigarettes",
        quantity: 5,
        value: 4533,
        currency: "BRL",
      },
    ];

    //convert the items to a redeable string format
    const itemsString = items
      .map(
        (item, index) =>
          `Item ${index + 1}:\nType: ${item.type}\nHS Code: ${
            item.hscode
          }\nDescription: ${item.description}\nQuantity: ${
            item.quantity
          }\nValue: ${item.value} ${item.currency}\n`
      )
      .join("\n");

    console.log("Items String:", itemsString);

    return NextResponse.json(
      { message: "Success", itemsString, items },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
