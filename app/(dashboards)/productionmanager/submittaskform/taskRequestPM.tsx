"use client";

import { useRouter } from "next/router";
import { useState } from "react";

export default function TaskRequestPM() {
  const [team, setTeam] = useState("photography");
  const [activity, setActivity] = useState("");
  const [budget, setBudget] = useState(0);
  const [personell, setPersonell] = useState(0);
  const [dueDate, setDueDate] = useState("");

  return (
    <form className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
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
          <option value="photography">Photography</option>
          <option value="music">Music</option>
          <option value="graphic-design">Graphic Design</option>
          <option value="decorations">Decorations</option>
          <option value="network-support">Network Support</option>
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
        Submit
      </button>
    </form>
  );
}
