"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/todos";
import type { Todo } from "@/types/todo";

type TodoWithFlags = Todo & {
  __temp?: boolean;
  isOptimistic?: boolean;
};

interface TodoItemProps {
  todo: TodoWithFlags;
  onDelete: (id: number | string) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.todo);
  const [completed, setCompleted] = useState(todo.completed);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedData: Partial<Todo>) =>
      updateTodo(todo.id, updatedData),
    onSuccess: (data) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos ? oldTodos.map((t) => (t.id === data.id ? data : t)) : []
      );
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (todo.__temp || todo.isOptimistic) {
      alert(
        "You cannot update a temporary todo until it is saved to the server."
      );
      return;
    }

    updateMutation.mutate({ todo: text, completed });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      onDelete(todo.id);
    }
  };

  return (
    <li className="p-4 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-blue-600 transition">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            id={`todo-text-${todo.id}`}
            name="todoText"
            className="border rounded px-3 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id={`todo-completed-${todo.id}`}
              name="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            Completed
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 transition"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 bg-gray-300 rounded hover:bg-gray-400 transition"
              disabled={updateMutation.isPending}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {todo.__temp || todo.isOptimistic ? (
            <span className="flex flex-col text-gray-800 cursor-not-allowed">
              <span className="hover:underline text-base font-medium">
                {todo.todo}
              </span>
              <span
                className={`text-sm font-semibold flex items-center gap-2 ${
                  todo.completed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {!todo.completed && (
                  <span className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                )}
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </span>
          ) : (
            <Link
              href={`/todos/${todo.id}`}
              className="flex flex-col text-gray-800"
            >
              <span className="hover:underline text-base font-medium">
                {todo.todo}
              </span>
              <span
                className={`text-sm font-semibold flex items-center gap-2 ${
                  todo.completed ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {!todo.completed && (
                  <span className="w-3 h-3 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                )}
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </Link>
          )}

          <div className="flex justify-between items-center gap-3 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update Todo
            </button>
            <button
              onClick={handleDelete}
              className="text-sm px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
