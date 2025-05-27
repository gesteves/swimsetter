import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody } from './Table';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef }) {
  return (
    <Card
      footer={
        <button
          className="text-sm text-red-600 hover:text-red-500 transition-colors"
          onClick={onClearWorkout}
        >
          Delete all sets
        </button>
      }
    >
      <Table>
        <TableHeader>
          <TableHeaderCell>#</TableHeaderCell>
          <TableHeaderCell>Duration</TableHeaderCell>
          <TableHeaderCell>Pace</TableHeaderCell>
          <TableHeaderCell>Distance</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableHeader>
        <TableBody>
          {sets.map((set, index) => (
            <Set
              key={index}
              set={set}
              onUpdate={(updatedSet) => onUpdateSet(index, updatedSet)}
              onRemove={() => onRemoveSet(index)}
              ref={index === sets.length - 1 ? lastSetRef : null}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
} 
