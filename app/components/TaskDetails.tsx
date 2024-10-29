"use client";
//TODO: Switch this logic to task view
import { useEffect, useState } from "react";
import { Task } from "@/types/types";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function EventDetails() {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams() as { id: string };

  const { user } = useUser();
  const router = useRouter();

  /* API call for data */
  useEffect(() => {
    async function fetchTask() {
      try {
        let res: Response | null = null;
        if (user?.username?.startsWith("service")) {
          res = await fetch(`/api/tasks/service/${id}`);
        } else if (user?.username?.startsWith("production")) {
          res = await fetch(`/api/tasks/production/${id}`);
        } else {
          router.push("/");
          return;
        }

        if (res && !res.ok) {
          console.error("Failed to fetch tasks:", res.statusText);
          return;
        }

        const data = await res?.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTask();
  }, [user?.username, router, id]);

  if (!task) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Task Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
              <strong>Team:</strong> {task.team}
            </div>
            <div className="mb-4">
              <strong>Activity:</strong> {task.activity}
            </div>
            {/* TODO: Add tooltip for currency exchange */}
            <div className="mb-4">
              <strong>Budget:</strong> {task.budget} SEK
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <div className="mb-4">
              <strong>Personell Allocation:</strong> {task.personell}
            </div>
            <div className="mb-2">
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            {task.planNote && (
              <div className="mt-4">
                <strong>Plan Note:</strong> {task.planNote}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
