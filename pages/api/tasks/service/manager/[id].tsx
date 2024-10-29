import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PATCH") {
    const { nextAction } = req.body;
    try {
      const updatedTask = await prisma.serviceRequest.update({
        where: { id: Number(id) },
        data: { nextAction },
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.log("PATCH error:", error);
      res.status(500).json({ error: "Error updating task" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
