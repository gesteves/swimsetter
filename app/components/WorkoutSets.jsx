"use client"

import { faTrash, faTriangleExclamation } from '@fortawesome/pro-solid-svg-icons';
import Set from './Set';
import Card from './Card';
import { useConfirmation } from '../utils/useConfirmation';

export default function WorkoutSets({ sets, onUpdateSet, onRemoveSet, onClearWorkout, lastSetRef, useYards }) {
  const { confirming: confirmClear, arm, reset } = useConfirmation();

  return (
    <Card
      as="ol"
      footerButton={{
        label: confirmClear ? "Are you sure?" : "Delete all sets",
        onClick: () => {
          if (confirmClear) {
            reset();
            onClearWorkout();
          } else {
            arm();
          }
        },
        icon: confirmClear ? faTriangleExclamation : faTrash,
        variant: "danger",
      }}
    >
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
    </Card>
  );
}
