const VARIANTS = {
  expense: "bg-rose-100 text-rose-700",
  income: "bg-emerald-100 text-emerald-700",
  transfer: "bg-indigo-100 text-indigo-700",
  category: "bg-accent text-accent-foreground",
  date: "bg-muted text-muted-foreground",
};

const Badge = ({ children, variant = "category" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${VARIANTS[variant]}`}
  >
    {children}
  </span>
);

export default Badge;
