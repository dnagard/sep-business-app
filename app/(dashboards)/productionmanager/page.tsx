export default function ProductionManager() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Production Manager Dashboard
      </h1>

      <div className="flex gap-8">
        <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Task Plan
          </h2>
          <p className="text-gray-600 text-center">
            Fill out a form with tasks that subteams need to accomplish.
          </p>
        </div>

        <div className="flex gap-8">
          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Review Task Plans
            </h2>
            <p className="text-gray-600 text-center">
              Review the plans that the SubTeams created.
            </p>
          </div>

          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Staffing Request
            </h2>
            <p className="text-gray-600 text-center">
              Request more personell from HR.
            </p>
          </div>

          <div className="w-64 h-80 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105 p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Create Financial Request
            </h2>
            <p className="text-gray-600 text-center">
              Request more resources from the Finanacial Manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
