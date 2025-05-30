import { useState } from 'react';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { Table, TableHeader, TableHeaderCell, TableBody } from './Table';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef, useYards }) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearClick = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 2000);
    } else {
      onClearWorkout();
    }
  };

  return (
    <Card
      footerButton={{
        label: confirmDelete ? "Are you sure?" : "Delete all sets",
        onClick: () => {
          if (confirmDelete) onClearWorkout();
          else {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 2000);
          }
        },
        icon: confirmDelete ? faTriangleExclamation : faTrash,
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
