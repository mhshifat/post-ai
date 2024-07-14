"use client";

import { cn } from "@/lib/utils";
import { useCheckbox } from ".";

interface CheckboxItemProps {
  title: string;
  value: string;
  metadata?: Record<string, unknown>;
  className?: string;
  disabled?: boolean;
}

export default function CheckboxItem({ title, value, metadata, className, disabled }: CheckboxItemProps) {
  const { type, renderItem, isChecked, toggleCheckbox, identifier } = useCheckbox();

  return (
    <label className={cn("cursor-pointer", className, {
      "opacity-50": disabled
    })}>
      <input disabled={disabled} type={type} hidden name={identifier} value={value} checked={isChecked(value)} onChange={({ target }) => toggleCheckbox(value, target.checked)} />
      {renderItem?.({ title, metadata, isChecked: isChecked(value) }) || title}
    </label>
  )
}