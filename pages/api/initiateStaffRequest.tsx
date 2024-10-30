import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      department,
      currStaff,
      requiredStaff,
      reason,
      status
    } = req.body;

    try {
      const staffRequest = await prisma.staffRequest.create({
        data: {
          department,
          currStaff,
          requiredStaff,
          reason,
          status,
        },
      });

      res.status(201).json(staffRequest);
    } catch (error) {
      console.log("Error creating StaffRequest:", error);
      res.status(500).json({ error: "Failed to create staff request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
