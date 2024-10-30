import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { department, budget, desiredBudget, reason, status } = req.body;

    try {
      const eventRequest = await prisma.staffRequest.create({
        data: {
          department,
          budget,
          desiredBudget,
          reason,
          status,
        },
      });

      res.status(201).json(eventRequest);
    } catch (error) {
      console.error("Error creating FinanceRequest:", error);
      res.status(500).json({ error: "Failed to create finance request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
