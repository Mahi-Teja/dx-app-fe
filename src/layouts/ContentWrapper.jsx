const MainWrapper = ({ children }) => {
  return (
    <div className=" flex flex-1 min-w-0 flex-col overflow-hidden bg-background  md">
      {children}
    </div>
  );
};

export default MainWrapper;
