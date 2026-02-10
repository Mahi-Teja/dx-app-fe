import { useRef } from "react";
import { CalendarSearch, CalendarSync } from "lucide-react";
import { arrowIcons, getIcon } from "@/utils/icons";

const toDateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const toInputValue = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const DateNav = ({ selectedDate, setSelectedDate }) => {
  const today = toDateOnly(new Date());
  const safeSelectedDate = selectedDate
    ? toDateOnly(new Date(selectedDate))
    : today;

  const dateInputRef = useRef(null);

  const isToday = safeSelectedDate.getTime() === today.getTime();

  const goToToday = () => setSelectedDate(today);

  const formatDisplay = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const changeDateBy = (offset) => {
    const next = new Date(safeSelectedDate);
    next.setDate(next.getDate() + offset);
    setSelectedDate(next);
  };

  const openDatePicker = () => {
    if (dateInputRef.current?.showPicker) {
      dateInputRef.current.showPicker();
    } else {
      dateInputRef.current?.focus();
      dateInputRef.current?.click();
    }
  };

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split("-");
    setSelectedDate(new Date(Number(y), Number(m) - 1, Number(d)));
  };

  return (
    <section className="flex items-center md:justify-between md:gap-3">
      {/* Left: arrows + date */}
      <div className="flex items-center md:gap-2">
        <button
          onClick={() => changeDateBy(-1)}
          className="md:p-2 transition bg-secondary rounded-full cursor-pointer"
        >
          {getIcon(arrowIcons, "leftChevron")}
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-primary truncate md:text-sm w-30 md:w-40">
          {!isToday && (
            <button
              onClick={goToToday}
              title="Go to today"
              className="p-1 text-secondary-foreground transition rounded-md hover:bg-accent cursor-pointer"
            >
              <CalendarSync size={16} />
            </button>
          )}

          <span className="mx-auto truncate justify-self-center">
            {isToday ? "Today" : formatDisplay(safeSelectedDate)}
          </span>
        </div>

        <button
          onClick={() => changeDateBy(1)}
          className="md:p-2 transition bg-secondary rounded-full cursor-pointer"
        >
          {getIcon(arrowIcons, "rightChevron")}
        </button>
      </div>

      <button
        onClick={openDatePicker}
        title="Pick a date"
        className="relative p-2 text-secondary-foreground rounded-lg hover:bg-accent cursor-pointer"
      >
        <CalendarSearch size={18} />

        {/* Hidden native date picker */}
        <input
          ref={dateInputRef}
          type="date"
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          value={toInputValue(safeSelectedDate)}
          onChange={handleDateChange}
        />
      </button>
    </section>
  );
};

export default DateNav;
