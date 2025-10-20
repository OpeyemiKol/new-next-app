"use client";

import type { FC, ChangeEvent } from "react";

type StatusFilter = "all" | "completed" | "pending";

interface TodoFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

const TodoFilters: FC<TodoFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className="flex-1 px-3 py-1.5 cursor-pointer rounded-md bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
      />

      <select
        value={statusFilter}
        name="filter"
        id="filter"
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setStatusFilter(e.target.value as StatusFilter)
        }
        className="px-3 py-1.5 cursor-pointer rounded-md bg-gray-50 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default TodoFilters;
