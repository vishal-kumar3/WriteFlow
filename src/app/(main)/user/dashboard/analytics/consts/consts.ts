import { getSevenDaysViews, getThirtyDaysViews, getTotalViews } from "@/actions/dashboard.action";

export type AnalyticsData = {
  date: string
  totalViews: number
}

export const Analytics: { title: string, action: (userId: string) => Promise<number> }[] = [
  {
    title: "7-Days page views",
    action: getSevenDaysViews,
  },
  {
    title: "30-Days page views",
    action: getThirtyDaysViews,
  },
  {
    title: "Total page views",
    action: getTotalViews,
  },
];
