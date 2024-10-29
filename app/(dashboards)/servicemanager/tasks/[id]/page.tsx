"use client";
//TODO: Switch this logic to service manager
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Task } from "@/types/types";
import TaskDetails from "@/app/components/TaskDetails";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ServiceManagerDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
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

  // If task is not loaded yet, show loading message
  if (!task) return <p>Loading...</p>;

  const handleCloseIssue = async () => {
    try {
      const res = await fetch(`/api/tasks/service/manager/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextAction: "none" }),
      });

      if (res.ok) {
        setIsSuccessPopupOpen(true);
        setTimeout(() => {
          setIsSuccessPopupOpen(false);
          router.push("/viewTasks");
        }, 2500);
      } else {
        alert("Failed to update plan note.");
      }
    } catch (error) {
      console.error("Error updating plan note:", error);
      alert("An error occurred while updating the plan note.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <TaskDetails />

      {/* Close issue */}
      {task.nextAction === "servicemanager" && (
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-300"
            onClick={handleCloseIssue}
          >
            Close Issue
          </button>
        </div>
      )}

      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Update Successful!
            </h2>
            <p>
              The issue has been <b>dealt with</b>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
