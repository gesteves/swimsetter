"use client"

import { useState, useEffect, useRef } from "react";
import WorkoutSets from "./components/WorkoutSets";
import WorkoutStats from "./components/WorkoutStats";
import ButtonCard from "./components/ButtonCard";
import Intro from "./components/Intro";
import { loadSets, saveSets, loadLastSet, loadPreferences } from "./utils/storage";
import { useWakeLock } from "./utils/wakeLock";
import { generateWorkoutSummary } from "./utils/workoutSummary";
import Preferences from "./components/Preferences";

export default function Home() {
  const [sets, setSets] = useState([]);
  const [useYards, setUseYardsState] = useState(false);
  const buttonCardRef = useRef(null);
  const lastSetRef = useRef(null);
  const shouldScrollRef = useRef(false);
  const { requestWakeLock } = useWakeLock();

  useEffect(() => {
    const { useYards: savedUseYards } = loadPreferences();
    setUseYardsState(savedUseYards);
  }, []);

  const setUseYards = (value) => {
    setUseYardsState(value);
  };

  useEffect(() => {
    setSets(loadSets());
  }, []);

  useEffect(() => {
    saveSets(sets);
  }, [sets]);

  useEffect(() => {
    if (buttonCardRef.current) {
      const height = buttonCardRef.current.offsetHeight;
      document.documentElement.style.setProperty('--bottom-padding', `${height}px`);
    }
  }, [sets]);

  useEffect(() => {
    if (lastSetRef.current && shouldScrollRef.current) {
      lastSetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      shouldScrollRef.current = false;
    }
  }, [sets.length]);

  const updateSet = (index, updatedSet) => {
    const newSets = [...sets];
    newSets[index] = updatedSet;
    setSets(newSets);
  };

  const addSet = async () => {
    const lastSet = loadLastSet();
    shouldScrollRef.current = true;
    setSets([...sets, lastSet]);
    await requestWakeLock();
  };

  const removeSet = (index) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const clearWorkout = () => {
    if (confirm("Are you sure you want to empty the entire workout? This cannot be undone.")) {
      setSets([]);
    }
  };

  const workoutData = generateWorkoutSummary(sets, useYards);

  return (
    <main className="min-h-[100dvh] p-4 text-lg flex justify-center bg-blue-50 pb-[var(--bottom-padding)]">
      <div className="w-full max-w-lg space-y-3">
        {sets.length === 0 && <Intro />}
        <Preferences useYards={useYards} setUseYards={setUseYards} />
        {sets.length > 0 && (
          <>
            <WorkoutSets
              sets={sets}
              onUpdateSet={updateSet}
              onRemoveSet={removeSet}
              onClearWorkout={clearWorkout}
              lastSetRef={lastSetRef}
              useYards={useYards}
            />
            <WorkoutStats 
              stats={workoutData.stats} 
              onCopy={() => navigator.clipboard.writeText(workoutData.summary)} 
              useYards={useYards}
            />
          </>
        )}
        <ButtonCard ref={buttonCardRef} onAddSet={addSet} />
      </div>
    </main>
  );
}
