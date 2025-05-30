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
    <Component ref={ref} className="px-6 py-4">
      <div className="flex items-center gap-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-200 w-6">{index + 1}</div>
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-1">
              <Select
                id={`duration-minutes-${index}`}
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
          </div>
          <div className="flex flex-col flex-1">
            <Select
              id={`pace-${index}`}
              value={set.pace}
              onChange={(e) => handleChange("pace", e.target.value)}
              options={paceOptions}
              aria-label={`Pace per 100 ${unit}`}
            />
          </div>
        </div>
        <button
          onClick={handleRemoveClick}
          className="cursor-pointer p-4 text-red-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-md transition-colors self-center"
          aria-label={confirming ? `Are you sure you want to remove set ${index + 1}?` : `Remove set ${index + 1}`}
        >
          <FontAwesomeIcon icon={confirming ? faTriangleExclamation : faCircleMinus} size="md" />
        </button>
      </div>
    </Component>
  );
});

Set.displayName = "Set";

export default Set;
