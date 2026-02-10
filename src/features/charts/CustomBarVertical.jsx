"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

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
import { getHslColors } from "@/utils/getColors";

/* ===============================
   CONSTANTS
================================ */
const METRICS = {
  income: { label: "Income" },
  expense: { label: "Expense" },
};

/* ===============================
   HELPERS
================================ */
const calculateTotal = (data, key) =>
  data.reduce((sum, d) => sum + (Number(d[key]) || 0), 0);

/* ===============================
   COMPONENT
================================ */
export function ChartBarLabelCustom({
  title,
  description,
  chart_data = [],
  insights = [],
}) {
  const [activeMetric, setActiveMetric] = React.useState("expense");

  const BAR_INC = getHslColors(chart_data.length || 10, 140);
  const BAR_EXP = getHslColors(chart_data.length || 10, 20);

  const hasData = chart_data.length > 0;

  /* Inject color into data so tooltip can access it */
  const coloredData = React.useMemo(
    () =>
      chart_data.map((d, i) => ({
        ...d,
        __color: {
          income: BAR_INC[i % BAR_INC.length],
          expense: BAR_EXP[i % BAR_EXP.length],
        },
      })),
    [chart_data],
  );

  const total = React.useMemo(
    () => calculateTotal(coloredData, activeMetric),
    [coloredData, activeMetric],
  );

  return (
    <Card>
      {/* ================= HEADER ================= */}
      <CardHeader className="flex flex-row items-center border-b px-3 pb-2">
        <div className="flex flex-1 flex-col gap-1 px-6 pt-4 pb-3">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>

        {/* Toggle */}
        <div className="flex overflow-hidden rounded-lg border bg-muted/40">
          {Object.entries(METRICS).map(([key, cfg]) => (
            <button
              key={key}
              data-active={activeMetric === key}
              onClick={() => setActiveMetric(key)}
              className="
                px-4 py-2 text-xs transition
                border-l first:border-l-0
                data-[active=true]:bg-background/60
                data-[active=true]:text-foreground
                hover:bg-muted/60
              "
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </CardHeader>

      {/* ================= CONTENT ================= */}
      <CardContent>
        {!hasData ? (
          <EmptyStateNoAction
            icon="📊"
            title="No data available"
            description="No transactions found for this time range"
          />
        ) : (
          <ChartContainer config={METRICS}>
            <BarChart
              accessibilityLayer
              data={coloredData}
              layout="vertical"
              margin={{ right: 36 }}
            >
              <CartesianGrid horizontal={false} />

              <YAxis
                dataKey="label"
                type="category"
                axisLine={false}
                tickLine={false}
                // hide
              />

              <XAxis type="number" hide />

              {/* ===== Tooltip with color ===== */}
              <ChartTooltip
                cursor={false}
                content={({ payload }) => {
                  if (!payload?.length) return null;

                  const item = payload[0];
                  const color = item.payload.__color[activeMetric];

                  return (
                    <div className="rounded-md border bg-background p-2 shadow-sm text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <span className="font-medium">
                          {item.payload.label}
                        </span>
                      </div>
                      <div className="mt-1 text-muted-foreground">
                        {METRICS[activeMetric].label}: {item.value}
                      </div>
                    </div>
                  );
                }}
              />

              <Bar dataKey={activeMetric} radius={4}>
                {coloredData.map((d, i) => (
                  <Cell key={i} fill={d.__color[activeMetric]} />
                ))}

                {/* LEFT LABEL (name) */}
                {/* <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  fontSize={12}
                  className="fill-secondary-foreground"
                /> */}

                {/* RIGHT LABEL (% → hide when value = 0) */}
                {/* <LabelList
                  position="right"
                  offset={8}
                  fontSize={12}
                  className="fill-foreground"
                /> */}
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>

      {/* ================= FOOTER ================= */}
      <CardFooter className="flex-col items-start gap-2 border-t pt-3 text-sm">
        {hasData && insights.length ? (
          <Insights data={insights} />
        ) : (
          <div className="text-xs text-muted-foreground">
            Add transactions to see insights
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
