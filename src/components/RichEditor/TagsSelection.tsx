"use client"

import * as React from "react"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
  "xldjkfnj gjdf "
]

export function TagsSelection({ selectedTags, setSelectedTags }: { selectedTags: string[], setSelectedTags: (tags: string[]) => void }) {
  const [label, setLabel] = React.useState("feature")
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative flex w-full flex-col rounded-md border px-4 py-3">
      <p className="text-sm w-full flex flex-wrap gap-2 mb-3 font-medium leading-none">
        {
          selectedTags.map((tag) => (
            <span
              onClick={() => {
                setSelectedTags(selectedTags.filter((selectedtag) => selectedtag !== tag))
              }}
              key={tag} className="rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground hover:cursor-pointer">
              {tag}
            </span>
          ))
        }
      </p>
      <Command>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" >Choose Tags</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full light:bg-slate-100 z-50">
            <CommandInput
              autoFocus={true}
              placeholder="Select Tags"
            />
            <CommandList className="">
              <CommandEmpty>No label found.</CommandEmpty>
              <CommandGroup >
                {labels.map((label) => (
                  <CommandItem
                    key={label}
                    value={label}
                    onSelect={(value) => {
                      setLabel(value)
                      if (selectedTags.length >= 5) return
                      !selectedTags.includes(value) && setSelectedTags([...selectedTags, value])
                      setOpen(false)
                    }}
                  >
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </DropdownMenuContent>
        </DropdownMenu>
      </Command>
    </div>
  )
}
