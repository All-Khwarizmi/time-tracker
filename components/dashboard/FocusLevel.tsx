interface FocusLevelProps {
  value: number;
  onChange: (value: number) => void;
}

export function FocusLevel({ value, onChange }: FocusLevelProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Focus Level</label>
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
