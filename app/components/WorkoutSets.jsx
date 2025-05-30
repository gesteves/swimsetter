<Card
  as="ol"
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
