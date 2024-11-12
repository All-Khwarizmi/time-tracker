// components/dashboard/LocationInput.tsx
import { Input } from "@/components/ui/input";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  return (
    <Input
      type="text"
      placeholder="Location (optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
}
