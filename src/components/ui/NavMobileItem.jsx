import { NavLink } from "react-router-dom";

const NavMobileItem = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex flex-col items-center justify-center gap-0.5
        text-xs transition bg-green-400
        ${isActive ? "text-primary" : "text-muted-foreground"}
      `
      }
    >
      <Icon size={20} />
      <span className="text-[11px]">{label}</span>
    </NavLink>
  );
};

export default NavMobileItem;
