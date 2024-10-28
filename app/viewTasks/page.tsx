import TaskList from "@/app/components/TaskList";
import React from "react";

// Wrapper page for TaskList to make routing nicer
export default function ViewRequests() {
  return (
    <main>
      <TaskList />
    </main>
  );
}
