import { CardDescription, CardTitle } from "@/components/ui/card";
import { SwithGraphView } from "@/components/SwithDropDownMenu";

export function ChartHeader({
  title,
  description,
  showActions = false,
  showSwitch = false,
  activeChart,
  setActiveChart,
  total,
  chartConfig,
  trendView,
  setTrendView,
}) {
  return (
    <div className="flex justify-between md:items-center gap-3 px-6 py-3">
      {/* ROW 1: Title + Actions */}
      <div className="flex flex-col   md:justify-between md:flex-row  flex-1  gap-4">
        {/* Title */}
        <div className="flex flex-col gap-0.5">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex  overflow-hidden justify-center rounded-md border">
            {["income", "expense"].map((key) => (
              <button
                key={key}
                data-active={activeChart === key}
                onClick={() => setActiveChart(key)}
                className={`
                 
                  px-4 py-2 text-left text-xs transition-colors cursor-pointer
                  border-l first:border-l-0
                  data-[active=true]:bg-background/60
                  hover:bg-muted/30 w-full
                   
                `}
              >
                <div className="text-muted-foreground">
                  {chartConfig[key].label}
                </div>
                <div className="font-semibold">
                  {total[key].toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ROW 2: Switch */}
      {showSwitch && (
        <div className="flex justify-center">
          <SwithGraphView value={trendView} setValue={setTrendView} />
        </div>
      )}
    </div>
  );
}
