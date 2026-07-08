import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { quoteSchema } from '@/schema/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request body
    const result = quoteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      email,
      vehicleType,
      vehicleMake,
      vehicleModel,
      registrationYear,
      insuranceType,
      previousPolicyExpiry,
      message,
    } = result.data;

    // Save to PostgreSQL
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        vehicleType,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        registrationYear: registrationYear || null,
        insuranceType,
        previousPolicyExpiry: previousPolicyExpiry || null,
        message: message || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, data: quoteRequest }, { status: 201 });
  } catch (error: any) {
    console.error('API Quote Request error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
