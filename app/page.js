"use client"

import { useState, useEffect } from "react";
import SetRow from "./components/set_row";
import { loadSets, saveSets } from "./utils/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCirclePlus, 
  faClipboard, 
  faClipboardCheck, 
  faTrash 
} from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const [sets, setSets] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSets(loadSets());
  }, []);

  useEffect(() => {
    saveSets(sets);
  }, [sets]);

  const updateSet = (index, updatedSet) => {
    const newSets = [...sets];
    newSets[index] = updatedSet;
    setSets(newSets);
  };

  const addSet = () => {
    const last = sets.at(-1) || { minutes: 1, seconds: 0, pace: 68 };
    setSets([...sets, last]);
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const clearWorkout = () => {
    if (confirm("Clear the current workout? This cannot be undone.")) {
      setSets([]);
    }
  };

  const totalSeconds = sets.reduce((sum, s) => sum + s.minutes * 60 + s.seconds, 0);
  const totalDistance = sets.reduce((sum, s) => {
    const dur = s.minutes * 60 + s.seconds;
    return sum + (dur / s.pace) * 100;
  }, 0);
  const totalTimeFormatted = `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;

  const copyToClipboard = () => {
    const grouped = {};
    sets.forEach(s => {
      const pace = `${Math.floor(s.pace / 60)}:${String(s.pace % 60).padStart(2, "0")}/100m`;
      const label = `${s.minutes}min @ ${pace}`;
      grouped[label] = (grouped[label] || 0) + 1;
    });

    const lines = Object.entries(grouped).map(([label, count]) => `${count}×${label}`);
    lines.push("---");
    lines.push(`${Math.round(totalDistance)} m`);    

    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="min-h-screen p-4 text-lg flex justify-center bg-blue-50">
      <div className="w-full max-w-screen-lg space-y-3">
        {sets.length > 0 && (
          <>
            <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">Set</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration & Pace</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      <span className="sr-only">Remove</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sets.map((set, i) => (
                    <SetRow
                      key={i}
                      index={i}
                      set={set}
                      onChange={(updated) => updateSet(i, updated)}
                      onRemove={() => removeSet(i)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">Sets</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Distance</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Pace</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 pr-3 pl-4 text-sm text-gray-900 sm:pl-0">
                      {sets.length}
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-900">
                      {totalTimeFormatted}
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-900">
                      {Math.round(totalDistance)}m
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-900">
                      {totalDistance > 0
                        ? (() => {
                            const paceSec = totalSeconds / (totalDistance / 100);
                            const min = Math.floor(paceSec / 60);
                            const sec = String(Math.round(paceSec % 60)).padStart(2, "0");
                            return `${min}:${sec}/100m`;
                          })()
                        : "–"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-md active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={addSet}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
              Add Set
            </button>
            <button
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-500 hover:shadow-md active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={copied ? faClipboardCheck : faClipboard} className="mr-2" />
              Copy to Clipboard
            </button>
            <button
              className="rounded-lg bg-red-600 px-5 py-2.5 text-base font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-500 hover:shadow-md active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={clearWorkout}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Clear Workout
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
