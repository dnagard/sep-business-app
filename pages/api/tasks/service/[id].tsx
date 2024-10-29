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
      const task = await prisma.serviceRequest.findUnique({
        where: { id: Number(id) },
      });
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching task" });
    }
  } else if (req.method === "PATCH") {
    const { planNote, nextAction } = req.body;
    try {
      const updatedTask = await prisma.serviceRequest.update({
        where: { id: Number(id) },
        data: { planNote, nextAction },
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
