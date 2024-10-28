import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { clientName, memo, eventType, fromDate, toDate, numAttend, budget, preferences } = req.body;

    try {
      const eventRequest = await prisma.eventRequest.create({
        data: {
          clientName,
          memo,
          eventType,
          fromDate: new Date(fromDate),
          toDate: new Date(toDate),
          numAttend,
          budget,
          decorations: preferences.decorations,
          parties: preferences.parties,
          photos: preferences.photos,
          meals: preferences.meals,
          drinks: preferences.drinks,
        },
      });

      res.status(201).json(eventRequest);
    } catch (error) {
      console.error("Error creating EventRequest:", error);
      res.status(500).json({ error: "Failed to create event request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
