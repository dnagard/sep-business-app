import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { FinanceRequest } from "@/types/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const financeRequests: FinanceRequest[] = await prisma.financeRequest.findMany({
        select: {
          id: true,
          nextAction: true,
          department: true,
          budget: true,
          desiredBudget: true,
          reason: true,
          status: true,
          createdAt: true,
        },
      });
      res.status(200).json(financeRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching finance requests" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
