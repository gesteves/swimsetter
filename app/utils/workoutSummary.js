export const generateWorkoutSummary = (sets) => {
  let hasNonZeroSets = false;
  let totalSeconds = 0;
  let totalDistance = 0;
  const lines = [];
  
  // Filter out zero duration sets and calculate totals
  const validSets = sets.filter(s => {
    if (s.minutes === 0 && s.seconds === 0) return false;
    hasNonZeroSets = true;
    const setSeconds = s.minutes * 60 + s.seconds;
    totalSeconds += setSeconds;
    totalDistance += (setSeconds / s.pace) * 100;
    return true;
  });

  if (!hasNonZeroSets) return "";

  // Group consecutive sets
  let currentGroup = null;
  let currentCount = 0;

  validSets.forEach((set, index) => {
    const duration = `${set.minutes}:${String(set.seconds).padStart(2, "0")}`;
    const pace = `${Math.floor(set.pace / 60)}:${String(set.pace % 60).padStart(2, "0")}/100m`;
    const label = `${duration} @ ${pace}`;

    if (currentGroup === label) {
      currentCount++;
    } else {
      // If we had a previous group, add it to lines
      if (currentGroup !== null) {
        lines.push(currentCount > 1 ? `${currentCount}×${currentGroup}` : currentGroup);
      }
      // Start new group
      currentGroup = label;
      currentCount = 1;
    }

    // If this is the last set, add the current group
    if (index === validSets.length - 1) {
      lines.push(currentCount > 1 ? `${currentCount}×${currentGroup}` : currentGroup);
    }
  });

  // Add summary lines
  lines.push("---");
  
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const totalTimeFormatted = formatTime(totalSeconds);
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
