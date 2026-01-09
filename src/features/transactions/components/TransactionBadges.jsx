import { Calendar } from "lucide-react";
import Badge from "./Badge";
import { format, parseISO } from "date-fns";
const TransactionBadges = ({ txn }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {txn?.category && (
        <Badge variant="category">
          {txn?.category.emoji} {txn?.category.name}
        </Badge>
      )}

      <Badge variant="date">
        <Calendar size={12} />
        {txn?.occurredAt
          ? format(new Date(txn?.occurredAt), "MMM dd yyyy ")
          : "N/A"}
      </Badge>

      <Badge variant={txn?.type}>{txn?.type}</Badge>
    </div>
  );
};

export default TransactionBadges;
