import { formatDistanceToNow, isYesterday, format } from "date-fns";
import { useTimeTicker } from "~/hooks/useTimeTicker";

export function RelativeTime({ date }: { date: string }) {
  useTimeTicker(); // Forces re-renders every 30s

  return (
    <span>
      {formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })}
    </span>
  );
}
