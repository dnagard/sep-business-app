import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { TableEvent } from '@/types/types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const events : TableEvent[] = await prisma.eventRequest.findMany({
        select: {
          id: true,
          clientName: true,
          eventType: true,
          fromDate: true,
          toDate: true,
          status: true,
          nextAction: true,
          createdAt: true
        },
      });
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching events' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
