"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/api/todos";
import { createTodo } from "@/api/todos";
import { useState } from "react";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type NewTodo = Omit<Todo, "id">;

const AddTodoModal: React.FC<AddTodoModalProps> = ({ isOpen, onClose }) => {
  const [todoText, setTodoText] = useState("");
  const [status, setStatus] = useState<"pending" | "completed">("pending");
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    Todo,
    Error,
    NewTodo,
    { previousTodos: Todo[] }
  >({
    mutationFn: createTodo,

    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      const optimisticTodo: Todo = {
        ...newTodo,
        id: Date.now(),
        __temp: true,
      };

      queryClient.setQueryData<Todo[]>(
        ["todos"],
        [optimisticTodo, ...previousTodos]
      );

      return { previousTodos };
    },

    onSuccess: (response) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => {
        const withoutOptimistic = oldTodos.filter((t) => !t.__temp);
        return [response, ...withoutOptimistic];
      });

      setTodoText("");
      setStatus("pending");
      onClose();
    },

    onError: (_err, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    mutate({
      todo: todoText,
      completed: status === "completed",
      userId: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Todo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Todo Text
            </label>
            <input
              type="text"
              value={todoText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodoText(e.target.value)
              }
              placeholder="Enter todo"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setStatus(e.target.value as "pending" | "completed")
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {isError && (
            <p className="text-red-600 text-sm">Error: {error.message}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            >
              {isPending ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
