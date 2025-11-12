import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Received data:", body);

    //     Received data: {
    //   prohibited_items: 'yes',
    //   restricted_items: 'yes',
    //   duty_free: 'no',
    //   commercial: 'no',
    //   dutable: 'yes',
    //   gifts: 'yes',
    //   currency_exceeding: 'no',
    //   personal_goods: 'no',
    //   mobile_device: 'yes',
    //   mining_equipment: 'no',
    //   reimportation: 'yes'
    // }

    // filter values with "yes" as a dictionary and return them in an array like below

    // [{   "prohibited_items": "yes"},
    //     {"restricted_items": "yes"},
    //         {"dutable": "yes"},
    //         {"gifts": "yes"},
    //         {"mobile_device": "yes"},
    //         {"reimportation": "yes"}
    //     }]

    const filteredData = Object.entries(body)
      .filter(([key, value]) => value === "yes")
      .map(([key, value]) => ({ [key]: key }));

    console.log("Filtered data:", filteredData);

    // const list_items = filteredData.map((item, index) => {
    //   const key = Object.keys(item)[0];
    //   return {
    //     id: `item_${index + 1}`,
    //     title: key.replace(/_/g, " ").toUpperCase(),
    //     description: `Add ${key.replace(/_/g, " ")}`,
    //   };
    // });
    // console.log("List items:", list_items);
    // await sendListMessage(body.waba, list_items);

    return NextResponse.json(
      { message: "Success", data: filteredData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during create entity process:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

import axios from "axios";

const access_token = process.env.ACCESS_TOKEN;
const phone_number_id = process.env.PHONE_NUMBER_ID;
async function sendListMessage(
  recipient_phone: string,
  list_items: { id: string; title: string; description: string }[]
) {
  console.log("Sending list message to:", recipient_phone);
  console.log("access_token:", access_token);
  console.log("phone_number_id:", phone_number_id);

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${phone_number_id}/messages`,
      {
        messaging_product: "whatsapp",
        to: recipient_phone,
        type: "interactive",
        interactive: {
          type: "list",
          body: {
            text: "Choose a category to add items",
          },
          footer: {
            text: "Select from the options below",
          },
          action: {
            button: "Select",
            sections: [
              {
                title: "Category",
                rows: list_items,
              },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message sent successfully:", response.data);
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
}
