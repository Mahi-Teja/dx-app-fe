const MobileNavWrapper = ({ children }) => {
  return (
    <nav className="md:hidden shrink-0 h-16 bg-card border-t border-border flex items-center justify-around shadow-sm">
      {children}
    </nav>
  );
};

export default MobileNavWrapper;
