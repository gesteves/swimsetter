"use client"

import { forwardRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import Select from './Select';

const PACE_MIN = 50;  // 0:50/100m
const PACE_MAX = 150; // 2:30/100m

const Set = forwardRef(function Set({ index, set, onUpdate, onRemove, useYards, as: Component = 'li' }, ref) {
  const [confirming, setConfirming] = useState(false);

  const handleChange = (key, value) => {
    onUpdate({ ...set, [key]: parseInt(value, 10) });
  };

  const unit = useYards ? 'yd' : 'm';

  const minuteOptions = [...Array(60).keys()].map((i) => (
    <option key={`min-${i}`} value={i}>
      {String(i).padStart(2, "0")}
    </option>
  ));

  const secondOptions = [...Array(60).keys()].map((i) => (
    <option key={`sec-${i}`} value={i}>
      {String(i).padStart(2, "0")}
    </option>
  ));

  const paceOptions = Array.from({ length: PACE_MAX - PACE_MIN + 1 }, (_, i) => PACE_MIN + i).map((sec) => {
    const min = Math.floor(sec / 60);
    const secPart = String(sec % 60).padStart(2, "0");
    return (
      <option key={sec} value={sec}>
        {min}:{secPart}/100 {unit}
      </option>
    );
  });

  const handleRemoveClick = () => {
    if (confirming) {
      onRemove();
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 2000);
    }
  };

  return (
    <Component ref={ref} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="font-semibold w-6 text-center">{index + 1}</div>
        <div className="flex items-center gap-1">
          <Select
            value={set.minutes}
            onChange={(e) => handleChange("minutes", e.target.value)}
            options={minuteOptions}
            aria-label="Minutes"
          />
          <span className="grid grid-cols-1 flex-none">:</span>
          <Select
            value={set.seconds}
            onChange={(e) => handleChange("seconds", e.target.value)}
            options={secondOptions}
            aria-label="Seconds"
          />
        </div>
        <span className="hidden sm:block">@</span>
        <div>
          <Select
            value={set.pace}
            onChange={(e) => handleChange("pace", e.target.value)}
            options={paceOptions}
            aria-label={`Pace per 100 ${unit}`}
          />
        </div>
      </div>
      <button
        onClick={handleRemoveClick}
        className="cursor-pointer p-4 text-red-600 hover:text-red-500"
      >
        <FontAwesomeIcon icon={confirming ? faTriangleExclamation : faCircleMinus} size="lg" />
      </button>
    </Component>
  );
});

Set.displayName = "Set";

export default Set;
