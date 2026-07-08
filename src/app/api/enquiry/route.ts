import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/schema/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body against schema
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, phone, vehicleNumber, insuranceType, message } = result.data;

    // Save to PostgreSQL
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        vehicleNumber: vehicleNumber || null,
        insuranceType,
        message: message || null,
      },
    });

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error('API Enquiry error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
