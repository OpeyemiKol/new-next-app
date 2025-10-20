"use client";

import { type FC } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ Next.js hooks
import { useQuery } from "@tanstack/react-query";
import { fetchTodosById } from "@/api/todos";
import type { Todo } from "@/types/todo";

const TodoDetail: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();

  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: () => fetchTodosById(Number(id)), // Convert id to number if needed
    enabled: !!id,
  });

  // Handle optimistic todos (which may not exist remotely)
  if (todo?.__temp || todo?.isOptimistic) {
    router.push("/"); // ✅ replace navigate("/") with router.push("/")
    return null;
  }

  if (isLoading) return <p className="p-6 text-lg">Loading Todo...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-600">Error loading todo: {error?.message}</p>
    );

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Todo Details</h1>
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow">
        <p className="text-lg font-medium">{todo?.todo}</p>
        <p
          className={`mt-2 text-sm font-semibold ${
            todo?.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {todo?.completed ? "Completed" : "Pending"}
        </p>
        <p className="mt-2 text-xs text-gray-500">ID: {todo?.id}</p>
      </div>

      <button
        onClick={() => router.back()} // ✅ replace navigate(-1) with router.back()
        className="mt-6 px-4 py-2 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default TodoDetail;
