import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Setup nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
        user: process.env.EMAIL_USER, // Your Yahoo email address
        pass: process.env.EMAIL_PASS, // Your Yahoo app password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Feedback from ${name}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Feedback sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending feedback:', error); // Log the error
    return NextResponse.json({ error: 'Failed to send feedback', details: error.message }, { status: 500 });
  }
}
