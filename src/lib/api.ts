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

async function fetchAttackCount() {
  const categoryCounts = await prisma.activity.groupBy({
    by: ['attackType'],
    _count: {
      category: true,
    },    
  });

  return categoryCounts;
}

fetchAttackCount().then((data) => {

});