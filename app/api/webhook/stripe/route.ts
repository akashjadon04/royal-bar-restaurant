import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return new Response('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error: ' + err.message, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    if (!orderId) return new Response('Missing order_id', { status: 400 });

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID', stripePaymentId: session.payment_intent as string },
      }),
      prisma.orderStatusHistory.create({
        data: { orderId, status: 'PAID', note: 'Payment confirmed via Stripe' },
      }),
    ]);
  }

  return NextResponse.json({ received: true });
}
