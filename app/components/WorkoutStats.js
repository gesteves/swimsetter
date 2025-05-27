export default function WorkoutStats({ stats }) {
  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sets</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distance</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pace</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="py-4 pr-3 pl-4 text-sm text-gray-900 sm:pl-0">
              {stats.setCount}
            </td>
            <td className="py-4 px-3 text-sm text-gray-900">
              {stats.totalTime}
            </td>
            <td className="py-4 px-3 text-sm text-gray-900">
              {stats.totalDistance}m
            </td>
            <td className="py-4 px-3 text-sm text-gray-900">
              {stats.totalDistance > 0 ? stats.avgPace : "–"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 
