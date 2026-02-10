"use client";

import React from "react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import { Insights } from "@/pages/analytics/insights";
import { getGreenMonoColors, getTealMonoColors } from "@/utils/getColors";

/* ===============================
   CONFIG
================================ */
const chartConfig = {
  income: { label: "Income" },
  expense: { label: "Expense" },
};

const PieTooltip = ({ active, payload, total }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0];
  const { label, net, fill } = item.payload;

  const percent = total ? Math.round((net / total) * 100) : 0;

  return (
    <div className="rounded-md border bg-background p-2 text-xs shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: fill }}
        />
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{percent}%</span>
      </div>
      <div className="mt-1 ml-2 font-medium">
        {Number(net).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export function ChartPieLabelCustom({ chart_data, insights = [] }) {
  const [activeChart, setActiveChart] = React.useState("expense");

  const incomeData = Array.isArray(chart_data?.income) ? chart_data.income : [];
  const expenseData = Array.isArray(chart_data?.expense)
    ? chart_data.expense
    : [];

  const activeData = activeChart === "income" ? incomeData : expenseData;
  const hasData = activeData.length > 0;

  const PIE_COLORS =
    activeChart === "income"
      ? getGreenMonoColors(activeData.length || 10, 140)
      : getTealMonoColors(activeData.length || 10, 9);

  const coloredData = activeData.map((item, i) => ({
    ...item,
    fill: item.fill || PIE_COLORS[i % PIE_COLORS.length],
  }));

  const total = React.useMemo(
    () => coloredData.reduce((s, d) => s + (Number(d.net) || 0), 0),
    [coloredData],
  );

  return (
    <Card className="flex flex-col">
      {/* HEADER */}
      <CardHeader className="flex items-center border-b p-0 px-1 md:px-3 pb-2">
        <div className="flex flex-1 flex-col gap-1 p-3 sm:py-0">
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>
            {activeChart === "income"
              ? "Income distribution"
              : "Expense distribution"}
          </CardDescription>
        </div>

        {/* TOGGLE */}
        <div className="flex overflow-hidden rounded-lg border bg-muted/40">
          {["income", "expense"].map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              onClick={() => setActiveChart(key)}
              className="
                px-4 py-2 text-xs transition
                border-l first:border-l-0
                data-[active=true]:bg-background/60
                data-[active=true]:text-foreground
                hover:bg-muted/60
              "
            >
              {chartConfig[key].label}
            </button>
          ))}
        </div>
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="flex-1 pb-0">
        {!hasData ? (
          <EmptyStateNoAction
            icon="🥧"
            title="No category data"
            description={`No ${activeChart} transactions in this period`}
          />
        ) : (
          <ChartContainer config={chartConfig}>
            <PieChart>
              <ChartTooltip content={<PieTooltip total={total} />} />
              <Pie
                data={coloredData}
                dataKey="net"
                nameKey="label"
                innerRadius={40}
                outerRadius={90}
                paddingAngle={2}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex-col gap-2 text-sm border-t mt-4 pt-3">
        {hasData && insights.length ? (
          <Insights data={insights} />
        ) : (
          <div className="text-muted-foreground text-xs">
            Add transactions to see insights here
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
