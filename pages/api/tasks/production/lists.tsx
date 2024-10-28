import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Task } from "@/types/types";

const prisma = new PrismaClient();

export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
if (req.method === "GET") {
    try {
    const events: Task[] = await prisma.productionRequest.findMany({
        select: {
        id: true,
        nextAction: true,
        team: true,
        activity: true,
        budget: true,
        personell: true,
        dueDate: true,
        planNote: true,
        createdAt: true,
        },
    });
    res.status(200).json(events);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching service task" });
    }
} else {
    res.status(405).json({ error: "Method not allowed" });
}
}
