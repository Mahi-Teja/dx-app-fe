import {
  ShoppingBag,
  HeartPulse,
  Wallet,
  TrainFront,
  Filter,
  FilterX,
  Banknote,
  Utensils,
  Theater,
  Clapperboard,
  Fuel,
  CreditCard,
  Calendar,
  Home,
  History,
  LayoutGrid,
  PiggyBank,
  User,
  Wallet2,
  Pencil,
  Trash2,
  X,
  PlusCircle,
  Plus,
  IndianRupee,
  DollarSign,
  MoreVertical,
  MoreHorizontal,
  BarChart3,
  Repeat,
  Replace,
  Download,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  TrendingUp,
  TrendingDown,
  Square,
  SquareCheck,
  HandCoins,
  ChartNoAxesCombined,
  WalletCards,
  PanelRightOpen,
  Settings,
  ChartPie,
} from "lucide-react";

/**
 * Icons used for different transaction categories.
 * Keys should be in camelCase for consistency.
 */
const transactionCategoryIcons = {
  movies: Clapperboard,
  shopping: ShoppingBag,
  food: Utensils,
  health: HeartPulse,
  utilities: Wallet2,
  salary: Wallet,
  train: TrainFront,
  transport: TrainFront,
  theater: Theater,
  entertainment: Theater,
  bank: Banknote,
  wallet: Wallet,
  card: CreditCard,
  calendar: Calendar,
  repeat: Repeat,
  selfTransfer: Replace,
  fuel: Fuel,
  gridLayout: LayoutGrid,
};

/**
 * Generic UI icons (e.g., buttons, actions, indicators).
 */
const uiIcons = {
  uncheckedBox: Square,
  checkedBox: SquareCheck,
  edit: Pencil,
  download: Download,
  verticalDots: MoreVertical,
  horizontalDots: MoreHorizontal,
  delete: Trash2,
  close: X,
  addCategory: PlusCircle,
  add: Plus,
  indianRupee: IndianRupee,
  dollar: DollarSign,
  filterOpen: FilterX,
  filterClosed: Filter,
  menu: PanelRightOpen,
  wallet: Wallet,
  expenseTrend: TrendingDown,
  incomeTrend: TrendingUp,
};

/**
 * Icons representing different account types.
 */
const accountTypeIcons = {
  cash: Wallet,
  creditCard: CreditCard,
  savings: PiggyBank,
  wallet: Wallet,
};

/**
 * Arrow and navigation icons for pagination or direction.
 */
const arrowIcons = {
  left: ArrowLeft,
  right: ArrowRight,
  leftChevron: ChevronLeft,
  rightChevron: ChevronRight,
  doubleLeftChevron: ChevronsLeft,
  doubleRightChevron: ChevronsRight,
  arrowUp: TrendingUp,
  arrowDown: TrendingDown,
};

/**
 * Icons for the main navigation sidebar/menu.
 */
const navigationIcons = {
  home: Home,
  profile: User,
  transactions: History,
  categories: LayoutGrid,
  budgets: HandCoins,
  reports: ChartNoAxesCombined,
  analytics: ChartPie,
  accounts: WalletCards,
  settings: Settings,
};

/**
 * Safe helper to render an icon from a map:
 * Returns a default icon if the requested key is missing.
 *
 * @param {Object} iconMap - Map object of icon components
 * @param {string} key - Key to lookup in the map
 * @param {Object} props - Props to pass to the icon component (className, size, etc.)
 */
function getIcon(iconMap, key, props = {}) {
  const IconComponent = iconMap[key] ?? Square;
  return <IconComponent {...props} />;
}

export {
  transactionCategoryIcons,
  navigationIcons,
  accountTypeIcons,
  uiIcons,
  arrowIcons,
  getIcon,
};
