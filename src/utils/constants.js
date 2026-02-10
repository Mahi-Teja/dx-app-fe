import { ChartAreaIcon, ChartColumn, ChartColumnStacked } from "lucide-react";
import { getIcon, navigationIcons } from "./icons";

export const MENU_OPTIONS = [
  { title: "Home", path: "/dashboard", icon: getIcon(navigationIcons, "home") },
  {
    title: "organiser",
    path: "/books",
    icon: getIcon(navigationIcons, "categories"),
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: getIcon(navigationIcons, "transactions"),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: getIcon(navigationIcons, "settings"),
  },
  //   { title: "Budgets", path: "/budgets",icon: getIcon(navigationIcons, "home") },
  {
    title: "Analytics",
    path: "/analytics",
    icon: getIcon(navigationIcons, "analytics"),
  },

  //   { title: "Profile", path: "/profile",icon: getIcon(navigationIcons, "home")  },
];
export const ACCOUNT_TYPES = {
  CASH: {
    label: "Cash",
    value: "cash",
    category: "asset",
    hasBalance: true,
    allowsTransfer: true,
    allowsExpense: true,
    allowsIncome: true,
    icon: "💵",
  },

  SAVINGS: {
    label: "Savings Account",
    value: "savings",
    category: "asset",
    hasBalance: true,
    allowsTransfer: true,
    allowsExpense: true,
    allowsIncome: true,
    icon: "🏦",
  },

  SALARY: {
    label: "Salary Account",
    value: "salary",
    category: "asset",
    hasBalance: true,
    allowsTransfer: true,
    allowsExpense: true,
    allowsIncome: true,
    icon: "💼",
  },

  CURRENT: {
    label: "Current Account",
    value: "current",
    category: "asset",
    hasBalance: true,
    allowsTransfer: true,
    allowsExpense: true,
    allowsIncome: true,
    icon: "🏢",
  },

  DEBIT_CARD: {
    label: "Debit Card",
    value: "debit_card",
    category: "linked_asset",
    hasBalance: false, // balance comes from linked bank account
    allowsTransfer: false,
    allowsExpense: true,
    allowsIncome: false,
    icon: "💳",
  },

  WALLET: {
    label: "Wallet",
    value: "wallet",
    category: "asset",
    hasBalance: true,
    allowsTransfer: true,
    allowsExpense: true,
    allowsIncome: true,
    icon: "📱",
  },

  CREDIT_CARD: {
    label: "Credit Card",
    value: "credit_card",
    category: "liability",
    hasBalance: false, // tracks outstanding, not balance
    allowsTransfer: false,
    allowsExpense: true,
    allowsIncome: false,
    requiresBillingCycle: true,
    icon: "💳",
  },

  // LOAN: {
  //   label: "Loan",
  //   value: "loan",
  //   category: "liability",
  //   hasBalance: false,
  //   allowsTransfer: false,
  //   allowsExpense: false,
  //   allowsIncome: false,
  //   requiresEMI: true,
  //   icon: "📉",
  // },
};

export const ACCOUNT_LABELS = Object.keys(ACCOUNT_TYPES).map(
  (acc) => ACCOUNT_TYPES[acc].value,
);
export const MONTHS_LIST = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const GRAPH_OPTIONS = [
  { key: "bar", label: "Bar", icon: ChartColumn },
  { key: "compare", label: "Compare", icon: ChartColumnStacked },
  { key: "area", label: "Area", icon: ChartAreaIcon },
];

export const vibrantColors = [
  "hsl(215, 70%, 55%)", // Trust Blue
  "hsl(150, 60%, 45%)", // Success Green
  "hsl(35, 90%, 55%)", // Warning Orange
  "hsl(5, 75%, 60%)", // Danger Red
  "hsl(280, 65%, 60%)", // Royal Purple
  "hsl(190, 80%, 45%)", // Bright Teal
  "hsl(50, 95%, 55%)", // Sunny Yellow
  "hsl(330, 75%, 60%)", // Raspberry Pink
];

// A professional Teal-Blue gradient
export const monoTeal = [
  "hsl(180, 70%, 25%)", // Darkest
  "hsl(180, 65%, 40%)",
  "hsl(180, 60%, 55%)",
  "hsl(180, 55%, 70%)",
  "hsl(180, 50%, 85%)", // Lightest
];
