import { useState } from 'react';
import { faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Set from './Set';
import Card from './Card';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef, useYards }) {
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <Card
      withDividers
      footerButton={{
        label: confirmClear ? "Are you sure?" : "Delete all sets",
        onClick: () => {
          if (confirmClear) onClearWorkout();
          else {
            setConfirmClear(true);
            setTimeout(() => setConfirmClear(false), 2000);
          }
        },
        icon: confirmClear ? faTriangleExclamation : faTrash,
        variant: "danger",
      }}
      className="overflow-hidden rounded-md bg-white shadow-sm"
    >
      <ol role="list" className="divide-y divide-gray-200">
        {sets.map((set, index) => (
          <Set
            key={index}
            index={index}
            set={set}
            onUpdate={(updatedSet) => onUpdateSet(index, updatedSet)}
            onRemove={() => onRemoveSet(index)}
            ref={index === sets.length - 1 ? lastSetRef : null}
            useYards={useYards}
            as="li"
          />
        ))}
      </ol>
    </Card>
  );
}
