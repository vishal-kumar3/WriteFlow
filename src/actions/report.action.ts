"use server"

import { auth } from "@/auth"
import prisma from "@/prisma"
import { revalidatePath } from "next/cache"

type reportUserProps = {
  reportedUserId: string,
  title: string,
  issue: string
}

export const reportUser = async ({reportedUserId, title, issue}: reportUserProps) => {
  const session = await auth()
  if(!session) return {error: "Not authenticated"}

  const report = await prisma.report.create({
    data: {
      title: title,
      issue: issue,
      reportedUserId: reportedUserId,
      createdBy: session.user.id!
    }
  })

  if(!report) return {error: "Failed to report user"}
  return {success: "User reported successfully"}
}

type reportFlowProps = {
	reportedUserId: string;
	reportedBlogId: string
	title: string;
	issue: string;
};

export const reportFlow = async (initialState:any, formData: FormData) => {
  let title = '';
  formData.forEach((value, key) => {
    value === "on" ? title += key + " " : "";
  })

  const reportData = {
    reportedUserId: formData.get("reportedUserId") as string,
    reportedBlogId: formData.get("reportedBlogId") as string,
    issue: formData.get("issue") as string
  }
	const session = await auth();
	if (!session) return { error: 'Not authenticated' };

	const report = await prisma.report.create({
		data: {
			title: title,
			issue: reportData.issue,
			reportedUserId: reportData.reportedUserId,
      reportedBlogId: reportData.reportedBlogId,
			createdBy: session.user.id!,
		},
	});

	if (!report) return { error: 'Failed to report flow' };
  revalidatePath('/')
	return { success: 'Flow reported successfully' };
};
