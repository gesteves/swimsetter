import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody } from './Table';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef, useYards }) {
  return (
    <Card
      footerButton={{
        label: "Delete all sets",
        onClick: onClearWorkout,
        icon: faTrash,
        variant: "danger",
      }}
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
