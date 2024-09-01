"use client"
import { reportFlow } from "@/actions/report.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckboxDemo } from "../CheckBox";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

// TODO: Need to remove the post from that user only who reported it
export const ReportUserCard = ({ reportOptions, type, reportedUserId, reportedBlogId }: { reportOptions: { label: string; description: string }[], type: "user" | "post", reportedUserId: string, reportedBlogId: string }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [state, useReportAction, isPending] = useActionState(reportFlow, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false)
      toast.success('Thanks For Reporting')
    }
    if (state?.error) {
      setIsOpen(false)
      toast.error('Failed to submit the report')
    }
  }, [isPending, state?.success, state?.error])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger>
        <div className="hover:bg-gray-200 dark:bg-white/20 dark:hover:bg-white/10 bg-gray-100 rounded-sm hover:text-accent-foreground h-10 px-4 py-2">Report {type}</div>
        {/* <Button className="w-full" variant="ghost">Report {type}</Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto">Report {type}</DialogTitle>
          <DialogDescription className="text-center">
            Help us keep our community safe and respectful. Please select the
            reason for reporting this {type}:
          </DialogDescription>
        </DialogHeader>
        <form action={useReportAction} className="flex flex-col gap-2 justify-center">
          {reportOptions.map((options, key) => (
            <CheckboxDemo
              key={key}
              id={options.label}
              label={options.description}
            />
          ))}
          {/* // TODO: ye userId or blogId to direct bhi send kr skte h iske liye input ka jrurat nhi */}
          <input type="text" className="hidden" hidden readOnly value={reportedUserId} name="reportedUserId" />
          <input type="text" className="hidden" hidden readOnly value={reportedBlogId} name="reportedBlogId" />
          <Input name="issue" type="text" className="outline-none" placeholder="Please specify other issue"></Input>
          <DialogFooter>
            <Button
              variant="destructive"
              disabled={isPending}
              className="disabled:opacity-50 disabled:cursor-wait"
            >
              {
                isPending ? "Submiting report" : "Submit Report"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
