import AnalyticsCard from '@/components/Dashboard/AnalyticsCard'
import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import React from 'react'
import { auth } from '@/auth'
import { getPerDayViews, getSevenDaysViews, getThirtyDaysViews, getTotalViews } from '@/actions/dashboard.action'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ViewsLineChart } from '@/components/Dashboard/Charts/LineChart'
import { Button } from '@/components/ui/button'
import { ChartConfig } from '@/components/ui/chart'

type props = {}

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

const chartConfig = {
  totalViews: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const page = async (props: props) => {
  const session = await auth()
  if (!session) return null;
  const userId = session.user.id;

  const data = await getPerDayViews(session.user.id!, 7)
  console.log(data.success)

  return (
    <DashboardHeader title='Analytics' description='Summary of your publication analytics'>
      <CardHeader>
        <CardTitle>Views Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-10 mb-5 justify-between items-center">
          {
            Analytics.map((item) => (
              <AnalyticsCard key={item.title} title={item.title} action={item.action} userId={userId!} />
            ))
          }
        </div>
        <ViewsLineChart
          chartConfig={chartConfig}
          userId={session.user.id!}
          chartData={data.success || []}
        />
      </CardContent>
    </DashboardHeader>
  )
}

export default page
