/**
 * query ={
 * searchTerm:'',
 *  category:['id1],'id2'],
 *  accounts:['id1],'id2'],
 *  type:['expense','income','transfer'],
 *  date:{
 *          range:t/f,
 *          from:date,
 *          to:date,(if range is True this value is needed else only from is considers as one specific)
 *      }
 * }
 */
import { useCallback, useMemo, useState } from "react";

/**
 * Centralized filter logic for transactions
 */
const useFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    categoryId: null,
    accountId: null,
    type: null, // expense | income | transfer
  });

  /* ---------------- setters ---------------- */

  const setSearch = (value) => setFilters((f) => ({ ...f, search: value }));

  const setCategory = (id) => setFilters((f) => ({ ...f, categoryId: id }));

  const setAccount = (id) => setFilters((f) => ({ ...f, accountId: id }));

  const setType = (value) => setFilters((f) => ({ ...f, type: value }));

  const resetFilters = () =>
    setFilters({
      search: "",
      categoryId: null,
      accountId: null,
      type: null,
    });

  /* ---------------- application logic ---------------- */

  const applyFilters = useCallback(
    (transactions = []) => {
      return transactions.filter((txn) => {
        if (
          filters.search &&
          !txn.description?.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        if (filters.categoryId && txn.category?._id !== filters.categoryId) {
          return false;
        }

        if (filters.accountId && txn.account?._id !== filters.accountId) {
          return false;
        }

        if (filters.type && txn.type !== filters.type) {
          return false;
        }

        return true;
      });
    },
    [filters]
  );

  return {
    filters,
    setSearch,
    setCategory,
    setAccount,
    setType,
    resetFilters,
    applyFilters,
  };
};

export default useFilters;

export function ButtonGroupDemo() {
  const [label, setLabel] = React.useState("personal");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Checkbox id="terms" />
            Expense
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Checkbox id="terms" />
            Income
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <CalendarPlusIcon />
          Add to Calendar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
