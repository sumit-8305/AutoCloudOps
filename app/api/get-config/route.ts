import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get('email');
  
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }
  
      // Check if AWS credentials exist for the user
      const result = await sql`
        SELECT * FROM aws_credentials WHERE email = ${email};
      `;
  
      if (result.rowCount === 0) {
        return NextResponse.json({ credentialsExist: false }, { status: 200 });
      }
  
      return NextResponse.json({ credentialsExist: true, data: result.rows[0] }, { status: 200 });
    } catch (error) {
      // Use type guard to ensure error has message property
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }