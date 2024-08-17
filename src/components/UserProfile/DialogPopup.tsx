"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AboutDetails } from "./AboutSection";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateUserAboutSection } from "@/actions/user.action";

type DialogPopupProps = {
  userId: string;
  button: string;
  title: string;
  description: string;
  action: any;
  AboutSectionDetails: AboutDetails[]
};

export function DialogPopup({
  userId,
  button,
  title,
  description,
  action,
  AboutSectionDetails,
}: DialogPopupProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [state, saveChanges, isPending] = useActionState(updateUserAboutSection, null)

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false)
      toast.success('Saved the changes')
    }
    if (state?.error) {
      setIsOpen(false)
      toast.error('Failed to save the changes')
    }
  }, [isPending, state?.success, state?.error])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="outline">{button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action={saveChanges} className="grid gap-4 py-4">
          {AboutSectionDetails.map(({ label, defaultValue, id, placeholder }, key) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={id} className="text-right">
                {label}
              </Label>
              <Input
                id={id}
                name={id}
                placeholder={placeholder}
                defaultValue={defaultValue!}
                className="col-span-3"
              />
            </div>
          ))}
          <DialogFooter>
            <Button className="disabled:cursor-wait disabled:opacity-90" disabled={isPending} type="submit">
              {
                isPending ? "Saving the changes..." : "Save Changes"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
