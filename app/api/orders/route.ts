import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: { include: { menuItem: true } },
        statusHistory: true,
      },
      orderBy: { createdAt: 'desc' },
    });

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
    let user = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });
    
    if (!user) {
       user = await prisma.user.findFirst({ where: { email: 'admin@royalbar.com' }});
    }

    if (!user) {
      return NextResponse.json({ error: "No user found to attach order" }, { status: 400 });
    }

    // Prepare order items
    // First, resolve slugs/names to menuItem ids
    const orderItemsData = [];
    for (const item of items) {
       let menuItem = await prisma.menuItem.findFirst({ where: { name: item.name }});
       if (menuItem) {
          orderItemsData.push({
             menuItemId: menuItem.id,
             quantity: item.quantity,
             unitPrice: item.price,
             totalPrice: item.price * item.quantity
          });
       }
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        type: "DELIVERY",
        status: "PENDING",
        subtotal: total - 3, // Subtract fees temporarily
        deliveryFee: 2.50,
        tip: 0,
        total: total,
        items: {
          create: orderItemsData
        }
      }
    });

    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
