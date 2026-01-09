const BooksHeader = () => {
  return (
    <header
      className="
        sticky top-0 z-10
        bg-background
        border-b border-border
        px-4 md:px-6 py-3
        flex items-center justify-between
      "
    >
      <h1 className="text-lg md:text-xl font-semibold">Organization</h1>
    </header>
  );
};

export default BooksHeader;
