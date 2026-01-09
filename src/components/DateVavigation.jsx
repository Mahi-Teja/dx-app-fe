import { useRef } from "react";
import { CalendarSearch, CalendarSync } from "lucide-react";
import { arrowIcons, getIcon } from "@/utils/icons";

const DateNav = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const dateInputRef = useRef(null);

  const isToday = selectedDate.toDateString() === today.toDateString();

  const goToToday = () => setSelectedDate(today);

  const formatDisplay = (date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const changeDateBy = (offset) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + offset);
    setSelectedDate(next);
  };

  const openDatePicker = () => {
    dateInputRef.current?.showPicker();
  };

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <section className="flex  items-center md:justify-between md:gap-3    ">
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
            {isToday ? (
              <span className="">Today</span>
            ) : (
              formatDisplay(selectedDate)
            )}
          </span>
        </div>

        <button
          onClick={() => changeDateBy(1)}
          className=" md:p-2 transition bg-secondary rounded-full cursor-pointer"
        >
          {getIcon(arrowIcons, "rightChevron")}
        </button>
      </div>
      <button
        onClick={openDatePicker}
        title="Pick a date"
        className="relative flex items-center gap-2 px-2 py-1 text-sm font-medium text-secondary-foreground rounded-lg hover:bg-accent cursor-pointer"
      >
        <span>{new Date(selectedDate).toLocaleDateString()}</span>
        <CalendarSearch size={16} />
        {/* Hidden native date picker */}
        <input
          ref={dateInputRef}
          type="date"
          className="absolute w-0 h-0 opacity-0 pointer-events-none "
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
        />
      </button>
    </section>
  );
};

export default DateNav;
