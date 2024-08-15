import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AboutDetails } from "./AboutSection";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{button}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action={action} className="grid gap-4 py-4">
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
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
