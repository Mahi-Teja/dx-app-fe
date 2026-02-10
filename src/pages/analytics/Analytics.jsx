import React, { useEffect, useState } from "react";
import { TimeRangeSelector } from "./TimerangeeSelector";
import { SummaryCards } from "./SummaryCards";
import { TitleHeader } from "@/components/TitleHeader";
import { useSelector } from "react-redux";
import { ChartBarInteractive } from "@/features/charts/BarChartInteractive";
import { BarChartCompare } from "@/features/charts/BarChartCompare";
import { ChartAreaTrends } from "@/features/charts/AreaChartTrends";
import { ChartPieLabelCustom } from "@/features/charts/PieChart";
import { ChartBarLabelCustom } from "@/features/charts/CustomBarVertical";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import { TxnFullList } from "@/features/transactions/store/transaction.selector";
import { getAnalyticsData } from "@/features/charts/api/analytics.api";
import toast from "react-hot-toast";

const currentDate = new Date();
const TREND_VIEWS = {
  AREA: "area",
  BAR: "bar",
  COMPARE: "compare",
};
export const Analytics = () => {
  const [window, setWindow] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedFilters, setSelectedFilters] = useState({});
  const [trendView, setTrendView] = useState(TREND_VIEWS.AREA);

  const [allData, setallData] = useState({
    charts: [],
    summary: {},
    insights: [],
    comparisons: {},
  });

  const { items } = useSelector((s) => s.transactions);
  const categories = useSelector((s) => s.categories);
  const accounts = useSelector((s) => s.accounts);

  const transactions = TxnFullList({
    transactions: items,
    categories,
    accounts,
  });

  useEffect(() => {
    getAnalyticsData({ window })
      .then((res) => {
        setallData(res.data);
      })
      .catch(() => toast.error("Something went wrong!"));
  }, [window]);

  const { charts, summary, insights, comparisons } = allData;

  /* ================= EMPTY STATE LOGIC ================= */
  const hasTrends = charts.trends?.length > 0;

  const hasCategories =
    (charts.categories?.income?.length ?? 0) +
      (charts.categories?.expense?.length ?? 0) >
    0;

  const hasAccounts = charts.accounts?.length > 0;

  const hasAnyData = hasTrends || hasCategories || hasAccounts;

  return (
    <section className="flex flex-col min-h-screen ">
      {/* PAGE HEADER */}
      <TitleHeader>
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <h1 className="text-lg md:text-xl font-semibold">Analytics</h1>
        </div>
      </TitleHeader>

      {/* PAGE BODY */}
      <section className="flex-1 px-4 md:px-6 py-4 space-y-6">
        {/* TIME RANGE */}
        <div>
          <TimeRangeSelector window={window} setWindow={setWindow} />
        </div>

        {/* SUMMARY */}
        <section>
          <SummaryCards insight={comparisons} summary={summary} />
        </section>

        {/* EMPTY STATE */}
        {!hasAnyData && (
          <div className="pt-8">
            <EmptyStateNoAction
              icon="🫙"
              title="Nothing to show"
              description="No transactions found for this time range"
            />
          </div>
        )}

        {/* TRENDS */}
        {hasTrends && (
          <section className=" ">
            {trendView === TREND_VIEWS.BAR && (
              <ChartBarInteractive
                showDate={window !== "yearly"}
                trendView={trendView}
                setTrendView={setTrendView}
                chart_data={charts.trends}
                insights={insights.trends}
              />
            )}

            {trendView === TREND_VIEWS.COMPARE && (
              <BarChartCompare
                showDate={window !== "yearly"}
                trendView={trendView}
                setTrendView={setTrendView}
                chart_data={charts.trends}
                showSwith={false}
                insights={insights.trends}
              />
            )}

            {trendView === TREND_VIEWS.AREA && (
              <ChartAreaTrends
                showDate={window !== "yearly"}
                trendView={trendView}
                setTrendView={setTrendView}
                chart_data={charts.trends}
                showSwith={false}
                insights={insights.trends}
              />
            )}
          </section>
        )}

        {/* BREAKDOWN */}
        {(hasCategories || hasAccounts) && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hasCategories && (
              <ChartPieLabelCustom
                title="Category trends"
                description={window}
                chart_data={charts.categories}
                insights={insights.categories}
              />
            )}

            {hasAccounts && (
              <ChartBarLabelCustom
                title="Accounts data"
                description={window}
                chart_data={charts.accounts}
                insights={insights.accounts}
              />
            )}
          </section>
        )}
      </section>
      <div className="h-18 md:h-0"></div>
    </section>
  );
};
