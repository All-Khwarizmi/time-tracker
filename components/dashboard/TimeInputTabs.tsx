// components/dashboard/TimeInputTabs.tsx
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimePicker } from "@/components/ui/time-picker";
import { DurationInput } from "./DurationInput";

interface TimeInputTabsProps {
  startTime: Date;
  endTime: Date;
  duration: string;
  durationUnit: "minutes" | "hours";
  onStartTimeChange: (time: Date) => void;
  onEndTimeChange: (time: Date) => void;
  onDurationChange: (duration: string) => void;
  onDurationUnitChange: (unit: "minutes" | "hours") => void;
}

export function TimeInputTabs({
  startTime,
  endTime,
  duration,
  durationUnit,
  onStartTimeChange,
  onEndTimeChange,
  onDurationChange,
  onDurationUnitChange,
}: TimeInputTabsProps) {
  const [timeInputMethod, setTimeInputMethod] = useState<
    "precise" | "duration"
  >("precise");

  return (
    <Tabs
      value={timeInputMethod}
      onValueChange={(value) =>
        setTimeInputMethod(value as "precise" | "duration")
      }
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="precise">Precise Time</TabsTrigger>
        <TabsTrigger value="duration">Duration</TabsTrigger>
      </TabsList>
      <TabsContent value="precise" className="space-y-4">
        <div className="flex space-x-2">
          <TimePicker
            selected={startTime}
            onChange={onStartTimeChange}
            className="w-1/2"
          />
          <TimePicker
            selected={endTime}
            onChange={onEndTimeChange}
            className="w-1/2"
          />
        </div>
      </TabsContent>
      <TabsContent value="duration" className="space-y-4">
        <TimePicker
          selected={startTime}
          onChange={onStartTimeChange}
          className="w-full"
        />
        <DurationInput
          duration={duration}
          durationUnit={durationUnit}
          onDurationChange={onDurationChange}
          onDurationUnitChange={onDurationUnitChange}
        />
      </TabsContent>
    </Tabs>
  );
}
