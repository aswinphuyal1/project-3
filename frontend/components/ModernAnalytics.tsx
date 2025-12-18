"use client";

import React, { useState } from "react";
import { TrendingUp, ArrowUpRight, Filter } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", views: 2400, earnings: 45 },
  { day: "Tue", views: 1398, earnings: 80 },
  { day: "Wed", views: 9800, earnings: 120 },
  { day: "Thu", views: 3908, earnings: 90 },
  { day: "Fri", views: 4800, earnings: 150 },
  { day: "Sat", views: 3800, earnings: 110 },
  { day: "Sun", views: 4300, earnings: 190 },
];

const chartConfig = {
  views: {
    label: "Views",
    color: "#222222",
  },
  earnings: {
    label: "Earnings",
    color: "#FF6D1F",
  },
} satisfies ChartConfig;

export function ModernAnalytics() {
  const [activeTab, setActiveTab] = useState<"all" | "earnings" | "views">(
    "all"
  );

  return (
    <Card className="w-full bg-white border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden font-sans">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-8 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-3xl font-black text-[#222222] tracking-tight flex items-center gap-2">
            Revenue Flow
            <span className="bg-[#FF6D1F]/10 text-[#FF6D1F] text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={14} /> +12%
            </span>
          </CardTitle>
          <CardDescription className="text-[#222222]/40 font-medium italic">
            Visualizing your platform growth this week
          </CardDescription>
        </div>

        {/* Modern Tab Switcher */}
        <div className="flex bg-[#FAF3E1] p-1.5 rounded-2xl border border-[#F5E7C6]">
          {["all", "earnings", "views"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 capitalize ${
                activeTab === tab
                  ? "bg-white text-[#FF6D1F] shadow-sm scale-105"
                  : "text-[#222222]/40 hover:text-[#222222]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6D1F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF6D1F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#222222" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#222222" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#F5E7C6"
              strokeDasharray="8 8"
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={20}
              tick={{
                fill: "#222222",
                opacity: 0.3,
                fontWeight: 700,
                fontSize: 12,
              }}
            />

            <ChartTooltip
              cursor={{ stroke: "#F5E7C6", strokeWidth: 2 }}
              content={
                <ChartTooltipContent className="bg-white/80 backdrop-blur-md border-[#F5E7C6] rounded-2xl shadow-xl" />
              }
            />

            {(activeTab === "all" || activeTab === "views") && (
              <Area
                type="monotone"
                dataKey="views"
                stroke="#222222"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorViews)"
                animationDuration={1500}
              />
            )}

            {(activeTab === "all" || activeTab === "earnings") && (
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#FF6D1F"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorEarnings)"
                animationDuration={2000}
              />
            )}
          </AreaChart>
        </ChartContainer>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-3xl bg-[#FAF3E1]/50 border border-[#F5E7C6]/30">
            <p className="text-[10px] uppercase tracking-widest font-black text-[#222222]/30 mb-1">
              Peak Day
            </p>
            <p className="text-[#222222] font-black text-xl">Wednesday</p>
          </div>
          <div className="p-4 rounded-3xl bg-[#FAF3E1]/50 border border-[#F5E7C6]/30">
            <p className="text-[10px] uppercase tracking-widest font-black text-[#222222]/30 mb-1">
              Avg. CPM
            </p>
            <p className="text-[#FF6D1F] font-black text-xl">$12.40</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
