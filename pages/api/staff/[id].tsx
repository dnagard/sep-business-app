import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const staffRequest = await prisma.staffRequest.findUnique({
        where: { id: Number(id) },
      });
      if (!staffRequest) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.status(200).json(staffRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching staff request" });
    }
  } else if (req.method === "PATCH") {
    const { status, nextAction } = req.body;
    try {
      const updatedStaffRequest = await prisma.staffRequest.update({
        where: { id: Number(id) },
        data: { status, nextAction },
      });
      res.status(200).json(updatedStaffRequest);
    } catch (error) {
      console.log("PATCH error:", error);
      res.status(500).json({ error: "Error updating staff request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
