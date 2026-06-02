import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

interface BookingRequest {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
  fullName: string;
  phone: string;
}

const roomTypeNames: Record<string, string> = {
  'deluxe-suite': 'Deluxe Suite',
  'executive-corridor': 'Executive Corridor Room',
  'garden-villa': 'Garden Villa',
};

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    const { checkIn, checkOut, adults, children, roomType, fullName, phone } = body;

    if (!checkIn || !checkOut || !fullName || !phone || !roomType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Calculate number of nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

    // Create formatted email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #d4af37 0%, #e5c158 100%); color: #000; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 16px; font-weight: bold; color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
            .info-item { background-color: #f9f9f9; padding: 15px; border-radius: 6px; border-left: 4px solid #d4af37; }
            .info-label { font-size: 12px; color: #999; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
            .info-value { font-size: 16px; color: #333; font-weight: 500; }
            .highlight { background-color: #fffacd; padding: 15px; border-radius: 6px; border-left: 4px solid #ffc107; margin: 15px 0; }
            .footer { text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
            .button { display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #e5c158 100%); color: #000; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Booking Confirmation</h1>
              <p>Your luxury retreat awaits at Aberash Hotel</p>
            </div>

            <div class="section">
              <div class="section-title">Guest Information</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Guest Name</div>
                  <div class="info-value">${fullName}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Contact Number</div>
                  <div class="info-value">${phone}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Stay Details</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Check-in Date</div>
                  <div class="info-value">${checkInDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Check-out Date</div>
                  <div class="info-value">${checkOutDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Number of Nights</div>
                  <div class="info-value">${nights} ${nights === 1 ? 'Night' : 'Nights'}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Room Type</div>
                  <div class="info-value">${roomTypeNames[roomType] || roomType}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Guests</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Adults</div>
                  <div class="info-value">${adults}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Children</div>
                  <div class="info-value">${children}</div>
                </div>
              </div>
            </div>

            <div class="highlight">
              <strong>⏰ Next Steps:</strong> Our team will contact you shortly to confirm your booking, discuss special preferences, and answer any questions you may have.
            </div>

            <div style="text-align: center;">
              <p style="color: #666; margin: 15px 0;">Thank you for choosing Aberash Hotel for your stay.</p>
            </div>

            <div class="footer">
              <p>Aberash Hotel &copy; 2024 • Luxury Hospitality | All Rights Reserved</p>
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'aberashhotel@gmail.com',
      subject: `New Booking Request from ${fullName}`,
      html: htmlContent,
      replyTo: phone,
    });

    console.log('Email sent:', info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: 'Booking request sent successfully',
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process booking request',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
