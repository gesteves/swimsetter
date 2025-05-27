import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef }) {
  return (
    <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">Set</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration & Pace</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              <span className="sr-only">Remove</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sets.map((set, i) => (
            <Set
              key={i}
              index={i}
              set={set}
              onChange={(updated) => onUpdateSet(i, updated)}
              onRemove={() => onRemoveSet(i)}
              ref={i === sets.length - 1 ? lastSetRef : null}
            />
          ))}
        </tbody>
      </table>
      <div className="text-center border-t border-gray-300">
        <button
          className="px-3 py-4 text-sm transition-colors text-red-600 hover:text-red-500"
          onClick={onClearWorkout}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          Delete all sets
        </button>
      </div>
    </div>
  );
} 
