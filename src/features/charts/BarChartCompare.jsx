"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Insights } from "@/pages/analytics/insights";
import { SwithGraphView } from "@/components/SwithDropDownMenu";
import { ChartHeader } from "./ChartHeader";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-2)",
  },
};

export function ChartBarMultiple({
  chart_data = [],
  insights = [],
  showSwitch = false,
  trendView,
  setTrendView,
}) {
  /* ================= SAFETY ================= */
  if (!chart_data.length) return null;

  /* ================= TOTALS ================= */
  const total = React.useMemo(() => {
    return chart_data.reduce(
      (acc, curr) => {
        acc.income += curr?.income || 0;
        acc.expense += curr?.expense || 0;
        return acc;
      },
      { income: 0, expense: 0 },
    );
  }, [chart_data]);

  /* ================= FORMATTERS ================= */
  const formatXAxis = (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return value;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatTooltipLabel = (_value, payload) => {
    const raw = payload?.[0]?.payload?.label;
    if (!raw) return "";

    const d = raw instanceof Date ? raw : new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ================= RENDER ================= */
  return (
    <Card className={"pt-0"}>
      <CardHeader className="border-b p-0">
        <ChartHeader
          title={`Transaction Trends - ${trendView}`}
          description="Income vs Expense over time"
          showSwitch
          trendView={trendView}
          setTrendView={setTrendView}
        />
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-60 w-full">
          <BarChart data={chart_data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={formatXAxis}
            />

            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent labelFormatter={formatTooltipLabel} />
              }
            />

            <Bar
              dataKey="income"
              fill={chartConfig.income.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="expense"
              fill={chartConfig.expense.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 text-sm">
        <Insights data={insights} />
      </CardFooter>
    </Card>
  );
}
