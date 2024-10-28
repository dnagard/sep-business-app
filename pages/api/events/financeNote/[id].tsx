import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* This API is for the finance manager to add his feedback to the event 
details and forward the request to the admin manager */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PATCH") {
      const { finNote } = req.body;
      const nextAction = "adminmanager";
    try {
      const updatedEvent = await prisma.eventRequest.update({
        where: { id: Number(id) },
        data: { finNote, nextAction },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.log("PATCH error:", error);
      res.status(500).json({ error: "Error updating event" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
