// utils/wakeLock.js
"use client"

import { useState, useEffect, useCallback } from "react";

let wakeLock = null;

export function useWakeLock() {
  const [wakeLockRequested, setWakeLockRequested] = useState(false);

  const requestWakeLock = useCallback(async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        wakeLock = null;
      });
    } catch (err) {
      setWakeLockRequested(false);
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLock !== null) {
      wakeLock.release();
      wakeLock = null;
    }
  }, []);

  useEffect(() => {
    if (wakeLockRequested) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
  }, [wakeLockRequested, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (wakeLockRequested && document.visibilityState === "visible") {
        try {
          wakeLock = await navigator.wakeLock.request("screen");
          wakeLock.addEventListener("release", () => {
            wakeLock = null;
          });
        } catch {
          setWakeLockRequested(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [wakeLockRequested]);

  return {
    wakeLockRequested,
    setWakeLockRequested,
    requestWakeLock,
  };
}
