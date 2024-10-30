"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StaffRequestSM() {
  const router = useRouter();
  //UI states
  const [loading, setLoading] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const [currStaff, setCurrent] = useState(0);
  const [requiredStaff, setAdditional] = useState(0);
  const [reason, setReason] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const department = "productionmanager";
    const status = "pending";
    const staffRequest = {
      department,
      currStaff,
      requiredStaff,
      reason,
      status,
    };

    try {
      const res = await fetch("/api/initiateStaffRequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staffRequest),
      });

      if (res.ok) {
        setIsSuccessPopupOpen(true); // Show success message
        setTimeout(() => {
          setIsSuccessPopupOpen(false); // Hide toast after 2 seconds
          router.push("/"); // Redirect to the home page
        }, 2000);
      } else {
        alert(
          "Failed to submit staff request. Please refresh the page and try again"
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting staff request:", error);
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
          Staff Request Form
        </h2>

        <label className="block">
          <span className="text-gray-700">Current Staff:</span>
          <input
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            onChange={(e) => setCurrent(Number(e.target.value))}
            value={currStaff}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">
            Number of Additional Staff Requested:
          </span>
          <input
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="number"
            onChange={(e) => setAdditional(Number(e.target.value))}
            value={requiredStaff}
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Reason:</span>
          <textarea
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
            onChange={(e) => setReason(e.target.value)}
            value={reason}
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
              Staff Request Submitted!
            </h2>
            <p>
              Your <b>staff request</b> has been created and sent to HR.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
