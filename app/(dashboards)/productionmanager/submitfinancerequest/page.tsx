import React from "react";
import FinanceRequest from "./financeRequest";

export default function Forms() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-5xl font-sans font-bold text-center mt-8">
        Submit a Finance Request to Financial Manager
      </h2>

      <div className="flex-grow flex items-center justify-center w-full">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <FinanceRequest />
        </div>
      </div>
    </main>
  );
}
