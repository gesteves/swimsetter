"use client"

import { forwardRef } from "react";

const SetRow = forwardRef(({ index, set, onChange, onRemove }, ref) => {
  const handleChange = (key, value) => {
    onChange({ ...set, [key]: parseInt(value, 10) });
  };

  return (
    <tr ref={ref}>
      <td className="py-4 pr-3 pl-4 text-sm font-bold whitespace-nowrap text-gray-900 sm:pl-0">
        {index + 1}
      </td>

      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-1">
            <div className="mt-2 grid grid-cols-1 flex-1">
              <select
                value={set.minutes}
                onChange={(e) => handleChange("minutes", e.target.value)}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={`min-${i}`} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mt-2 grid grid-cols-1 flex-none">:</div>
            <div className="mt-2 grid grid-cols-1 flex-1">
              <select
                value={set.seconds}
                onChange={(e) => handleChange("seconds", e.target.value)}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={`sec-${i}`} value={i}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-1 hidden sm:block">@</div>
          <div className="mt-2 grid grid-cols-1">
            <select
              value={set.pace}
              onChange={(e) => handleChange("pace", e.target.value)}
              className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              {Array.from({ length: 83 }, (_, i) => 68 + i).map((sec) => {
                const min = Math.floor(sec / 60);
                const secPart = String(sec % 60).padStart(2, "0");
                return (
                  <option key={sec} value={sec}>
                    {min}:{secPart}/100m
                  </option>
                );
              })}
            </select>
            <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </td>

      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500 text-right">
        <button onClick={onRemove} className="text-red-600 hover:text-red-500 hover:underline">
          Remove <span className="sr-only"> Set {index + 1}</span>
        </button>
      </td>
    </tr>
  );
});

SetRow.displayName = "SetRow";

export default SetRow;
