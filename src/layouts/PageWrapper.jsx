import React from "react";

const PageWrapper = ({ title, options, children }) => {
  return (
    <section className="space-y-5 pb-10">
      {/* Page title */}
      <header
        className="
        sticky top-0 z-10
        bg-background
         bg-whitew
        text-lg font-semibold
        md:px-6  py-3
        border-b border-border
        flex items-center justify-between
      "
      >
        <h1
          className=" text-lg md:text-xl
      "
        >
          {title}
        </h1>
        <div className="">{options}</div>
      </header>

      {/* Page content */}
      <div className="">{children}</div>
    </section>
  );
};

export default PageWrapper;
