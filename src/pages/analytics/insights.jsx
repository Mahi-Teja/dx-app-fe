import { TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

/**
 * =========================================================
 * Dx Tracker — Insights Engine (Specification)
 * =========================================================
 *
 * GOAL:
 * -----
 * Convert raw transactions into human-readable insights like:
 *  - "Your highest spending day was Jan 19 (₹556)"
 *  - "You saved ₹4,093 this period"
 *  - "You spend most often on Sundays"
 *
 * =========================================================
 *
 * TRANSACTION RULES:
 * ------------------
 * The following transactions MUST BE EXCLUDED from insights:
 *
 *   - type === "opening_balance"
 *   - type === "transfer"
 *   - isDeleted === true
 *
 * Only these types participate:
 *   - type === "income"
 *   - type === "expense"
 *
 * =========================================================
 *
 * WINDOWING:
 * ----------
 * All insights are computed over a selected time window:
 *
 *   Examples:
 *     - last 7 days
 *     - last 30 days
 *     - current month
 *     - custom date range
 *
 * Some insights also compare against:
 *   - previous window of SAME length
 *
 * =========================================================
 *
 * INSIGHT STRUCTURE:
 * ------------------
 *
 * type Insight = {
 *   id: string                     // unique insight id
 *   severity: "info" | "warning" | "good" | "critical"
 *   message: string                // human readable sentence
 *   metric?: number                // optional numeric value
 * }
 *
 * =========================================================
 *
 * SEVERITY GUIDELINES:
 * --------------------
 *
 * "good"     → Positive improvement or healthy state
 * "info"     → Neutral observation
 * "warning"  → Potential issue or unhealthy pattern
 * "critical" → Dangerous financial behavior
 *
 * =========================================================
 *
 * INSIGHTS TO GENERATE (v1):
 * ==========================
 *
 * ---------------------------------------------------------
 * 1. Highest Spend Day (in selected window)
 * ---------------------------------------------------------
 *
 * Description:
 *   Find the day with the highest total EXPENSE amount.
 *
 * Message:
 *   "Your highest spending day was Jan 19 (₹556)"
 *
 * Severity:
 *   - "warning" if daySpend > 1.5 × dailyAverage
 *   - else "info"
 *
 * Metric:
 *   - total amount spent that day
 *
 * ---------------------------------------------------------
 * 2. Highest Spend Month
 * ---------------------------------------------------------
 *
 * Description:
 *   Group expenses by month and find the highest month.
 *
 * Message:
 *   "Your highest spending month was January 2026 (₹4,230)"
 *
 * Severity:
 *   - "info"
 *
 * Metric:
 *   - total amount spent in that month
 *
 * ---------------------------------------------------------
 * 3. Most Active Spend Day (by transaction count)
 * ---------------------------------------------------------
 *
 * Description:
 *   Find the day with the highest NUMBER of expense transactions.
 *
 * Message:
 *   "You made 5 transactions on Jan 19 — your most active day."
 *
 * Severity:
 *   - "warning" if count >= 5
 *   - else "info"
 *
 * Metric:
 *   - number of transactions on that day
 *
 * ---------------------------------------------------------
 * 4. Day Pattern Insight (Optional but recommended)
 * ---------------------------------------------------------
 *
 * a) Day of week:
 *   Detect which weekday has most expense transactions.
 *
 *   Message:
 *     "You spend most often on Sundays."
 *
 * b) Month date pattern:
 *   Detect if spending clusters around:
 *     - start of month (1–3)
 *     - mid month (14–17)
 *     - end of month (28–31)
 *
 *   Message:
 *     "Most of your spending happens around month-end."
 *
 * Severity:
 *   - "info"
 *
 * ---------------------------------------------------------
 * 5. Highest Income Day / Month
 * ---------------------------------------------------------
 *
 * Description:
 *   Find the day (or month) with highest INCOME.
 *
 * Message:
 *   "Your highest income was on Jan 21 (₹5,080)"
 *
 * Severity:
 *   - "good"
 *
 * Metric:
 *   - income amount
 *
 * ---------------------------------------------------------
 * 6. Top Spending Category
 * ---------------------------------------------------------
 *
 * Description:
 *   Group expenses by category and find the highest one.
 *
 * Message:
 *   "You spent the most on Food (₹1,240)"
 *
 * Severity:
 *   - "warning" if categorySpend > 40% of total expenses
 *   - else "info"
 *
 * Metric:
 *   - category spend amount
 *
 * ---------------------------------------------------------
 * 7. Net Savings (with previous window comparison)
 * ---------------------------------------------------------
 *
 * Compute:
 *   net = totalIncome - totalExpense
 *   prevNet = previousWindowIncome - previousWindowExpense
 *   delta = net - prevNet
 *
 * Messages:
 *   If net > 0:
 *     "You saved ₹4,093 this period. That's ₹1,200 more than last period."
 *
 *   If net < 0:
 *     "You spent ₹1,200 more than you earned this period."
 *
 * Severity:
 *   - "good"     → net > 0 and delta > 0
 *   - "warning"  → net > 0 and delta < 0
 *   - "critical" → net < 0
 *
 * Metric:
 *   - net savings amount
 *
 * ---------------------------------------------------------
 * 8. Anomaly Spend Day (Optional v1.1)
 * ---------------------------------------------------------
 *
 * Trigger:
 *   daySpend > 2.5 × dailyAverage
 *
 * Message:
 *   "Your spending on Jan 19 was unusually high compared to other days."
 *
 * Severity:
 *   - "warning"
 *
 * =========================================================
 *
 * IMPORTANT PRODUCT RULE:
 * -----------------------
 *
 * Charts show data.
 * Insights explain data.
 *
 * If insights contradict charts → insights logic is WRONG.
 *
 * =========================================================
 */

export const Insights = ({ data = [], indicators = false }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animate, setAnimate] = useState(true);

  const dataLength = Array.isArray(data) ? data.length : 0;

  /* ===============================
     AUTO ROTATION
  ================================ */
  useEffect(() => {
    if (!dataLength || paused) return;

    const interval = setInterval(() => {
      setAnimate(false); // reset animation
      setTimeout(() => {
        setActive((prev) => (prev + 1) % dataLength);
        setAnimate(true);
      }, 50);
    }, 5000);

    return () => clearInterval(interval);
  }, [dataLength, paused]);

  /* ===============================
     RESET ON DATA CHANGE
  ================================ */
  useEffect(() => {
    if (active >= dataLength) setActive(0);
  }, [dataLength, active]);

  if (!dataLength) {
    return (
      <article className="  p-3 text-sm text-muted-foreground">
        No insights available
      </article>
    );
  }

  return (
    <article
      className=" flex flex-col items-center gap-3 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* MESSAGE */}
      <section className="flex-1 font-medium leading-snug min-h-6">
        <li key={active} className={animate ? "animate-insight" : ""}>
          <div className="flex items-center gap-2 font-medium">
            {data[active]?.title}
          </div>
          <div className="text-muted-foreground ">{data[active]?.message}</div>
        </li>
      </section>

      {/* INDICATORS */}
      {indicators && (
        <div className="flex gap-1">
          {Array.from({ length: dataLength }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === active ? "bg-foreground" : "bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </article>
  );
};
