// components/dashboard/ChallengeSelect.tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Challenge } from "@/lib/types";

interface ChallengeSelectProps {
  challenges: Challenge[];
  selectedChallengeId: string | null;
  onChallengeSelect: (challengeId: string | null) => void;
}

export function ChallengeSelect({
  challenges,
  selectedChallengeId,
  onChallengeSelect,
}: ChallengeSelectProps) {
  return (
    <Select
      value={selectedChallengeId || ""}
      onValueChange={(value) => onChallengeSelect(value || null)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a challenge (optional)" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="optional">No challenge</SelectItem>
        {challenges.map((challenge) => (
          <SelectItem key={challenge.id} value={challenge.id}>
            {challenge.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
