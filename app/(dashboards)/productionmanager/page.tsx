import Link from "next/link";

export default function ProductionManager() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Production Manager Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Create task plan card */}
        <Link href="/productionmanager/submittaskform">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Task Plan
            </h2>
            <p className="text-gray-600 text-center">
              Fill out a form with tasks that subteams need to accomplish.
            </p>
          </div>
        </Link>

        {/* View task list card */}
        <Link href="/viewTasks">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Review Task Plans
            </h2>
            <p className="text-gray-600 text-center">
              Review the plans that the SubTeams created.
            </p>
          </div>
        </Link>

        {/* Create staff request card */}
        <Link href="/productionmanager/submitstaffrequest">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Staffing Request
            </h2>
            <p className="text-gray-600 text-center">
              Request more personnel from HR.
            </p>
          </div>
        </Link>

        {/* Create finance request card */}
        {/* TODO: Create the finance form and link */}
        <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Financial Request
          </h2>
          <p className="text-gray-600 text-center">
            Request more resources from the Financial Manager.
          </p>
        </div>
      </div>
    </div>
  );
}
