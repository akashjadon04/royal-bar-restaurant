import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName, phone } = await req.json();

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 200 });
    }

    const existingUser = db.users.findUnique(email);

    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already in use' }, { status: 200 });
    }

    const user = db.users.create({
      email,
      passwordHash: password, // Store plainly for mock DB
      firstName,
      lastName,
      role: 'CUSTOMER'
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 200 });
  }
}
