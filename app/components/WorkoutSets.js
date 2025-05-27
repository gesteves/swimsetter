import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody } from './Table';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef, useYards }) {
  return (
    <Card
      footer={
        <button
          className="text-sm text-red-600 hover:text-red-500 transition-colors"
          onClick={onClearWorkout}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-1" />
          Delete all sets
        </button>
      }
    >
      <Table>
        <TableHeader>
          <TableHeaderCell>Set</TableHeaderCell>
          <TableHeaderCell>Duration & Pace</TableHeaderCell>
          <TableHeaderCell><span className="sr-only">Remove</span></TableHeaderCell>
        </TableHeader>
        <TableBody>
          {sets.map((set, index) => (
            <Set
              key={index}
              index={index}
              set={set}
              onUpdate={(updatedSet) => onUpdateSet(index, updatedSet)}
              onRemove={() => onRemoveSet(index)}
              ref={index === sets.length - 1 ? lastSetRef : null}
              useYards={useYards}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
} 
