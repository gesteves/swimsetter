"use client"

import { useState, useEffect, useRef } from "react";
import WorkoutSets from "./components/WorkoutSets";
import WorkoutStats from "./components/WorkoutStats";
import ButtonBar from './components/ButtonBar';
import Intro from "./components/Intro";
import { loadSets, saveSets, loadLastSet, loadPreferences } from "./utils/storage";
import { generateWorkoutSummary } from "./utils/workoutSummary";
import Preferences from "./components/Preferences";

export default function Home() {
  const [sets, setSets] = useState([]);
  const [useYards, setUseYardsState] = useState(false);
  const buttonCardRef = useRef(null);
  const lastSetRef = useRef(null);
  const shouldScrollRef = useRef(false);

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
    setSets((prev) => prev.map((s, i) => (i === index ? updatedSet : s)));
  };

  const addSet = () => {
    const lastSet = loadLastSet();
    shouldScrollRef.current = true;
    setSets((prev) => [...prev, lastSet]);
  };

  const removeSet = (index) => {
    setSets((prev) => prev.filter((_, i) => i !== index));
  };

  const clearWorkout = () => {
    setSets([]);
  };


  const workoutData = generateWorkoutSummary(sets, useYards);

  return (
    <>
      <Preferences useYards={useYards} setUseYards={setUseYards} />
      {sets.length === 0 && <Intro />}
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
      <ButtonBar ref={buttonCardRef} onAddSet={addSet} />
    </>
  );
}
