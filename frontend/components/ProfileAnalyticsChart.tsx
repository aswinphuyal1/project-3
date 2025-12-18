"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample Data - In a real app, this would come from your props or API
const chartData = [
  { month: "Jan", views: 4500, earnings: 120 },
  { month: "Feb", views: 5200, earnings: 340 },
  { month: "Mar", views: 4800, earnings: 290 },
  { month: "Apr", views: 7100, earnings: 550 },
  { month: "May", views: 8500, earnings: 780 },
  { month: "Jun", views: 9200, earnings: 950 },
];

const chartConfig = {
  views: {
    label: "Total Views",
    color: "#222222",
  },
  earnings: {
    label: "Earnings ($)",
    color: "#FF6D1F",
  },
} satisfies ChartConfig;

export function ProfileAnalyticsChart() {
  return (
    <Card className="w-full bg-white border-[#F5E7C6] rounded-[28px] shadow-sm">
      <CardHeader className="flex flex-col items-start gap-1 pb-8">
        <CardTitle className="text-2xl font-black text-[#222222]">
          Performance Overview
        </CardTitle>
        <CardDescription className="text-[#222222]/50">
          Showing total views and earnings for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#F5E7C6"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "#222222", opacity: 0.5 }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="views"
              type="natural"
              fill="var(--color-views)"
              fillOpacity={0.1}
              stroke="var(--color-views)"
              strokeWidth={3}
              stackId="a"
            />
            <Area
              dataKey="earnings"
              type="natural"
              fill="var(--color-earnings)"
              fillOpacity={0.4}
              stroke="var(--color-earnings)"
              strokeWidth={3}
              stackId="b"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-bold text-[#222222] leading-none">
              Trending up by 12.5% this month{" "}
              <TrendingUp className="h-4 w-4 text-[#FF6D1F]" />
            </div>
            <div className="flex items-center gap-2 leading-none text-[#222222]/50 font-medium">
              January - June 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
