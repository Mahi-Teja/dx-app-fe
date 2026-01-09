import { ComboboxDemo } from "./ComboBox";
import { ButtonGroupDemo } from "./DropDownBox";
import { Input } from "./ui/input";

const FilterBar = ({
  onSearch,
  onCategoryChange,
  onAccountChange,
  onTypeChange,
}) => {
  return (
    <div className="flex w-full flex-wrap gap-2 items-center">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <Input
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="shrink-0 min-w-[140px]">
        <ComboboxDemo label="Category" onChange={onCategoryChange} />
      </div>

      {/* Account */}
      <div className="shrink-0 min-w-[140px]">
        <ComboboxDemo label="Account" onChange={onAccountChange} />
      </div>

      {/* Type */}
      <div className="shrink-0 min-w-[140px]">
        <ButtonGroupDemo onChange={onTypeChange} />
      </div>
    </div>
  );
};

export default FilterBar;
