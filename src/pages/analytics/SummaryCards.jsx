import React from "react";
import {
  ArrowUp,
  ArrowDown,
  Wallet,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { currencyConfigs } from "@/utils/currency";

/**
 * Props:
 * summary = {
 *   income: number,
 *   expense: number,
 *   net: number,
 *   count?: number
 * }
 * currencyKey = "INR"
 */
export const SummaryCards = ({
  summary,
  currencyKey = "INR",
  isLoading = false,
  insight = {},
}) => {
  const config =
    currencyConfigs[currencyKey.toUpperCase()] || currencyConfigs.USD;

  const formatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    maximumFractionDigits: 2,
  });

  if (isLoading) {
    return (
      <div className="bg-card grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-muted/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!summary) return null;

  const cards = [
    {
      label: "Income",
      value: summary.income || 0,
      insight: insight?.[`incomePct`],
      icon: <TrendingUp size={18} />,
    },
    {
      label: "Expense",
      value: summary.expense || 0,
      insight: insight?.[`expensePct`],
      icon: <TrendingDown size={18} />,
    },
    {
      label: "Net",
      value: summary.net || 0,
      insight: insight?.[`netPct`],
      icon: <Wallet size={18} />,
      // highlight: summary.net >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border bg-secondary p-4 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{c.label}</span>
            {c.icon}
          </div>

          <div className={`text-2xl font-semibold ${c?.highlight || ""}`}>
            {formatter.format(c.value)}
          </div>
          <div className="text-muted-foreground sm:text-[10px] md:text-xs flex items-center gap-1">
            {c?.insight === null ? (
              <></>
            ) : (
              <>
                {c.insight >= 0 ? "increased" : "decreased"} by{" "}
                {Math.abs(c.insight)}%
                {c.insight >= 0 ? (
                  <ArrowUp size={14} className="text-green-600" />
                ) : (
                  <ArrowDown size={14} className="text-red-600" />
                )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
