import Link from "next/link";

export default function CustomerServiceOfficer() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Customer Service Officer Dashboard
      </h1>

      <div className="flex gap-8">
        <Link href="/customerserviceofficer/createRequest">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Event Request
            </h2>
            <p className="text-gray-600 text-center">
              Fill out a form with client information to initiate an Event
              Request
            </p>
          </div>
        </Link>

        <Link href="/viewRequests">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Review Event Statuses
            </h2>
            <p className="text-gray-600 text-center">
              Browse events to view their details. Actionable items are
              highlighted.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
