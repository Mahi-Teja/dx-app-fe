import React from "react";

const GridContainer = ({ children }) => {
  return (
    <div className="grid gap-4 px-4 md:px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default GridContainer;
