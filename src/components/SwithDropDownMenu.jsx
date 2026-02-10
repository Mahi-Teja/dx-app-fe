"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartAreaIcon,
  ChartColumn,
  ChartColumnStacked,
  EllipsisVertical,
} from "lucide-react";

const GRAPH_OPTIONS = [
  { key: "bar", label: "Bar", icon: <ChartColumn /> },
  { key: "compare", label: "Compare", icon: <ChartColumnStacked /> },
  { key: "area", label: "Area", icon: <ChartAreaIcon /> },
];
export function SwithGraphView({
  value = GRAPH_OPTIONS[0].label,
  setValue = () => {},
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={"cursor-pointer"}>
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Graph View</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            {GRAPH_OPTIONS.map((opt) => {
              return (
                <DropdownMenuRadioItem key={opt.key} value={opt.key}>
                  {opt.icon}
                  {opt.label}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
