// components/dashboard/ActiveSessionSelect.tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Session } from "@/lib/types";

interface ActiveSessionSelectProps {
  sessions: Session[];
  selectedSessionId: string | null;
  onSessionSelect: (sessionId: string | null) => void;
}

export function ActiveSessionSelect({
  sessions,
  selectedSessionId,
  onSessionSelect,
}: ActiveSessionSelectProps) {
  if (sessions.length === 0) {
    return null;
  }

  return (
    <Select
      value={selectedSessionId || ""}
      onValueChange={(value) => onSessionSelect(value || null)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Complete a session" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="optional">Start new entry</SelectItem>
        {sessions.map((session) => (
          <SelectItem key={session.id} value={session.id}>
            {session.activity} (Started:{" "}
            {new Date(session.startTime).toLocaleString()})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
