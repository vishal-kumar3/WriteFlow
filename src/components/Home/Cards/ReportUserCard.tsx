import { reportFlow } from "@/actions/report.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckboxDemo } from "../CheckBox";
import { Input } from "@/components/ui/input";

// TODO: Need to remove the post from that user only who reported it
export const ReportUserCard = ({ reportOptions, type, reportedUserId, reportedBlogId }: { reportOptions: { label: string; description: string }[], type: "user" | "post", reportedUserId: string, reportedBlogId: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Report {type}</div>
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
        <form action={reportFlow} className="flex flex-col gap-2 justify-center">
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
          <DialogClose>
            <Button variant="destructive">Submit Report</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};
