const STORAGE_KEYS = {
  SETS: "swimSets",
  LAST_SET: "swimLastSet",
  USE_YARDS: "swimUseYards"
};

const DEFAULT_SET = { minutes: 1, seconds: 0, pace: 68 };

export const loadSets = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETS)) || [];
  } catch {
    return [];
  }
};

export const loadLastSet = () => {
  if (typeof window === "undefined") return DEFAULT_SET;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LAST_SET)) || DEFAULT_SET;
  } catch {
    return DEFAULT_SET;
  }
};

export const saveSets = (sets) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.SETS, JSON.stringify(sets));
    // Save the last set if there are any sets
    if (sets.length > 0) {
      localStorage.setItem(STORAGE_KEYS.LAST_SET, JSON.stringify(sets[sets.length - 1]));
    }
  }
};

export const loadPreferences = () => {
  if (typeof window === "undefined") return { useYards: false };
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USE_YARDS);
    // Handle both string and boolean values
    const useYards = stored === 'true' || stored === true;
    return { useYards };
  } catch {
    return { useYards: false };
  }
};

export const savePreferences = ({ useYards }) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.USE_YARDS, JSON.stringify(useYards));
  }
};
