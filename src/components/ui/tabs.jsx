import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "flex w-full items-center justify-start gap-6 border-b border-border bg-transparent px-4",
        className,
      )}
      {...props}
    />
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "relative px-1 py-3 text-sm font-medium text-muted-foreground transition-colors",
        "hover:text-foreground",
        "data-[state=active]:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // underline indicator
        "data-[state=active]:after:absolute",
        "data-[state=active]:after:left-0 data-[state=active]:after:right-0",
        "data-[state=active]:after:-bottom-[1px]",
        "data-[state=active]:after:h-[2px]",
        "data-[state=active]:after:bg-primary",
        className,
      )}
      {...props}
    />
  );
});

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
