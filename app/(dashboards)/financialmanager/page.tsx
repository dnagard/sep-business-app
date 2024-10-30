import Link from "next/link";

export default function FinancialManager() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Financial Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <Link href="/viewRequests">
          <div className="flex gap-8">
            <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Review Event Requests
              </h2>
              <p className="text-gray-600 text-center">
                Review open events. Actionable items are highlighted.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/viewFinanceRequest">
          <div className="flex gap-8">
            <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Review Finance Requests
              </h2>
              <p className="text-gray-600 text-center">
                Review open events. Actionable items are highlighted.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
