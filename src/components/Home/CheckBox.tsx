"use client"

import { Checkbox } from "../ui/checkbox";

export function CheckboxDemo({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} onCheckedChange={(e) => ("Done")} />
      <label
        htmlFor="terms"
        className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <span className="font-semibold">{id}</span>: {label}
      </label>
    </div>
  );
}