import {
  EllipsisVertical,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReportUserCard } from "@/components/Home/Cards/ReportUserCard";

type FlowDropDownButtonProps = {
  reportOptions: { label: string; description: string; }[]
  type: 'user' | 'post'
  reportedUserId: string
  reportedBlogId: string
}

export function DropdownMenuDemo({ reportOptions, type, reportedUserId, reportedBlogId }: FlowDropDownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ReportUserCard reportOptions={reportOptions} type={type} reportedUserId={reportedUserId} reportedBlogId={reportedBlogId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
