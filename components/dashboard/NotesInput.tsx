// components/dashboard/NotesInput.tsx
interface NotesInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesInput({ value, onChange }: NotesInputProps) {
  return (
    <textarea
      placeholder="Notes (optional)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}
