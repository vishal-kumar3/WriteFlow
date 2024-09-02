"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const viewsChartConfig = {
  views : {
    label: "views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ViewsChart({data}: {data: any[]}) {
  return (
    <>
      <Card className="border-none shadow-none">
        <CardContent>
          <ChartContainer className="min-h-[10px] mx-auto  max-h-[300px]" config={viewsChartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              {/* <CartesianGrid vertical={false} /> */}
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Bar dataKey="views" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
              {/* <Bar dataKey="views" fill="#8884d8" /> */}
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
