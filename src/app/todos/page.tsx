"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import { fetchTodos, deleteTodo } from "@/api/todos";
import type { Todo } from "@/types/todo";

import Pagination from "@/components/Pagination";
import AddTodoModal from "@/components/AddTodoModal";
import TodoHeader from "@/components/TodoHeader";
import TodoFilters from "@/components/TodoFilters";
import TodoList from "@/components/TodoList";

const TodosPage = () => {
  const router = useRouter(); // ✅ for navigation
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending"
  >("all");

  const itemsPerPage = 10;

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const { mutate: deleteMutate } = useMutation<
    { isDeleted: boolean },
    Error,
    string | number
  >({
    mutationFn: async (id) => deleteTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      alert("Failed to delete todo.");
      console.error("Delete error:", error);
    },
  });

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.todo
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && todo.completed) ||
      (statusFilter === "pending" && !todo.completed);
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const currentTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md px-6 py-4 text-center">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-blue-800 text-base font-medium">
            Loading todos...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-40 text-red-600 text-xl">
        Error: {error?.message}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 relative">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/")} // ✅ back to landing page
          className="inline-flex cursor-pointer items-center gap-2 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-purple-700 hover:to-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Go Back
        </button>
      </div>

      <TodoHeader />

      <div className="flex justify-center mt-4 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-6 py-3 rounded-md shadow-md transition font-semibold"
        >
          ➕ Add Todo
        </button>
      </div>

      <TodoFilters
        searchQuery={searchQuery}
        setSearchQuery={(value: string) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        setStatusFilter={(value: "all" | "completed" | "pending") => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
      />

      <div className="bg-white mt-6 p-6 rounded-2xl shadow-lg border border-gray-200">
        <TodoList todos={currentTodos} onDelete={deleteMutate} />
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddTodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TodosPage;
