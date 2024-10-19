import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  try {
    const {email, username, awsAccessKey, awsSecretKey } = await request.json();

    if (!awsAccessKey || !awsSecretKey || !username || !email) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Insert AWS credentials into the PostgreSQL database
    await sql`
      INSERT INTO aws_credentials ( email, username ,aws_access_key, aws_secret_key)
      VALUES (${email}, ${username},${awsAccessKey}, ${awsSecretKey});
    `;

    return NextResponse.json({ message: 'AWS credentials saved successfully!' }, { status: 200 });
  } catch (error) {
    // Handle the error safely
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
