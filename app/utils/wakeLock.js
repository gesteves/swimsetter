"use client"

import { useEffect, useRef, useState } from "react";

export function useWakeLock() {
  const [wakeLockRequested, setWakeLockRequested] = useState(false);
  const wakeLockRef = useRef(null);
  const requestedRef = useRef(false);

  useEffect(() => {
    requestedRef.current = wakeLockRequested;
  }, [wakeLockRequested]);

  useEffect(() => {
    let cancelled = false;

    const acquire = async () => {
      if (typeof navigator === "undefined" || !navigator.wakeLock) {
        setWakeLockRequested(false);
        return;
      }
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled || !requestedRef.current) {
          sentinel.release().catch(() => {});
          return;
        }
        wakeLockRef.current = sentinel;
        sentinel.addEventListener("release", () => {
          if (wakeLockRef.current === sentinel) {
            wakeLockRef.current = null;
          }
        });
      } catch {
        if (!cancelled) setWakeLockRequested(false);
      }
    };

    const release = () => {
      const sentinel = wakeLockRef.current;
      if (sentinel) {
        wakeLockRef.current = null;
        sentinel.release().catch(() => {});
      }
    };

    if (wakeLockRequested) {
      acquire();
    } else {
      release();
    }

    return () => {
      cancelled = true;
      release();
    };
  }, [wakeLockRequested]);

  useEffect(() => {
    if (!wakeLockRequested) return undefined;

    const handleVisibilityChange = async () => {
      if (document.visibilityState !== "visible") return;
      if (!requestedRef.current || wakeLockRef.current) return;
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (!requestedRef.current) {
          sentinel.release().catch(() => {});
          return;
        }
        wakeLockRef.current = sentinel;
        sentinel.addEventListener("release", () => {
          if (wakeLockRef.current === sentinel) {
            wakeLockRef.current = null;
          }
        });
      } catch {
        setWakeLockRequested(false);
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
  };
}
