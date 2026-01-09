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
    title: "Reports",
    path: "/reports",
    icon: getIcon(navigationIcons, "reports"),
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
  (acc) => ACCOUNT_TYPES[acc].value
);
