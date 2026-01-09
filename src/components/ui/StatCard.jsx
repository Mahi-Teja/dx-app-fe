import React from "react";
import { currencyConfigs } from "@/utils/currency";
import { getIcon, uiIcons } from "@/utils/icons";
import {
  ArrowUp,
  ArrowUpNarrowWide,
  CircleArrowDown,
  CircleArrowOutUpRightIcon,
  CircleArrowUp,
} from "lucide-react";

const StatCard = ({
  label,
  value,
  iconKey,
  currencyKey = "INR",
  className,
}) => {
  const config =
    currencyConfigs[currencyKey.toUpperCase()] || currencyConfigs.USD;

  /* ---------- Full currency formatter ---------- */
  const fullFormatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* ---------- Compact formatter (Option 2) ---------- */
  const compactFormatter = new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    notation: "compact",
    maximumFractionDigits: 2,
  });

  const fullValue = fullFormatter.format(value);
  const compactValue = compactFormatter.format(value);

  const showCompactValue = fullValue.toString().length <= 10;

  return (
    <div
      className={`
      bg-accent border border-border
      rounded-md p-4 md:text-md
      flex flex-col gap-2
       
      ${className}
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {getIcon(uiIcons, iconKey, {
          className: "w-4 h-4 text-muted-foreground",
        })}
      </div>

      {/* Value */}
      <div className="flex flex-col leading-tight">
        {/* Compact value (primary) */}
        <span
          title={fullValue} // Option 1: hover reveal
          tabIndex={0} // keyboard accessible
          className="
            font-bold text-2xl md:text-3xl
            truncate tabular-nums
            cursor-default
          "
        >
          {showCompactValue ? fullValue : compactValue}
        </span>

        {/* Full value (secondary) */}
        <div className="flex justify-between">
          <span
            className={`text-xs  text-muted-foreground tabular-nums  ${
              showCompactValue ? " invisible " : "visible"
            }`}
          >
            {value?.toFixed(2)}
          </span>
          {/* Badge */}
          <span
            className={`text-xs space-x-0.5  px-1 rounded-sm flex items-center text-muted-foreground tabular-nums  `}
          >
            <CircleArrowUp size={14} />

            <span>20%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
