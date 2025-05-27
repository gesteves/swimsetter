export const generateWorkoutSummary = (sets) => {
  const grouped = {};
  let hasNonZeroSets = false;
  let totalSeconds = 0;
  let totalDistance = 0;
  
  sets.forEach(s => {
    if (s.minutes === 0 && s.seconds === 0) return;
    hasNonZeroSets = true;
    const pace = `${Math.floor(s.pace / 60)}:${String(s.pace % 60).padStart(2, "0")}/100m`;
    const duration = `${s.minutes}:${String(s.seconds).padStart(2, "0")}`;
    const label = `${duration} @ ${pace}`;
    grouped[label] = (grouped[label] || 0) + 1;

    // Calculate totals
    const setSeconds = s.minutes * 60 + s.seconds;
    totalSeconds += setSeconds;
    totalDistance += (setSeconds / s.pace) * 100;
  });

  if (!hasNonZeroSets) return "";

  const lines = Object.entries(grouped).map(([label, count]) => `${count}×${label}`);
  lines.push("---");
  
  const totalTimeFormatted = `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
  lines.push(`${totalTimeFormatted} total`);
  
  const avgPace = Math.round(totalSeconds / (totalDistance / 100));
  const avgPaceFormatted = `${Math.floor(avgPace / 60)}:${String(avgPace % 60).padStart(2, "0")}/100m`;
  lines.push(`${avgPaceFormatted} avg. pace`);
  lines.push(`${Math.round(totalDistance)} m`);

  return {
    summary: lines.join("\n"),
    stats: {
      totalTime: totalTimeFormatted,
      totalDistance: Math.round(totalDistance),
      avgPace: avgPaceFormatted,
      setCount: sets.length
    }
  };
}; 
