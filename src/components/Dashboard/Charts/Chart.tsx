import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { formatMonth } from '@/util/DateTime';
import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

type props = {
  chartConfig: any;
  chartData: any;
}

const Chart = ({chartConfig, chartData}: props) => {
  return (
    <ChartContainer className="min-h-[10px] mt-10 py-5 mx-auto w-full max-h-[450px]" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(8, 10) + " " + formatMonth(value.slice(5, 7))}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="totalViews"
          type="linear"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default Chart
