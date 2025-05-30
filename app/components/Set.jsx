"use client"

import { forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { TableCell } from './Table';
import Select from './Select';

const PACE_MIN = 50;  // 0:50/100m
const PACE_MAX = 150; // 2:30/100m

const Set = forwardRef(function Set({ index, set, onUpdate, onRemove, useYards }, ref) {
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

  return (
    <tr ref={ref}>
      <TableCell>
        {index + 1}
      </TableCell>
      <TableCell>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-1">
            <Select
              value={set.minutes}
              onChange={(e) => handleChange("minutes", e.target.value)}
              options={minuteOptions}
              aria-label="Minutes"
            />
            <div className="grid grid-cols-1 flex-none">:</div>
            <Select
              value={set.seconds}
              onChange={(e) => handleChange("seconds", e.target.value)}
              options={secondOptions}
              aria-label="Seconds"
            />
          </div>
          <div className="grid grid-cols-1 hidden sm:block">@</div>
          <div className="grid grid-cols-1 mt-2 sm:mt-0">
            <Select
              value={set.pace}
              onChange={(e) => handleChange("pace", e.target.value)}
              options={paceOptions}
              aria-label={`Pace per 100 ${unit}`}
            />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <button
          aria-label={`Remove set ${index + 1}`}
          onClick={onRemove}
          className="cursor-pointer text-red-600 hover:text-red-500"
        >
          <FontAwesomeIcon icon={faCircleMinus} size="lg" />
        </button>
      </TableCell>
    </tr>
  );
});

Set.displayName = "Set";

export default Set;
