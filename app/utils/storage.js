export const loadSets = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("swimSets")) || [];
  } catch {
    return [];
  }
};

export const saveSets = (sets) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("swimSets", JSON.stringify(sets));
  }
};
