const SideNavWrapper = ({ children, className }) => {
  return (
    <aside
      className={`hidden md:flex max-w-64 flex-col shrink-0 bg-card text-primary  border-r border-border   shadow-sm ${className}`}
    >
      {children}
    </aside>
  );
};

export default SideNavWrapper;
