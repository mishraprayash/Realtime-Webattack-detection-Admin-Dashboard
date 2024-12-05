import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const allThreats = await prisma.activity.findMany({
      where:{
        category:"MALICIOUS"
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(allThreats);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch threats' }, { status: 500 });
  }
};