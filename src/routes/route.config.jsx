import ProtectedRoute, { PublicRoute } from "./ProtectedRoute";
import AppLayout from "../app/AppLayout";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import Dashboard from "@/pages/dashboard";
import Transactions from "@/pages/transactions";
import Books from "../pages/books";
import Settings from "@/pages/Settings";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import NotFound from "@/pages/NotFound";
import SignOut from "@/pages/SignOut";
import { DownloadList } from "@/pages/DownloadList";
import { Reports } from "@/pages/Reports";
import { Analytics } from "@/pages/analytics/Analytics";

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
    title: "Home",
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
    title: "Signup",
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    title: "Login",
  },
  {
    path: "/logout",
    element: <SignOut />,
    title: "Login",
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        title: "Dashboard",
      },
      {
        path: "/transactions",
        element: <Transactions />,
        title: "Transactions",
      },
      {
        path: "/books",
        element: <Books />,
        title: "Organise",
      },
      {
        path: "/settings",
        element: <Settings />,
        title: "settings",
      },
      {
        path: "/reports",
        element: <Reports />,
        title: "reports",
      },
      {
        path: "/analytics",
        element: <Analytics />,
        title: "analytics",
      },
      {
        path: "/budgets",
        element: <EmptyStateNoAction />,
        title: "budgets",
      },
      {
        path: "/download/transactions",
        element: <DownloadList />,
        title: "download.transactions",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    title: "Not Found",
  },
];

export default routes;
