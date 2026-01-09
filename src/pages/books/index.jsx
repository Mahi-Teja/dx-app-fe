import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import EmptyStateNoAction from "@/components/EmptyStateNoAction.jsx";
import AccountCard from "@/features/accounts/components/AccountCard.jsx";
import CategoryCard from "@/features/categories/components/CategoryCard.jsx";
import AddAccountTrigger from "@/features/accounts/components/AddAccountTrigger";
import AddCategoryTrigger from "@/features/categories/components/AddCategoryTrigger";
import BooksTabs from "./BooksTabs";

const Books = () => {
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);

  useEffect(() => {}, []);
  return (
    <section className="space-y-4 pb-10">
      {/* Sticky Header */}
      <header
        className="
            sticky top-0 z-10
            bg-background
            border-b border-border
            px-4 md:px-6 py-3
            flex items-center justify-between
          "
      >
        <h1 className="text-lg md:text-xl font-semibold">Organizatsion</h1>
        {/* <FilterOptions /> */}
      </header>

      <BooksTabs />
    </section>
  );
};

export default Books;
