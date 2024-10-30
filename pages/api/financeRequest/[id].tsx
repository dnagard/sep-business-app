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
      const finRequest = await prisma.financeRequest.findUnique({
        where: { id: Number(id) },
      });
      if (!finRequest) {
        return res.status(404).json({ error: "Finance Request not found" });
      }
      res.status(200).json(finRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching event" });
    }
  } else if (req.method === "PATCH") {
    const { status, nextAction } = req.body;
    try {
      const updatedFinRequest = await prisma.financeRequest.update({
        where: { id: Number(id) },
        data: { status, nextAction },
      });
      res.status(200).json(updatedFinRequest);
    } catch (error) {
      console.log("PATCH error:", error);
      res.status(500).json({ error: "Error updating finance request" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
