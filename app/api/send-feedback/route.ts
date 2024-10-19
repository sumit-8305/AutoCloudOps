// app/api/send-feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  // Validate input
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  // Instead of sending an email, return a message
  return NextResponse.json({ message: 'This feature is not accessible right now.' }, { status: 200 });
}
