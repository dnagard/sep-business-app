"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Task } from "@/types/types";

export default function EventList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchTasks() {
        try {
            let res : Response | null = null;
            if (user?.username?.startsWith("service")) {
                res = await fetch("/api/tasks/service/lists");
            } else if (user?.username?.startsWith("production")) {
                res = await fetch("/api/tasks/production/lists");
            } else {
                router.push("/");
                return;
            }

        if (res && !res.ok) {
          console.error("Failed to fetch tasks:", res.statusText);
          return;
        }

        const data = await res?.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          console.error("Unexpected data format:", data);
          setTasks([]); // fallback to an empty array if data isn't as expected
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, [user?.username, router]);

  const handleClick = (id: string) => {
    if (user?.username === "servicemanager") {
      router.push(`/servicemanager/tasks/${id}`);
    } else if (user?.username === "productionmanager") {
      router.push(`/productionmanager/tasks/${id}`);
    } else if (user?.username === "serviceteam") {
      router.push(`/serviceteam/${id}`);
    } else if (user?.username === "productionteam") {
      router.push(`/productionteam/${id}`);
    }
  };

  // Sort tasks so that highlighted ones appear at the top
  const sortedTasks = [...tasks].sort((a, b) => {
    const aHighlighted = a.nextAction === user?.username;
    const bHighlighted = b.nextAction === user?.username;
    return aHighlighted === bHighlighted ? 0 : aHighlighted ? -1 : 1;
  });

  return (
    <div className="event-list flex flex-col items-center">
      <h1 className="text-center font-bold text-3xl mb-4">Tasks</h1>

      {/* Header Row for Column Labels */}
      <div className="w-4/5 p-4 rounded-t-lg bg-blue-400">
        <div className="flex justify-between text-center font-semibold text-gray-700">
          <div className="flex-1">Team</div>
          <div className="flex-1">Activity</div>
          <div className="flex-1">Budget</div>
          <div className="flex-1">Staff Allocation</div>
          <div className="flex-1">Due Date</div>
        </div>
      </div>

      {/* Tasks List */}
      {sortedTasks.map((task, index) => (
        <div
          key={task.id}
          onClick={() => handleClick(String(task.id))}
          className={`m-0.5 event-item w-4/5 p-4 ${
            index === 0 ? "rounded-b-lg" : "rounded-lg" // rounded corners for the first and last items
          } cursor-pointer transition-all hover:shadow-lg hover:bg-orange-200 duration-300 ${
            index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          }`}
          style={{
            backgroundColor:
              task.nextAction === user?.username ? "lightyellow" : undefined,
          }}
        >
          <div className="flex justify-between items-center text-center">
            <div className="flex-1 text-gray-800">{task.team}</div>
            <div className="flex-1 text-gray-600">{task.activity}</div>
            <div className="flex-1 text-gray-600">
              {String(task.budget)}
            </div>
            <div className="flex-1 text-gray-600">
              {String(task.personell)}
            </div>
            <div className="flex-1 font-semibold text-gray-700">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
