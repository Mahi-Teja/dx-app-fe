import { getIcon, uiIcons } from "@/utils/icons";

const IconAction = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
  >
    {getIcon(uiIcons, icon, { className: "h-4 w-4" })}
  </button>
);

export default IconAction;
