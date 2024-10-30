import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { StaffRequest } from "@/types/types";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const staffRequests: StaffRequest[] = await prisma.staffRequest.findMany({
        select: {
          id: true,
          nextAction: true,
          department: true,
          currStaff: true,
          requiredStaff: true,
          reason: true,
          status: true,
          createdAt: true
        },
      });
      res.status(200).json(staffRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching staff requests" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
