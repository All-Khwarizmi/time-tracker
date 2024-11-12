// components/dashboard/duration-input.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DURATION_PRESETS = [
  { label: "15m", value: 15 },
  { label: "30m", value: 30 },
  { label: "1h", value: 60 },
  { label: "2h", value: 120 },
  { label: "4h", value: 240 },
  { label: "6h", value: 360 },
  { label: "8h", value: 480 },
];

interface DurationInputProps {
  duration: string;
  durationUnit: "minutes" | "hours";
  onDurationChange: (value: string) => void;
  onDurationUnitChange: (value: "minutes" | "hours") => void;
}

export function DurationInput({
  duration,
  durationUnit,
  onDurationChange,
  onDurationUnitChange,
}: DurationInputProps) {
  const handleDurationPresetClick = (value: number) => {
    onDurationChange(value.toString());
    onDurationUnitChange("minutes");
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) => onDurationChange(e.target.value)}
          required
          className="flex-grow"
        />
        <Select
          value={durationUnit}
          onValueChange={(value: "minutes" | "hours") =>
            onDurationUnitChange(value)
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        {DURATION_PRESETS.map((preset) => (
          <Button
            key={preset.label}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleDurationPresetClick(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
