import { ComboboxDemo } from "./ComboBox";
import { ButtonGroupDemo } from "./DropDownBox";
import { Input } from "./ui/input";

export const FilterOptions = ({ filters, onChange }) => {
  return (
    <div className="flex w-full flex-wrap gap-2 items-center">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <Input
          placeholder="Search"
          value={filters?.search || ""}
          onChange={(e) =>
            onChange({
              ...filters,
              search: e.target.value || undefined,
            })
          }
        />
      </div>

      {/* Category */}
      <div className="shrink-0 min-w-[140px]">
        <ComboboxDemo
          label="Category"
          value={filters?.categoryId}
          onChange={(value) =>
            onChange({
              ...filters,
              categoryId: value || undefined,
            })
          }
        />
      </div>

      {/* Account */}
      <div className="shrink-0 min-w-[140px]">
        <ComboboxDemo
          label="Account"
          value={filters?.accountId}
          onChange={(value) =>
            onChange({
              ...filters,
              accountId: value || undefined,
            })
          }
        />
      </div>

      {/* Type */}
      <div className="shrink-0">
        <ButtonGroupDemo
          value={filters?.type}
          onChange={(value) =>
            onChange({
              ...filters,
              type: value || undefined,
            })
          }
        />
      </div>
    </div>
  );
};
