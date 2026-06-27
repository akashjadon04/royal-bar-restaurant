import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = db.orders.findMany(session.user.id);

    return NextResponse.json({ success: true, data: orders });
  } catch (error) {
    console.error('Orders API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { items, total } = await req.json();

    // Find a random user or anonymous
    let user = db.users.findMany()[0];
    
    if (!user) {
      return NextResponse.json({ error: "No user found to attach order" }, { status: 400 });
    }

    // Prepare order items
    const orderItemsData = items.map((item: any) => ({
       menuItemId: item.id,
       name: item.name,
       quantity: item.quantity,
       unitPrice: item.price,
       totalPrice: item.price * item.quantity
    }));

    const order = db.orders.create({
      userId: user.id,
      type: "DELIVERY",
      status: "PENDING",
      subtotal: total - 3,
      deliveryFee: 2.50,
      total: total,
      items: orderItemsData
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
