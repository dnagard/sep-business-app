"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function StaffRequestSM() {
  const [currentStaff, setCurrent] = useState(0);
  const [additionalStaff, setAdditional] = useState(0);
  const [reason, setReason] = useState("");

  return (
    <form className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
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
          value={currentStaff}
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Number of Additional Staff Requested:</span>
        <input
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          type="number"
          onChange={(e) => setAdditional(Number(e.target.value))}
          value={additionalStaff}
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
        Submit
      </button>
    </form>
  );
}
