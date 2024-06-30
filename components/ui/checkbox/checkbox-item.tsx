"use client";

import { useCheckbox } from ".";

interface CheckboxItemProps {
  title: string;
  value: string;
  metadata?: Record<string, unknown>;
}

export default function CheckboxItem({ title, value, metadata }: CheckboxItemProps) {
  const { type, renderItem, isChecked, toggleCheckbox, identifier } = useCheckbox();

  return (
    <label className="cursor-pointer">
      <input type={type} hidden name={identifier} value={value} checked={isChecked(value)} onChange={({ target }) => toggleCheckbox(value, target.checked)} />
      {renderItem?.({ title, metadata, isChecked: isChecked(value) }) || title}
    </label>
  )
}