import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { team, activity, budget, personell, dueDate} = req.body;

    try {
      const serviceRequest = await prisma.serviceRequest.create({
        data: {
          team,
          activity,
          budget,
          personell,
          dueDate,
        },
      });

      res.status(201).json(serviceRequest);
    } catch (error) {
      console.error("Error creating serviceRequest:", error);
      res.status(500).json({ error: "Failed to create event request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
