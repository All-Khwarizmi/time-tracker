interface EnergyLevelProps {
  value: number;
  onChange: (value: number) => void;
}

export function EnergyLevel({ value, onChange }: EnergyLevelProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Energy Level</label>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
