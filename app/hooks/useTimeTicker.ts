import { useState, useEffect } from "react";

export function useTimeTicker(interval: number = 30000) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((tick) => tick + 1), interval);
    return () => clearInterval(timer);
  }, [interval]);
}
