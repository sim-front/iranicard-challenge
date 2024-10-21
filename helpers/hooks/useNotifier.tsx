import { useEffect, useRef } from "react";

type TrackedTimeout = {
  id: string;
  timeout: NodeJS.Timeout;
};

type ReturnProps = {
  removeTimer: (id: string) => void;
  pushTimer: (id: string) => void;
};

export const useNotifier = (): ReturnProps => {
  const refNotifCounter = useRef<TrackedTimeout[]>([]);

  const removeTimer = (id: string) => {
    clearTimeout(refNotifCounter.current.find((t) => t.id === id)?.timeout);
    refNotifCounter.current = refNotifCounter.current.filter(
      (t) => t.id !== id
    );
  };

  const pushTimer = (id: string) => {
    if (refNotifCounter.current.some((t) => t.id === id)) return;

    refNotifCounter.current.push({
      id,
      timeout: setTimeout(() => {
        alert("زمان برای این آیدی به پایان رسید: " + id);
        removeTimer(id);
      }, 1000 * 10),
    });
  };

  useEffect(() => {
    return () => {
      refNotifCounter.current.forEach((t) => clearTimeout(t.timeout));
    };
  }, []);

  return {
    removeTimer,
    pushTimer,
  };
};
