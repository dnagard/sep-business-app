import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const event = await prisma.eventRequest.findUnique({
        where: { id: Number(id) },
      });
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching event" });
    }
  } else if (req.method === 'PATCH') {
    const { status, nextAction } = req.body;
    try {
      const updatedEvent = await prisma.eventRequest.update({
        where: { id: Number(id) },
        data: { status, nextAction },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.log('PATCH error:', error);
      res.status(500).json({ error: 'Error updating event' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
