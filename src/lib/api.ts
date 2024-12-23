import {prisma} from '@/lib/prisma';

export async function fetchActivities() {
  const activities = await prisma.activity.findMany({
    where:{
      category:"MALICIOUS"
    },
    select:{
      ip:true,
      attackType:true,
      createdAt:true
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });
  return activities
}
