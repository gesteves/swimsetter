import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody } from './Table';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableHeaderCell>Set</TableHeaderCell>
          <TableHeaderCell>Duration & Pace</TableHeaderCell>
          <TableHeaderCell>
            <span className="sr-only">Remove</span>
          </TableHeaderCell>
        </TableHeader>
        <TableBody>
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
        </TableBody>
      </Table>
      <div className="text-center border-t border-gray-300">
        <button
          className="px-3 py-4 text-sm transition-colors text-red-600 hover:text-red-500"
          onClick={onClearWorkout}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          Delete all sets
        </button>
      </div>
    </Card>
  );
} 
