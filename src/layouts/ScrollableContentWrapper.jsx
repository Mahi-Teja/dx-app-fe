const ScrollableContentWrapper = ({ children, className }) => {
  return (
    <section className={`flex-1 overflow-y-auto  bg-card ${className}`}>
      {children}
    </section>
  );
};

export default ScrollableContentWrapper;
