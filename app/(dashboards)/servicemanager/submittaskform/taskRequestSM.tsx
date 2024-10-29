"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskRequestSM() {
  const router = useRouter();
  //UI states
  const [loading, setLoading] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  
  //Input form states
  const [team, setTeam] = useState("top-chef");
  const [activity, setActivity] = useState("");
  const [budget, setBudget] = useState(0);
  const [personell, setPersonell] = useState(0);
  const [dueDate, setDueDate] = useState("");

  //Submit form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const serviceRequest = {
      team,
      activity,
      budget,
      personell,
      dueDate,
    };

    try {
      const res = await fetch("/api/initiateServiceRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceRequest),
      });

      if (res.ok) {
        setIsSuccessPopupOpen(true); // Show success message
        setTimeout(() => {
          setIsSuccessPopupOpen(false); // Hide toast after 2 seconds
          router.push("/"); // Redirect to the home page
        }, 2000);
      } else {
        alert(
          "Failed to submit task request. Please refresh the page and try again"
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting event request:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Task Request Form
        </h2>
        <label className="block">
          <span className="text-gray-700">Team:</span>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setTeam(e.target.value)}
            value={team}
          >
            <option value="Top Chef">Top Chef</option>
            <option value="Senior Waitress">Senior Waitress</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Activity:</span>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
            onChange={(e) => setActivity(e.target.value)}
            value={activity}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Budget:</span>
          <input
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            onChange={(e) => setBudget(Number(e.target.value))}
            value={budget}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Number of Personell:</span>
          <input
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            onChange={(e) => setPersonell(Number(e.target.value))}
            value={personell}
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Due Date:</span>
          <input
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          {!loading && <p>Submit</p>}
          {loading && <p>Loading...</p>}
        </button>
      </form>
      
      {/* Success Popup */}
      {isSuccessPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Task-creation Successful!
            </h2>
            <p>Your <b>task</b> has been created and sent to subteam.</p>
          </div>
        </div>
      )}
    </div>
  );
}
