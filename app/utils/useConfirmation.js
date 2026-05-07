"use client"

import { useCallback, useEffect, useRef, useState } from "react";

export function useConfirmation(timeoutMs = 2000) {
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef(null);

  const clear = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const arm = useCallback(() => {
    clear();
    setConfirming(true);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setConfirming(false);
    }, timeoutMs);
  }, [clear, timeoutMs]);

  const reset = useCallback(() => {
    clear();
    setConfirming(false);
  }, [clear]);

  useEffect(() => clear, [clear]);

  return { confirming, arm, reset };
}
