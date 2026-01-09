const BodyWrapper = ({ children }) => {
  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-primary text-primary md:flex-row">
      {children}
    </main>
  );
};

export default BodyWrapper;
