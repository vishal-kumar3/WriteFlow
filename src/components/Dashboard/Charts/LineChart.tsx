"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { getPerDayViews } from "@/actions/dashboard.action"
import Chart from "./Chart"
import { useState } from "react"
import { AnalyticsData } from "@/app/(main)/user/dashboard/analytics/consts/consts"

export const description = "A linear line chart"

type props = {
  userId: string
  chartData: AnalyticsData[]
  chartConfig: ChartConfig
}

export function ViewsLineChart({ userId, chartData, chartConfig }: props) {

  const [data, setData] = useState<AnalyticsData[]>(chartData)

  return (
    <form action={async(formData: FormData) => {
      const days = formData.get('days') as string | null;
      const dayValue = days ? parseInt(days, 10) : 7;

      const data = await getPerDayViews(userId, dayValue)
      if(data.success) setData(data.success)

    }} className="relative">
      <div className='absolute z-50 space-x-2 top-0 right-0'>
        <Button variant="ghost" type='submit' name='days' value={7}>7 Days</Button>
        <Button variant="ghost" type='submit' name='days' value={30}>30 Days</Button>
        <Button variant="ghost" type='submit' name='days' value={0}>Lifetime</Button>
      </div>
      <CardContent>
        <Chart
          chartConfig={chartConfig}
          chartData={data}
        />
      </CardContent>
    </form>
  )
}
