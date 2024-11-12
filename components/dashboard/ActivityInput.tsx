// components/dashboard/ActivityInput.tsx
import { Input } from "@/components/ui/input";

interface ActivityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ActivityInput({ value, onChange }: ActivityInputProps) {
  return (
    <Input
      type="text"
      placeholder="Activity"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full"
    />
  );
}
