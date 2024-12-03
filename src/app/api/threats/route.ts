import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const threats = await prisma.securityThreat.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(threats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch threats' }, { status: 500 });
  }
}