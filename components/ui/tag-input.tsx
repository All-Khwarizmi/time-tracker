// components/ui/tag-input.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({
  value,
  onChange,
  placeholder,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {value.map((tag) => (
        <Button
          key={tag}
          variant="secondary"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={() => removeTag(tag)}
        >
          {tag}
          <X className="ml-1 h-3 w-3" />
        </Button>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder || "Add tag..."}
        className="flex-grow"
      />
    </div>
  );
}
