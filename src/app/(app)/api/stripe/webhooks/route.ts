import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import type { Stripe } from "stripe";
import config from "@payload-config";
import { TExpandedLineItem } from "@/types";

export async function POST(req: Request) {
  let e: Stripe.Event;

  try {
    e = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_KEY as string
    );
  } catch (error) {
    console.log(error);
    let errMess = error instanceof Error ? error.message : "Unknown Error";

    if (error! instanceof Error) {
      console.log("------------Error-------------");
      console.log(errMess);
    }
    return NextResponse.json(
      {
        message: `Webhook Error: ${errMess}`,
      },
      { status: 400 }
    );
  }
  console.log(`success ${e.id}`);

  const permitted: string[] = ["checkout.session.completed"];

  const payload = await getPayload({ config });

  if (permitted.includes(e.type)) {
    let data;

    try {
      switch (e.type) {
        case "checkout.session.completed":
          data = e.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) {
            throw new Error("User Id is Required!");
          }

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          if (!user) {
            throw new Error("User not found!");
          }

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            {
              expand: ["line_items.data.price.product"],
            }
          );

          if (
            !expandedSession.line_items?.data.length ||
            !expandedSession.line_items?.data
          ) {
            throw new Error("No Line Items Found!");
          }

          const lineItems = expandedSession.line_items
            .data as TExpandedLineItem[];

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                user: user.id,
                product: Number(item.price.product.metadata.id),
                name: item.price.product.metadata.name,
              },
            });
          }
          break;
        default:
          throw new Error(`Unhandled Error ${e.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Webhook handler failed",
        },
        {
          status: 500,
        }
      );
    }
  }
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
