import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Insights } from "@/pages/analytics/insights";
import { ChartHeader } from "./ChartHeader";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
};

export function ChartBarInteractive({
  chart_data = [],
  showDate = true,
  insights = [],
  trendView,
  setTrendView,
  title,
  description,
  showActions,
  showSwitch,
}) {
  const [activeChart, setActiveChart] = React.useState("income");

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

  if (!chart_data.length) return null;

  /* ================= FORMATTERS ================= */
  const formatXAxis = (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return value;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: showDate ? "numeric" : undefined,
    });
  };

  const formatTooltipLabel = (_value, payload) => {
    const rawLabel = payload?.[0]?.payload?.label;
    if (!rawLabel) return "";

    const d = rawLabel instanceof Date ? rawLabel : new Date(rawLabel);
    if (Number.isNaN(d.getTime())) return rawLabel;

    return d.toLocaleDateString("en-US", {
      day: showDate ? "numeric" : undefined,
      month: "short",
      year: "numeric",
    });
  };

  /* ================= RENDER ================= */
  return (
    <Card className="pt-0">
      <CardHeader className="border-b p-0">
        <ChartHeader
          title={`Transaction Trends - ${trendView}`}
          description="Income vs Expense over selected period"
          showActions
          showSwitch
          activeChart={activeChart}
          setActiveChart={setActiveChart}
          total={total}
          chartConfig={chartConfig}
          trendView={trendView}
          setTrendView={setTrendView}
        />
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="h-65 w-full">
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
              content={
                <ChartTooltipContent
                  valueKey={activeChart}
                  labelFormatter={formatTooltipLabel}
                />
              }
            />

            <Bar
              dataKey={activeChart}
              fill={chartConfig[activeChart].color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1 text-sm">
        {Boolean(insights.length) && <Insights data={insights} />}
      </CardFooter>
    </Card>
  );
}
