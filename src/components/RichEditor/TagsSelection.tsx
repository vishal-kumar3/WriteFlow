"use client"


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
import { getAllTags } from "@/actions/tag.action"
import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"


export function TagsSelection({ selectedTags, setSelectedTags }: { selectedTags: string[], setSelectedTags: (tags: string[]) => void }) {
  const [inputTag, setInputTag] = useState('')
  const [open, setOpen] = useState(false)
  const [tagList, setTagList] = useState<{tag: string, postsCount: number}[]>([])
  const [tags, setTags] = useState<{tag: string, postsCount: number}[]>([])


  useEffect(() => {
    async function fetchTags() {
      const fetchedTags = await getAllTags();
      setTags(fetchedTags); // Update the tags state
    }

    fetchTags();
  }, [])

  useEffect(() => {
    if (tags.length > 0) { // Ensure that the effect runs only when tags are populated
      const updatedTagList = tags.map((tag) => ({
        tag: tag.tag,
        postsCount: tag.postsCount,
      }));
      setTagList(updatedTagList);
    }
  }, [tags]);


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
          <DropdownMenuContent className="flex flex-col light:bg-slate-100 z-50">
            <CommandInput
              autoFocus={true}
              placeholder="Select Tags"
              value={inputTag}
              onChangeCapture={(e) => {
                // Space not allowed
                if (e.target.value.includes(' ')) return
                setInputTag((e.target.value).toLowerCase())
              }}
            />
            <CommandList className="">
              <CommandEmpty
                className={cn("cursor-pointer hover:bg-gray-100 rounded-md",
                  inputTag && "p-2 my-3",
              )}>
                {
                  inputTag && (
                    <button
                      className="w-full"
                      onClick={(event) => {
                        if (selectedTags.length >= 5) return
                        !selectedTags.includes(inputTag) && setSelectedTags([...selectedTags, inputTag])
                        setInputTag('')
                      }}
                    >
                      <div className="text-lg text-left">
                        #{inputTag}
                      </div>
                      <div className="text-sm text-left">
                        0 Posts
                      </div>
                    </button>
                  )
                }
              </CommandEmpty>
              <CommandGroup className="" >
                {tagList.map(({tag, postsCount}, key) => (
                  <CommandItem
                    key={key}
                    value={tag}
                    onSelect={(value) => {
                      if (selectedTags.length >= 5) return
                      !selectedTags.includes(tag) && setSelectedTags([...selectedTags, tag])
                      setOpen(false)
                    }}
                  >
                    <div className="cursor-pointer w-full">
                      <div className="text-lg text-left">
                        #{tag}
                      </div>
                      <div className="text-sm text-left">
                        {postsCount} Posts
                      </div>
                    </div>
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
