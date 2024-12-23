import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const totalRequestCount = await prisma.activity.count();
    const totalMaliciousRequest = await prisma.activity.count({
      where:{
        category:"MALICIOUS"
      }
    })
    const totalMaliciousRequestToday = await prisma.activity.count({
      where:{
        category:"MALICIOUS",
        // within 24 hrs
        createdAt:{
          gte:new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        }
      }
    })
    const totalNormalRequestToday = await prisma.activity.count({
      where:{
        category:"NORMAL",
        // within 24 hrs
        createdAt:{
          gte:new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
        }
      }
    })
    return NextResponse.json({totalRequestCount,totalMaliciousRequest,totalMaliciousRequestToday,totalNormalRequestToday});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
};
