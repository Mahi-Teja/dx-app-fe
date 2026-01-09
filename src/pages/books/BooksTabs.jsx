import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AddAccountTrigger from "@/features/accounts/components/AddAccountTrigger";
import AddCategoryTrigger from "@/features/categories/components/AddCategoryTrigger";
import { useState } from "react";
import AccountsTab from "./AccountsTab";
import CategoriesTab from "./CategoriesTab";

const BooksTabs = () => {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Tabs + Contextual Actions */}
      <div className="flex items-center justify-between gap-2 px-4 md:px-6">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        {/* Context-aware triggers */}
        <div className="flex gap-2">
          {activeTab === "accounts" && <AddAccountTrigger />}
          {activeTab === "categories" && <AddCategoryTrigger />}
        </div>
      </div>

      <TabsContent value="accounts">
        <AccountsTab />
      </TabsContent>

      <TabsContent value="categories">
        <CategoriesTab />
      </TabsContent>
    </Tabs>
  );
};

export default BooksTabs;
