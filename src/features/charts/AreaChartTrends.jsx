import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import { Insights } from "@/pages/analytics/insights";
import { ChartHeader } from "./ChartHeader";

/**
 * chart_data item shape expected:
 * {
 *   label: Date | string,
 *   income: number,
 *   expense: number
 * }
 */
export function ChartAreaTrends({
  title = "Transaction Trends",
  description = "Income vs Expense over time",
  chart_data = [],
  showDate = true,
  insights = [],
  trendView,
  setTrendView,
}) {
  const safeData = Array.isArray(chart_data) ? chart_data : [];
  const hasData = safeData.length > 0;

  return (
    <Card className={"pt-0"}>
      {/* HEADER */}
      <CardHeader className="border-b p-0">
        <ChartHeader
          title={`Transaction Trends - ${trendView}`}
          description="Income vs Expense over time"
          showSwitch
          trendView={trendView}
          setTrendView={setTrendView}
        />
      </CardHeader>

      {/* CONTENT */}
      <CardContent>
        {!hasData ? (
          <EmptyStateNoAction
            icon="📈"
            title="No trend data"
            description="No transactions found for this time range"
          />
        ) : (
          <ChartContainer
            className={"w-full max-h-60"}
            config={{
              income: { label: "Income", color: "var(--chart-2)" },
              expense: { label: "Expense", color: "var(--chart-1)" },
            }}
          >
            <AreaChart
              accessibilityLayer
              data={safeData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: showDate ? "numeric" : undefined,
                  })
                }
              />

              <YAxis hide />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    /* TITLE (DATE) */
                    labelFormatter={(label) => {
                      const d = new Date(label);
                      return isNaN(d)
                        ? label
                        : d.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          });
                    }}
                    /* VALUE (₹ AMOUNT) */
                    valueFormatter={(value) => `₹${value}`}
                  />
                }
              />

              {/* GRADIENTS */}
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-income)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-income)"
                    stopOpacity={0.1}
                  />
                </linearGradient>

                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-expense)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-expense)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              {/* AREAS */}
              <Area
                type="monotone"
                dataKey="income"
                stroke="var(--color-income)"
                fill="url(#fillIncome)"
                fillOpacity={0.35}
                stackId="a"
              />

              <Area
                type="monotone"
                dataKey="expense"
                stroke="var(--color-expense)"
                fill="url(#fillExpense)"
                fillOpacity={0.35}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData && insights.length ? (
          <Insights data={insights} />
        ) : (
          <div className="text-muted-foreground">
            Trends are calculated based on your transactions
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
