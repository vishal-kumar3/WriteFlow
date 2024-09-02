"use server"

import { auth } from "@/auth"
import prisma from "@/prisma"

// Views
export const getSevenDaysViews = async (userId: string) => {
  const sevenDaysData = await prisma.view.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!sevenDaysData) return 0
  return sevenDaysData
}

export const getThirtyDaysViews = async (userId: string) => {
  const thirtyDaysData = await prisma.view.count({
    where: {
      userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!thirtyDaysData) return 0
  return thirtyDaysData
}

export const getTotalViews = async (userId: string) => {
  const totalViews = await prisma.view.count({
    where: {
      userId,
    },
  })

  if (!totalViews) return 0
  return totalViews
}

//  write funciton to return json of per day views for last 7 days
export const getPerDayViews = async (userId: string, days: number) => {
  // Set the start date based on the `days` parameter
  const startDate = days > 0
    ? new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000)
    : undefined; // No start date for lifetime views

  // Fetch raw data grouped by exact createdAt timestamps
  const rawViews = await prisma.view.findMany({
    where: {
      userId,
      ...(startDate && { createdAt: { gte: startDate } }), // Apply date filter only if days > 0
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  if (!rawViews) return { error: "Error while fetching per day views" };

  // Manually group the data by date, ignoring the time part
  const groupedViews = rawViews.reduce((acc, view) => {
    const date = view.createdAt.toISOString().split('T')[0]; // Get only the date part (YYYY-MM-DD)

    if (!acc[date]) {
      acc[date] = { date, totalViews: 0 };
    }

    acc[date].totalViews += 1; // Increment the total views for this date
    return acc;
  }, {} as Record<string, { date: string; totalViews: number }>);

  // Create an array of all dates within the specified range, or all dates if lifetime
  const result = [];
  const endDate = new Date();
  const start = startDate || new Date(rawViews[0]?.createdAt || new Date()); // Start from the earliest date if lifetime

  for (let date = start; date <= endDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = date.toISOString().split('T')[0]; // Get YYYY-MM-DD

    // Add the date to the result, filling with zero if it doesn't exist in groupedViews
    result.push(groupedViews[formattedDate] || { date: formattedDate, totalViews: 0 });
  }

  return { success: result };
};



// Followers
export const getSevenDaysFollowers = async (userId: string) => {
  const totalFollowers = await prisma.follows.count({
    where: {
      followingId: userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!totalFollowers) return 0
  return totalFollowers
}

export const getThirtyDaysFollowers = async (userId: string) => {
  const totalFollowers = await prisma.follows.count({
    where: {
      followingId: userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  })

  if (!totalFollowers) return 0
  return totalFollowers
}

export const getTotalFollowers = async (userId: string) => {
  const totalFollowers = await prisma.follows.count({
    where: {
      followingId: userId,
    },
  })

  if (!totalFollowers) return 0
  return totalFollowers
}

export const getRecentBlog = async (userId: string) => {
  const recentBlog = await prisma.blog.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 2
  })

  if (!recentBlog) return { error: "Error while fetching recent flows" }
  if (recentBlog.length === 0) return { error: "No recent flows found" }
  return { success: recentBlog }
}

export const getTotalFlowsAndFollowers = async (userId: string) => {

  // get total no of flows and followers
  const totalFlowsAndFollowers = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      _count: {
        select: {
          blogs: true,
        }
      },
      followerCount: true
    }
  })

  if (!totalFlowsAndFollowers) return {_count: {blogs: "_"}, followerCount: "_"}
  return totalFlowsAndFollowers
}
