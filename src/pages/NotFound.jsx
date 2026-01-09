import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">
        404
      </h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-100 mt-4">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you are looking for might have been removed or doesn’t exist.
      </p>
      <Button className="mt-6 px-6 py-2" onClick={() => navigate("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
}
