import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { haversineDistance } from '@/lib/geo';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_development_key', {
  // @ts-ignore
  apiVersion: '2024-06-20',
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, addressId, orderType } = body;

    const menuItemIds = cart.items.map((i: any) => i.menuItemId);
    const dbItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds }, isActive: true },
      include: { variants: true },
    });

    if (dbItems.length !== cart.items.length) {
      return NextResponse.json({ error: 'Cart contains invalid or unavailable items' }, { status: 422 });
    }

    let serverSubtotal = 0;
    const lineItems: any[] = [];

    for (const cartItem of cart.items) {
      const dbItem = dbItems.find((d: any) => d.id === cartItem.menuItemId);
      if (!dbItem) throw new Error('MenuItem not found');

      const variant = dbItem.variants?.find((v: any) => v.id === cartItem.variantId);
      const unitPrice = Number(dbItem.basePrice) + (variant ? Number(variant.priceDelta) : 0);
      const itemTotal = unitPrice * cartItem.quantity;
      serverSubtotal += itemTotal;

      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: { name: dbItem.name, description: variant?.label || undefined },
          unit_amount: Math.round(unitPrice * 100),
        },
        quantity: cartItem.quantity,
      });
    }

    if (orderType === 'DELIVERY') {
      const address = await prisma.address.findUnique({ where: { id: addressId } });
      if (!address) return NextResponse.json({ error: 'Invalid address' }, { status: 422 });

      const dist = haversineDistance(51.5074, -0.1278, Number(address.lat), Number(address.lng));
      if (dist > 10) {
        return NextResponse.json({ error: 'Address outside 10-mile delivery radius' }, { status: 403 });
      }
    }

    const deliveryFee = orderType === 'DELIVERY' ? 2.99 : 0;
    const serverTotal = serverSubtotal + deliveryFee;

    const order = await prisma.order.create({
      data: {
        userId: 'test-user',
        type: orderType,
        status: 'PENDING_PAYMENT',
        subtotal: serverSubtotal,
        deliveryFee: deliveryFee,
        total: serverTotal,
        deliveryAddressId: addressId,
        items: {
          create: cart.items.map((item: any) => {
            const dbItem = dbItems.find((d: any) => d.id === item.menuItemId)!;
            const variant = dbItem.variants?.find((v: any) => v.id === item.variantId);
            const unitPrice = Number(dbItem.basePrice) + (variant ? Number(variant.priceDelta) : 0);
            return {
              menuItemId: item.menuItemId,
              variantId: item.variantId,
              quantity: item.quantity,
              unitPrice: unitPrice,
              totalPrice: unitPrice * item.quantity,
            };
          }),
        },
      },
    });

    const isTestMode = process.env.STRIPE_SECRET_KEY === 'sk_test_development_key' || !process.env.STRIPE_SECRET_KEY;

    if (isTestMode) {
      // Test Payment Flow: Redirect to a simulated checkout page
      return NextResponse.json({ 
        sessionId: 'test_session_' + order.id, 
        url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/checkout-demo?orderId=${order.id}`
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      metadata: {
        order_id: order.id,
        user_id: 'test-user',
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/order/confirmed?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?cancelled=1`,
      expires_at: Math.floor(Date.now() / 1000) + 1800,
    });

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
